import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm'; // Assuming AuthForm exports Credentials type
import { Colors } from '../../constants/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';

type Props = {
  isLogin: boolean;
  onAuthenticate: (credentials: {
    name: string;
    email: string;
    phone: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
    role: string;
  }) => void;
};

function AuthContent({ isLogin, onAuthenticate }: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    phone: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
    role: ''
  });

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    profilePicture: false,
    role: false
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate('AuthStack', { screen: 'SignUpScreen' });
    } else {
      navigation.navigate('AuthStack', { screen: 'LoginScreen' });
    }
  }
  function submitHandler(submittedCredentials: typeof credentials) {
    const { name, email, phone, password, confirmPassword, profilePicture, role } = submittedCredentials;

    const emailTrimmed = email.trim();
    const phoneTrimmed = phone.trim();
    const passwordTrimmed = password.trim();
    const emailIsValid = emailTrimmed.includes('@');
    const passwordIsValid = passwordTrimmed.length > 6;
    const passwordsAreEqual = passwordTrimmed === confirmPassword;
    
    const allFieldsEmpty = !name && !email && !phone && !password && !confirmPassword && !profilePicture && !role;

    if (allFieldsEmpty) {
      Alert.alert('Invalid input', 'All fields are empty.');
      setCredentialsInvalid({
        name: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
        profilePicture: true,
        role: true,
      });
      return;
    }

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        name: !name,
        email: !emailIsValid,
        phone: !phone,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        profilePicture: !profilePicture,
        role: !role,
      });
      return;
    }

    onAuthenticate({ name, email, phone, confirmEmail: '', password, confirmPassword, profilePicture, role });

    // Clear the input fields after successful submission
    setCredentials({
      name: '',
      email: '',
      phone: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      profilePicture: '',
      role: ''
    });

    // Clear validation errors
    setCredentialsInvalid({
      name: false,
      email: false,
      phone: false,
      password: false,
      confirmPassword: false,
      profilePicture: false,
      role: false
    });
  }
  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentials={credentials}
        setCredentials={setCredentials}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 40,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
