import React, { FC } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home, Login, Register} from "../screens";


const AuthStack: FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="GameCreate" screenOptions={{
      title: '', headerStyle: {
        backgroundColor: '#2A2541',
      },
    }}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
export default AuthStack