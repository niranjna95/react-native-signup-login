import { NavigatorScreenParams } from "@react-navigation/native";

 

 export type RootStackParamList ={

   AuthStack: NavigatorScreenParams<AuthStackParamList>;
   AuthenticatedStack: NavigatorScreenParams<AuthenticatedStackParamList>;

 }


 export type AuthStackParamList = {
    LoginScreen: undefined;
    SignUpScreen: undefined;
  };
  
  export type AuthenticatedStackParamList = {
   
   WelcomeScreen: undefined
   
  };

