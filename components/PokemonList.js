import React from 'react'


import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';


export default function PokemonList({ id, image, name, type,types }) {
  const style = type + " thumb-container";
    
    return (
        <View style={styles.card}>
          <Text>
            #
            {id.toString().length==1 ? '00' : ''}
            {id.toString().length==2 ? '0' : ''}
            {id}
          </Text>
          <Image source={{uri:image}} style={styles.image}/>
          <View>
            <Text style={styles.text}>
              {name}
            </Text>
            <Text style={styles.text}>
              Tipo:             
              {types.map((t)=>
                <Text key={`${id}-${t.type.name}`}>
                    {t.type.name}
                </Text>
              )}
            </Text>
            
          </View>
        </View>         
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
      width: 90,
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
