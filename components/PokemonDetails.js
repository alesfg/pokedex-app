import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'


import { useQuery, gql } from '@apollo/client';
import { backgroundColors, stats, emojis } from '../assets/colors'
import pokeball_bg from '../assets/pokeball_bg.png'
import pokegif from '../assets/image11.gif'
import { translateHabitat, translateType } from '../assets/translate'

import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons'; 
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export const GET_DETALLES = gql`
query getDetalles($_eq: Int) {
  pokemon_v2_pokemonspecies(where: {id: {_eq: $_eq}}) {
    pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 7}}, limit: 1) {
      flavor_text
    }
    pokemon_v2_pokemonhabitat {
      name
    }
    pokemon_v2_pokemonshape {
      name
    }
    pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 7}}) {
      genus
    }
    name
    pokemon_v2_pokemons_aggregate {
      nodes {
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
      }
    }
    pokemon_v2_pokemons(where: {id: {_eq: $_eq}}) {
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
}

`



const PokemonDetails = ({ route, navigation }) => {
  
  console.log("Detalles")
  console.log(route.params)
  const { id } = route.params
  const [types, settypes] = useState([])
  const [name, setname] = useState()
  const [genus, setgenus] = useState()
  const [flavor, setflavor] = useState()
  const [habitat, sethabitat] = useState()
  const [hp, sethp] = useState()
  const [attack, setattack] = useState()
  const [defense, setdefense] = useState()
  const [speed, setspeed] = useState()
  const [tinyImgUri, settinyImgUri] = useState()
  
  const { loading, error, data } = useQuery(GET_DETALLES, {
    variables: { "_eq": id },
  });
  
  const Progress = ({step,stat,height}) => {
    return (
      <>
      <Text style={{fontSize:14, fontWeight: 'bold', marginBottom:8,width:30}}>{step}</Text>
      <View style={{
        height,
        backgroundColor:'rgba(0,0,0,0.1)',
        borderTopEndRadiusRadius: height,
        borderTopRightRadius: height,
        overflow:'hidden',
        width:110,
        alignSelf:'center',
      }}>
        <View style={{
        height,
        width:step,
        borderTopEndRadiusRadius: height,
        borderTopRightRadius: height,
        backgroundColor:stats[stat],
        overflow:'hidden',
        position:'absolute',
        left:0,
        top:0
      }}></View>
      </View>
      </>
    )
  } 

  const imageUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  const speak = () => {
    Speech.speak(name + "." +
    data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text, {
      rate: 1.1,
      language: 'es-ES',
      pitch: 1,
      voice: "es-es-x-eed-network"
    });
  };
  if(!loading){
    if(data && Object.keys(data)?.length>0 && name!=undefined){
      speak();
    }
  }
  
  useEffect(() => {
    if(route.params?.type){
      settypes([route.params.type])
    }
    if(data && Object.keys(data)?.length>0){
      setname(data.pokemon_v2_pokemonspecies[0].name)
      settypes([data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name , data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name])
      setflavor(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text.replace(/\s+/g, ' ').replace(".",".\n"))
      setgenus(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesnames[0].genus)
      sethabitat(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonhabitat?.name)
      sethp(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[0].base_stat)
      setattack(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[1].base_stat)
      setdefense(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[2].base_stat)
      setspeed(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[5].base_stat)
      settinyImgUri(`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png`)
    }
    if(Speech.isSpeakingAsync){
      Speech.stop()
    }
  }, [data])
  
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      Speech.stop()
    }
  )}, [navigation])
  
  const goPokemonList = () => {navigation.navigate("Bear Pokedex")}
  const goNextPokemon = () => {navigation.push("Pokemon Info", {
    id : id+1
  })}
  const goPreviousPokemon = () => {navigation.push("Pokemon Info", {
    id : id-1
  })}

  return (
    <View style={[styles.screen, { backgroundColor: backgroundColors[types[0]] }]}>
      <View style={[styles.name]}>
        <View style={{flexDirection: "row"}}>

      <TouchableOpacity
        onPress={goPokemonList}
        >
        <AntDesign name="arrowleft" size={30} color="#fff" />
      </TouchableOpacity>
      {!loading && name !=undefined ?
      <Text style={{ fontWeight: 'bold', fontSize: 24, color: "white",paddingLeft:10 }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
        
        :
        <View></View>
      }
      </View>
      <Text style={{fontWeight: 'bold', fontSize: 24, color: "white",alignSelf:'flex-end',paddingRight:30}}>#{id}</Text>
      </View>
      <View style={{ opacity: 0.15, paddingTop: 30 }}>
        <ImageBackground source={pokeball_bg} style={{
          width: 200, height: 160, alignSelf: 'flex-end'
        }}
          resizeMode='contain'
        />
      </View>
      <View style={{ flexDirection: 'row',width:'100%', justifyContent: 'space-between',paddingHorizontal:70,paddingBottom:30 }}>
            {id > 1 &&
             <TouchableOpacity style={{alignSelf:'flex-start'}}
              onPress={()=>goPreviousPokemon()}
              >
                <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>}
            
            <TouchableOpacity style={{right:0,position:'absolute', paddingRight:70}}
            onPress={()=>goNextPokemon()}
            >
              <AntDesign name="right" size={24} color="#fff" />
            </TouchableOpacity>
      </View>
      <View style={styles.infoCard}>
      
        <View >
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode='contain' />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            {types[0] && <Text style={[styles.type, { backgroundColor: backgroundColors[types[0]] }]}> {translateType(types[0])} </Text>}
          </View>
          <View>
            {types[1] && <Text style={[styles.type, { backgroundColor: backgroundColors[types[1]] }]}> {translateType(types[1])} </Text>}
          </View>
        </View>
        
        {!(data && Object.keys(data)?.length>0) ?
        <View>
         <Image
         source={pokegif}
         style={{
           height: 179,
           width: 320,
           marginTop:100
         }}
         />
         </View>
         :
           <View>
          <Text style={{ color: backgroundColors[types[0]], fontWeight: 'bold', fontSize: 20, padding: 18, textAlign:'center' }}>
          {types[1] && emojis[types[1]]} {genus} {emojis[types[0]]}
          </Text>
            <Text selectable={true} selectionColor={'gray'}>
              {flavor}
            </Text>

            {/* Aqui poner STATS */}
            <View style={{marginTop:20,marginBottom:10}}>
              <View style={styles.row}>
                <Text style={[styles.stats,{color:stats['hp']}]}>PV</Text>
                <Progress step={hp} stat={'hp'} height={6}/>
              </View>
              <View style={styles.row}>
                <Text style={[styles.stats,{color:stats['attack']}]}>Ataque</Text>
                <Progress step={attack} stat={'attack'} height={6}/>
              </View>
              <View style={styles.row}>
                <Text style={[styles.stats,{color:stats['defense']}]}>Defensa</Text>
                <Progress step={defense} stat={'defense'} height={6}/>
              </View>
              <View style={styles.row}>
                <Text style={[styles.stats,{color:stats['speed']}]}>Velocidad</Text>
                <Progress step={speed} stat={'speed'} height={6}/>
              </View>
            </View>
         {/* SPRITES */}
         <View style={styles.imageContainer}>
           <Text>Asda</Text>
          <Image source={{ uri: tinyImgUri }} style={styles.sprite} resizeMode='contain' />
        </View>
         {/* HABITAT */}
            <Text style={styles.habitat}>
              Habita en {translateHabitat(habitat)}
            </Text>
          </View>
        }
      </View>

    </View>
  )
}

export default PokemonDetails
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    height: height,
    width: width,
    alignSelf: 'center',
    flex: 1
  },
  name: {
    paddingTop: 45,
    paddingLeft: 21,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  infoCard: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    // flex:1
    // height:400
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    height:30,
    alignItems:'center'
  },
  stats:{
    left:0,
    marginLeft:1,
    marginRight:1,
    width:'50%',
    fontWeight: "bold",
    fontSize:16
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -170
  },
  sprite: {
    width: 50,
    height: 50
  },
  imageContainer: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  type: {
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    textTransform: 'capitalize'
  },
  habitat: {
    paddingTop: 5,
    fontFamily:'monospace'
  }
})
