import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import  { AuthContext } from '../store/auth-context'; // Assuming it's AuthContent instead of AuthContext
import { login } from '../util/auth';
import AuthContent from '../components/Auth/AuthContent';
import { Colors } from '../constants/styles';

// Define the interface for the navigation and route props
interface LoginScreenProps {
  navigation: any; // Adjust the type if necessary
  route: any; // Adjust the type if necessary
}

interface AuthCredentials {
  email: string;
  password: string;
}



const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext); // Assuming it's AuthContent instead of AuthContext

  const loginHandler = async ({ email, password }: AuthCredentials) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (err:unknown) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );


      if (err instanceof Error) {
        Alert.alert(err.message)
      } else {
        Alert.alert("An unknown error occurred");
      }



    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  // Assuming you're rendering a login form or component within AuthContent
  return (<>
    <View style={styles.container}>
    <AuthContent isLogin={true} onAuthenticate={loginHandler} />
    </View>
  
  </>);
};

export default LoginScreen;

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:Colors.primary100
  }
})
