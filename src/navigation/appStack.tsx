import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PrayerTime, BeforePrayer, AfterPrayer} from '../screens';
import TabBar from './tabBar/TabBar';

const AppStack: FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName='PrayerTime' tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="BeforePrayer"
        component={BeforePrayer}
        initialParams={{icon: 'moon-outline'}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="PrayerTime"
        component={PrayerTime}
        initialParams={{icon: 'time-outline'}}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="AfterPrayer"
        component={AfterPrayer}
        initialParams={{icon: 'sunny-outline'}}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
export default AppStack;
