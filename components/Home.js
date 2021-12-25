import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

import PokemonList from './PokemonList';


export default function App({navigation}) {
   

  const[allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=60')


  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

 const getAllPokemons = async () => {
  const res = await fetch(loadMore)
  const data = await res.json()

  setLoadMore(data.next)

  function createPokemonObject(results)  {
    results.forEach( async pokemon => {
       try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}?limit=60`)
        const data =  await res.json()
        // console.log(":"+data.name)
        setAllPokemons( currentList => [...currentList, data].sort((a, b) => a.id - b.id))
      }catch (err) {
        setError(err.message)
        setAllPokemons(null)
      }finally{
        //  console.log("Fin hasta el din")
         setLoading(false)
       }
     })
   }
   createPokemonObject(data.results)

 }


 useEffect(() => {
 getAllPokemons()
}, [])

    return (
      
      <View style={styles.container}>
        {loading && <Text>Cargando...</Text>}
        {error && <Text>Ha ocurrido un error pidiendo los datos al sevidor - {error}</Text>}
        {!loading && (
          <View>
        <FlatList
          data={allPokemons}
          keyExtractor={ (item) => item.id  }
          ListHeaderComponent={ () => <Text style={{fontWeight:'bold',fontSize:18,margin:30}}>Toca en un pokemon de la Pokédex y mira su información!</Text> }
          numColumns={ 3 }
          contentContainerStyle = {{alignItems:'center'}}
          renderItem={({item, index}) =>
            <View>
              <PokemonList 
                item = { item }
                navigation={ navigation }
                // description={allPokemonsDetails[index].flavor_text_entries.find(e => e.language.name=="es").flavor_text}
              />
            </View>
          }
        />
      
          <TouchableOpacity onPress={() => getAllPokemons()}>
            <View style={styles.loadMore}>
              <Text style={{textAlign:'center', textAlignVertical:'top',fontSize:15, paddingBottom:10}}>Ver más</Text>
            </View>
          </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }         


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex:1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMore: {
    marginBottom:0,
    backgroundColor:'green'
  }
  
});


