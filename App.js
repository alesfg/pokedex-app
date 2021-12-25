import React from 'react';

import Home from './components/Home'
import PokemonDetails from './components/PokemonDetails';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function App() {
   
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen component={Home} name='Pokedex Alex' />
          <Stack.Screen component={PokemonDetails} name='Pokemon Info'
              options={({ route }) => ({ title: route.params.item.name.charAt(0).toUpperCase()+route.params.item.name.slice(1) })}
           />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }