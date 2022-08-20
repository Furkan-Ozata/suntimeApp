import React, { FC } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Tasks, PrayerTime} from "../screens";


const AppStack: FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="GameCreate" screenOptions={{
      title: '', headerStyle: {
        backgroundColor: '#2A2541',
      },
    }}>
      <Stack.Screen name="PrayerTime" component={PrayerTime} options={{ headerShown: false }} />
      <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
export default AppStack