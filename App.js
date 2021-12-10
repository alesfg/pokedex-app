import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import axios from 'axios'


import PokemonList from './components/PokemonList';
import Pagination from './components/Pagination';


export default function App() {

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  const [pokemonIndex, setPokemonIndex] = useState([]);
  const [pokemonUrl, setPokemonUrl] =useState([])

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      console.log(res.data)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p=>p.name))

      setPokemonIndex(res.data.results.map(p=>p.url.split("/")[p.url.split('/').length - 2]))
      // setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${res.data.results.map(p=>p.name)}`)
      // setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      console.log("pokee"+pokemon)
    })
    return () => cancel()
  }, [currentPageUrl])
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
   console.log("asd"+pokemonUrl)

  if(loading) return <Text>"Cargando Pokédex🚗🛸"</Text>
  return (
    <SafeAreaView style={styles.container}>
        <PokemonList pokemon={pokemon} pokemonIndex={pokemonIndex} />

        <Pagination 
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
          {/* <Image source={pokemonImage} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
