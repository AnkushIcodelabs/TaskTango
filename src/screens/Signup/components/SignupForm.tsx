import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email.includes('@')) {
      setEmailError('Email address is not valid');
    }
    if (password.length < 8) {
      setPasswordError('Password length must be 8 characters');
    }
    Alert.alert('button is pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>FirstName</Text>
      <TextInput
        placeholder="Enter your FirstName"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <Text style={styles.label}>LastName</Text>
      <TextInput
        placeholder="Enter your LastName"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your Email"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginbtn}>
        <Text>
          Alreday Registered? <Text style={styles.loginText}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {fontSize: 20, marginHorizontal: 10},
  input: {borderWidth: 1, padding: 10, margin: 10, borderRadius: 5},
  button: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontWeight: '400',
    textAlign: 'right',
    marginRight: 10,
  },
  loginbtn: {justifyContent: 'center', alignItems: 'center', marginTop: 10},
  loginText: {color: 'black', fontWeight: '600', textAlign: 'center'},
});
