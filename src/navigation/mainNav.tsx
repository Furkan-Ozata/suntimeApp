import React, {FC} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppStack from './appStack';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(235, 25, 35)',
    background: '#2A2541',
  },
};

const MainNav: FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppStack />
    </NavigationContainer>
  );
};

export default MainNav;
