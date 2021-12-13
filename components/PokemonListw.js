import React, {useEffect,useState} from 'react'

import axios from 'axios';

import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';


export default function PokemonList({ pokemon,pokemonIndex }) {
    
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`
    let url2 = 'https://pokeapi.co/api/v2/pokemon/';

    {pokemon.map(p =>(console.log("hola:  "+url2+p)))}

    axios.get(urlPoke, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      
    })


    const [pokemonUrl,setPokemonUrl] = useState([]);
    // pokemon solo tiene 20 nombres cada render, pero p(pokemonIndex) sigue sumando, entonces cuando quiero acceder al nombre
    // necesito el index porque las imagenes son por ej 124.png pero ahora tb necesito otro iterador Bien para acceder al resto de datos de Pokeapi
    //https://pokeapi.co/api/v2/pokemon/1 ==https://pokeapi.co/api/v2/pokemon/bulbasaur!!!!!!!!!!
    //creo qye hay q hacer otro axios para el id y para otros datos


    useEffect(() => {
      let cancel
      /* axios.get(urlPoke, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p=>p.name))
        console.log(res.data.results.map(p=>p.url.split("/")[p.url.split('/').length - 2]))
  
        setPokemonIndex(res.data.results.map(p=>p.url.split("/")[p.url.split('/').length - 2]))
      })
      return () => cancel() */
    }, [url2])


    return (
      <ScrollView>
        {pokemon.map(p => (
          <View key={p}>
            {/* <Text style={styles.digits}>
                #{p.length == 1 ? '00' : ''}
                  {p.length == 2 ? '0' : ''}
                {p}
            </Text> */}
            <Text style={styles.text}> {p} </Text>
          <View  style={styles.card}>
            <Text>asereje</Text>
            {/* {console.log("este p:"+p)} */}
            {/* {console.log("este poke:"+pokemon[p-1])} */}
            {/* {console.log(urlPoke+p+"/id")} */}

            
            {/* <Image 
              source= {{ uri: `${url}${p}.png` }}
              style= {styles.image}
              />
              <Image 
              source= {{ uri: `${url}back/${p}.png` }}
              style= {styles.image}
              /> */}
              
              
          </View>
          </View>
        ))}  
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: '#FA8072'
    },
    imageContainer: {
      marginTop: -10,
      marginLeft: -10,
    },
    image: {
      width: 100,
      height: 100,
      backgroundColor: 'green',
      borderRadius:20
    },
    digits: {
      fontSize:10,
      color: 'white',
      backgroundColor: 'black',
      height:18,
      width:40,
      borderRadius: 6,
      padding: 2,
      textAlign:'center'
    },
    text: {
      textTransform: 'capitalize',
      fontSize: 16,
      backgroundColor:'#FAEE33'
    }
  });
