// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLogin from './src/Screens/HomeLogin'
import CadastroController from './src/Screens/Cadastro';
import HomeLogado from './src/Screens/HomeLogado';
import Map from './src/Screens/Map';

const Stack = createStackNavigator();

export default function App() {
  const config = {
    title: '',
    headerStyle: {
      backgroundColor: '#14E075',
    },
    headerTintColor: '#282828',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    }
  };

  const config2 = {
    title: '',
    headerStyle: {
      backgroundColor: '#14E075',
    },
    headerTintColor: '#282828',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: '-15%',
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeLogin">
        <Stack.Screen name="HomeLogin" component={HomeLogin} options={{ ...config, title: 'Recicla Best' }} />
        <Stack.Screen name="Cadastro" component={CadastroController} options={{ ...config2, title: 'Recicla Best' }} />
        <Stack.Screen name="HomeLogado" component={HomeLogado} options={{
          ...config, title: 'Recicla Best', headerLeft: null
        }} />
        <Stack.Screen name="Map" component={Map} options={{
          ...config2, title: 'Próximos a você' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}