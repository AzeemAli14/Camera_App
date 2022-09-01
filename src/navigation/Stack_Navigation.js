import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DisplayScreen from '../screens/DisplayScreen';

const Stack_Navigation = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Display' component={DisplayScreen} options={{ title: 'Camera App' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Stack_Navigation