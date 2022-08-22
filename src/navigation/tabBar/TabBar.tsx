import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useTabBar } from './TabBarProvider';
import Tab from './Tab';

const { width } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('PrayerTime');
  const { routes } = state;
  const renderColor = currentTab => (currentTab === selected ? '#13111D' : '#fff');

  const { showTabBar } = useTabBar();

  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY: animation }] }]}
      >
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#7855FF',
    width: "85%",
    height: 70,
    borderRadius: 30,
    elevation: 2,
  },
});

export default TabBar;
