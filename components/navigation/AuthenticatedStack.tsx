import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { AuthStackParamList, AuthenticatedStackParamList } from '../../types/RootStackParamList';
import WelcomeScreen from '../../screens/WelcomeScreen';
import { Colors } from '../../constants/styles';



const AuthenticatedStack = () => {
    const Stack = createStackNavigator<AuthenticatedStackParamList>();
  return (
    <Stack.Navigator  screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: Colors.primary100 },
      }}
      
      >
    <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}/>

   </Stack.Navigator>
  )
}

export default AuthenticatedStack
