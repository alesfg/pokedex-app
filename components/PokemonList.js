import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../assets/colors'

// import pokeball from '../assets/pokedex.png'

export default function PokemonList({ item, navigation }) {
  const { id, name } = item
  const type = item.pokemon_v2_pokemontypes[0].pokemon_v2_type.name

  const getImage = async () => {
    setImageUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
  }

  const [imageUri, setImageUri] = useState(null)
  const [isLoading, setisLoading] = useState(true)

  useEffect(async () => {
    getImage()
    setisLoading(false)
  }, [])

  return (
    <TouchableOpacity

      onPress={() => navigation.navigate("Pokemon Info", {
        item: item,
        type: type,
      })}
    >

      <View style={[styles.card, { borderColor: colors[type] }]}>
        <Text style={[styles.digits, { color: colors[type] }]}>
          #
          {id.toString().length == 1 ? '00' : ''}
          {id.toString().length == 2 ? '0' : ''}
          {id}
        </Text>
        {!isLoading && <Image source={{ uri: imageUri }} style={styles.image} resizeMode='contain' />}
        <View style={[styles.nameContainer, { backgroundColor: colors[type] }]}>
          <Text style={styles.name}> {name.substring(0, 3) === "deo" ? name.substring(0, name.indexOf('-')) : name} </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 15,
    width: width / 3.5,
    height: width / 3,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1.5,
    elevation: 5,
    margin: 3,
  },
  image: {
    // backgroundColor:'lightgreen',
    flex: 3,
  },
  digits: {
    fontSize: 12,
    flex: 0.6,
    paddingRight: 10,
    paddingTop: 1,
    textAlign: 'right',
    textAlignVertical: 'bottom',
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 16,
    textAlign: 'center',
  },
  nameContainer: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: -1
  },
});
