import React, { useContext, useState } from 'react';
import { Alert,StyleSheet, View } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import { Colors } from '../constants/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList, RootStackParamList } from '../types/RootStackParamList';
import AuthStack from '../components/AuthStackScreen';

interface AuthCredentials {
  name:string,
  email: string;
  phone:string,
  password: string;
  confirmPassword: string,
  profilePicture:string,
  role: string
}

type SignupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "AuthStack">;
  route: RouteProp<AuthStackParamList, "SignUpScreen">;
};



interface User {
  data: {
    token: string;
    id: string;
    userName: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    profilePicture: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    timezoneId: string;
    isActive: boolean;
    registerDate: string;
  };
}
const SignupScreen : React.FC<SignupScreenProps> =({navigation,route}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ name, email, phone, password,confirmPassword,profilePicture,role }:AuthCredentials) {

       

    setIsAuthenticating(true);
    try {
      const response = await createUser(name, email, phone, password,confirmPassword,profilePicture,role="User");
      Alert.alert("UserCreate Successfull",response )
      //.authenticate(token);
    } catch (error:unknown) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      if (error instanceof Error) {
        Alert.alert(error.message)
      } else {
        Alert.alert("An unknown error occurred");
      }
      
    }
    finally{
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (<>
  
    <View style={styles.container}>
    <AuthContent onAuthenticate={signupHandler} isLogin={false} />
    </View>
  </>);
}

export default SignupScreen;


const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:Colors.primary100
  }
})
