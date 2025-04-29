import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
}
