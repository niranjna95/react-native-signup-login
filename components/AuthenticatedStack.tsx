import React, { useContext } from 'react'
import { AuthenticatedStackParamList } from '../types/RootStackParamList';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import IconButton from './ui/IconButton';
import { AuthContext } from '../store/auth-context';

const AuthenticatedStack = () => {
    const Stack = createStackNavigator<AuthenticatedStackParamList>();
    const authCtx = useContext(AuthContext);
    return (
     <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: "#c30b64" },
      headerTintColor:'white',
      
    }}>
      <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}  options={{
        title:'Welcome',
        headerRight:({tintColor}) => <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>
      }}/>
    
     </Stack.Navigator>
    )
}

export default AuthenticatedStack
