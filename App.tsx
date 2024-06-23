import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomNavigation from './components/CustomNavigation';
import AppLoading from 'expo-app-loading';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Root(){
   const [isTryingLogin, setIsTryinLoing] = useState(true);

  const authCtx = useContext(AuthContext)
  useEffect(() => {

    async function fetchToken() {
     
     const storedToken = await AsyncStorage.getItem('token');

      if(storedToken){
          authCtx.authenticate(storedToken);
      }
      setIsTryinLoing(false);
    }
    fetchToken();
  },[])

   if(isTryingLogin){
      <AppLoading/>
   }
  return <CustomNavigation />
}

export default function App() {


  return (
      <>
      <AuthContextProvider>
      <StatusBar style="auto" />
        <Root/>
      </AuthContextProvider>
      
      </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
