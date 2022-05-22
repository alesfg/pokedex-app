import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Home from './components/Home'
import PokemonDetails from './components/PokemonDetails';

const Stack = createNativeStackNavigator();

export default function App() {

  const client = new ApolloClient({
    // uri: 'https://server-catstronauts-alesfg.herokuapp.com/',
    uri: 'https://beta.pokeapi.co/graphql/v1beta/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
          <Stack.Navigator
           initialRouteName='Home'
           screenOptions={{
            headerShown:false
          }}>
            <Stack.Screen component={Home} name='Bear Pokedex' />
            <Stack.Screen component={PokemonDetails} name='Pokemon Info'
              // options={({ route }) =>{}}
              //  ({ title: route.params.item.name.charAt(0).toUpperCase()+route.params.item.name.slice(1)})}
           />
          </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
