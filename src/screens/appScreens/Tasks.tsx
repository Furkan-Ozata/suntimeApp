import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../navigation/stackPramsType';


const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class Tasks extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  
  render() {
    
    return (
        <View>
            <Text>Tasks</Text>
        </View>
     
    );
  }
}

const styles = StyleSheet.create({});
