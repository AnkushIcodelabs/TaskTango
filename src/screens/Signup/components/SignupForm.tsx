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
  updateUserProfile,
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); //convert these 4 states into 1
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); // convert the error state into 1
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const tempImage = useAppSelector(state => state.auth.tempImage);

  const handleImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    console.log('result for Image', result);
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
        // uri: imageUri?.uri?.includes('file://') ? imageUri.uri : add file:// in front of uri,
        uri: imageUri.uri,
        name: imageUri.fileName,
        type: imageUri.type,
        id: `${imageUri.fileName}_${imageUri.fileSize}`,
      }),
    );
  };

  const handleSignup = async () => {
    if (!email.includes('@')) {
      setEmailError('Email address is not valid');
    }
    if (password.length < 8) {
      setPasswordError('Password length must be 8 characters');
    }

    const params = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    console.log(params);
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
        console.log('response-->>', JSON.stringify(res));
        navigation.navigate('HomePage');
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
        onChangeText={setFirstName}
        value={firstName}
      />
      <Text style={styles.label}>LastName</Text>
      <TextInput
        placeholder="Enter your LastName"
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
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
