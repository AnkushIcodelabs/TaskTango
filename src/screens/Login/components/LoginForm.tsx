import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../redux/store';
import {loginUser} from '../../../redux/slices/authSlice';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    let valid = true;
    const newErrors = {email: '', password: ''};
    if (!form.email.includes('@')) {
      newErrors.email = 'Invalid Email';
      valid = false;
    }
    if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    const params = {
      username: form.email,
      password: form.password,
    };
    const res = await dispatch(loginUser(params));
    if (res) {
      navigation.navigate('HomePage' as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your Email"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={text => setForm({...form, email: text})}
        value={form.email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your Password"
        style={styles.input}
        secureTextEntry
        onChangeText={text => setForm({...form, password: text})}
        value={form.password}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtn}>
        <Text>
          Forgot Password? <Text style={styles.navText}>Reset</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.navBtn}>
        <Text>
          New User? <Text style={styles.navText}>Signup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

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
    //marginTop: 10,
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
  navBtn: {justifyContent: 'center', alignItems: 'center', marginTop: 10},
  navText: {color: 'black', fontWeight: '600', textAlign: 'center'},
});
