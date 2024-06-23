import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

interface CredentialsInvalid {
  name: boolean;
  email: boolean;
  phone: boolean;
  //confirmEmail: boolean;
  password: boolean;
  confirmPassword: boolean;
  profilePicture: boolean;
  role: boolean;
}
interface Props {
  isLogin: boolean;
  onSubmit: (credentials: {
    name: string;
    email: string;
    phone: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
    role: string;
  }) => void;
  credentials: {
    name: string;
    email: string;
    phone: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
    role: string;
  };
  setCredentials: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
    role: string;
  }>>;
  credentialsInvalid: CredentialsInvalid;
}

function AuthForm({ isLogin, onSubmit, credentials, setCredentials, credentialsInvalid }: Props) {
  const {
    name: nameIsInvalid,
    email: emailIsInvalid,
    phone: phoneIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: keyof typeof credentials, enteredValue: string) {
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [inputType]: enteredValue,
    }));
  }

  function submitHandler() {
    onSubmit(credentials);
  }

  return (

    <ScrollView>
       <View style={styles.form}>
      <View>

      {!isLogin && (<Input
          label="Full Name"
          onUpdateValue={(value) => updateInputValueHandler('name', value)}
          value={credentials.name}
          //keyboardType="email-address"
          isInvalid={nameIsInvalid}
        />)}
      
        <Input
          label="Email Address"
          onUpdateValue={(value) => updateInputValueHandler('email', value)}
          value={credentials.email}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Mobile Number"
            onUpdateValue={(value) =>
              updateInputValueHandler('phone', value)
            }
            value={credentials.phone}
            keyboardType="phone-pad"
            isInvalid={phoneIsInvalid}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={(value) => updateInputValueHandler('password', value)}
          secure
          value={credentials.password}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={(value) =>
              updateInputValueHandler('confirmPassword', value)
            }
            secure
            value={credentials.confirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
    </ScrollView>
   

  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    //marginTop: 5,
  },
  form:{
    
  }
});

