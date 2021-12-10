import React, {useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

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


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p=>p.name))
      setPokemonIndex(res.data.results.map(p=>p.url.split("/")[p.url.split('/').length - 2]));
    })
    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
   

  if(loading) return <Text>"Cargando Pokédex🚗🛸"</Text>

  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={[<PokemonList pokemon={pokemon}/>]}
      /> */}
        <PokemonList pokemon={pokemon} pokemonIndex={pokemonIndex}/>

        <Pagination 
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
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
