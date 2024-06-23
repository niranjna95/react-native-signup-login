
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { AuthStackParamList } from '../types/RootStackParamList';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';


const AuthStackScreen = () => {

    const AuthStack  = createStackNavigator<AuthStackParamList>();
  return (
    <AuthStack.Navigator screenOptions={{
      headerStyle: { backgroundColor: "#c30b64" },
      headerTintColor: 'white',
    }}>
      <AuthStack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'Login' }} />
      <AuthStack.Screen name='SignUpScreen' component={SignupScreen} options={{ title: 'Sign Up' }} />
    </AuthStack.Navigator>
  )
}

export default AuthStackScreen
