import React, { useState } from 'react'


import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';


export default function PokemonList({ id, image, name, type,types }) {
  const style = type + " thumb-container";
  // const onPress = () => console.log(id);
  // const onPress = () => image=`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png`;
  const onPress = () => console.log(`${image}/${id}`)
  let cambia;
    return (
      <TouchableOpacity
      activeOpacity={0.6}
      // onLongPress={console.log(`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png`)}
      onPress={onPress}
      >
        <View style={styles.card} >
          <Text style={styles.digits}>
            #
            {id.toString().length==1 ? '00' : ''}
            {id.toString().length==2 ? '0' : ''}
            {id}
          </Text>
          <Image source={{uri:image}} style={styles.image}/>
          <View>
            <Text style={styles.name}>
              {name}
            </Text>

              {types.map((t)=>
                <Text key={`${id}-${t.type.name}`} style={styles.type}>
                    {t.type.name}
                </Text>
              )}
            
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
      borderRadius: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: width/3,
      justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#FA8072',
      marginHorizontal:10,
    },  
    image: {
      width: 90,
      height: 100,
      // backgroundColor: 'green',
      borderRadius:20
    },
    digits: {
      fontSize:12,
      color: 'white',
      // backgroundColor: 'black',
      height:'20%',
      width:'30%',
      borderRadius: 6,
      padding: 2,
      textAlign:'right',
      textAlignVertical:'bottom',
      textShadowColor: 'black',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 10
    },
    name: {
      textTransform: 'capitalize',
      fontSize: 16,
      padding: 10,
      textShadowColor: 'brown',
      textShadowOffset: {width: 1, height: -1},
      textShadowRadius: 7,
      // backgroundColor:'#FB9070',
      // borderBottomRightRadius:8
    },
    type:{
      textTransform: 'capitalize',
      fontSize: 14,
      backgroundColor:'#0B9080',
      // marginHorizontal:3,
      marginLeft:10,
      paddingHorizontal:5
    }
  });
 
