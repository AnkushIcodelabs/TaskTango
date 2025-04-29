import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  setTempImage,
  signupUser,
  uploadImage,
} from '../../../redux/slices/authSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import * as ImagePicker from 'react-native-image-picker';

interface params {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const tempImage = useAppSelector(state => state.auth.tempImage);

  const handleImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (result.errorCode) {
      console.log('ImagePicker Error:', result.errorMessage);
      return;
    }
    const imageUri = result.assets[0];
    if (!imageUri) {
      console.log('No image selected');
      return;
    }
    await dispatch(
      setTempImage({
        uri: imageUri.uri,
        name: imageUri.fileName,
        type: imageUri.type,
        id: `${imageUri.fileName}_${imageUri.fileSize}`,
      }),
    );
  };

  const handleSignup = async () => {
    let valid = true;
    const newErrors = {email: '', password: ''};
    if (!form.email.includes('@')) {
      newErrors.email = 'Invalid Email';
      valid = false;
    }
    if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    setErrors(newErrors);

    const params = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    };

    try {
      const res = await dispatch(signupUser(params)).unwrap();
      if (tempImage) {
        const imageParams = {
          file: {
            uri: tempImage.uri,
            name: tempImage.name,
            id: tempImage.id,
            type: tempImage.type,
          },
        };
        dispatch(uploadImage(imageParams));
      }

      if (res) {
        navigation.navigate('HomePage' as never);
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {tempImage && (
        <Image source={{uri: tempImage.uri}} style={styles.photo} />
      )}
      <TouchableOpacity style={styles.button} onPress={handleImage}>
        <Text style={styles.btnText}>Upload Photo</Text>
      </TouchableOpacity>
      <Text style={styles.label}>FirstName</Text>
      <TextInput
        placeholder="Enter your FirstName"
        style={styles.input}
        onChangeText={text => setForm({...form, firstName: text})}
        value={form.firstName}
      />
      <Text style={styles.label}>LastName</Text>
      <TextInput
        placeholder="Enter your LastName"
        style={styles.input}
        onChangeText={text => setForm({...form, lastName: text})}
        value={form.lastName}
      />
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
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.pop()}
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
  photo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: 150,
  },
});
