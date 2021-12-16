import React from 'react'


import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';


export default function PokemonList({ id, image, name, type,types }) {
  const style = type + " thumb-container";
  
  // const onPress = () => console.log(id);
  // const onPress = () => styles.image.height=200
  let cambia;
    return (
      <TouchableOpacity
      activeOpacity={0.6}
      // onPress={onPress}
      >
        <View style={styles.card} >
          <Text style={styles.digits}>
            #
            {id.toString().length==1 ? '00' : ''}
            {id.toString().length==2 ? '0' : ''}
            {id}
          </Text>
          <View>
            <Text style={styles.name}> {name} </Text>
            <Image source={{uri:image}} style={styles.image} resizeMode='contain'/>

              <View style={{flexDirection:'row', justifyContent:'center',marginBottom:20}}>
              {types.map((t)=>
                <Text key={`${id}-${t.type.name}`} style={styles.type}>
                {/* // AAAAAAAAAAAAA */}
                    {t.type.name}
                </Text>
              )}
              </View>
            
          </View>
        </View>
      </TouchableOpacity>     
    )
}

const {height, width} = Dimensions.get('window');
console.log("height: "+height)
console.log("width: "+width)

const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 15,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: width/3.5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
      elevation:10
    },  
    image: {
      width: 100,
      height: 100,
      borderRadius:20
    },
    digits: {
      fontSize:12,
      color: 'white',
      height:'20%',
      borderRadius: 6,
      padding: 2,
      textAlign:'center',
      textAlignVertical:'bottom',
      textShadowColor: 'black',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 10
    },
    name: {
      textTransform: 'capitalize',
      fontSize: 16,
      color:'white',
      textShadowColor: '#000000',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      textAlign:'center',
    },
    type:{
      flexDirection:'row',
      textTransform: 'capitalize',
      fontSize: 14,
      textAlign:'center',
      marginHorizontal:4,
    }
  });

// no aplicado
  const colors = StyleSheet.create({
    rock: {
      backgroundColor: 'rgb(148, 81, 81)'
    },
    ghost: {
    backgroundColor: 'rgb(247, 247, 247)'
    },
    electric: {
    backgroundColor: 'rgb(255, 255, 161)'
    },
    bug: {
    backgroundColor: '#F6D6A7'
    },
    poison: {
    backgroundColor: '#e0a7f6'
    },
    normal: {
    backgroundColor: '#F4F4F4'
    },
    fairy: {
    backgroundColor: 'rgba(255, 192, 203, 0.863)'
    },
    fire: {
    backgroundColor: '#FBE3DF'
    },
    grass: {
    backgroundColor:'#E2F9E1'
    },
    water: {
    backgroundColor: '#E0F1FD'
    }
  })

 
