import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab: FC = ({ color,onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {<Ionicons name={icon} size={30} color={color} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default Tab;
