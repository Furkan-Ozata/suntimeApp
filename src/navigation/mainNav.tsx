import React, {FC, useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import TabBarProvider from './tabBar/TabBarProvider';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(235, 25, 35)',
    background: '#13111D',
  },
};

const MainNav: FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <TabBarProvider>
      <NavigationContainer theme={MyTheme}>
        {user !== null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </TabBarProvider>
  );
};

export default MainNav;
