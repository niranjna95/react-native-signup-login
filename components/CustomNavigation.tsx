import React, { useContext } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AuthStackScreen from './AuthStackScreen';
import { AuthContext } from '../store/auth-context';

import AuthenticatedStack from './AuthenticatedStack';
const Stack = createStackNavigator<RootStackParamList>();

const CustomNavigation = () => {
    const authCtx = useContext(AuthContext);


  return (
   
     <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown : false}}>
            {!authCtx.isAuthenticated ?      
            ( <Stack.Screen name="AuthStack" component={AuthStackScreen} />)
            : 
            ( 
            <Stack.Screen name="AuthenticatedStack" component={AuthenticatedStack} />)
          
          }
          </Stack.Navigator>
      
     </NavigationContainer>
  )
}

export default CustomNavigation
