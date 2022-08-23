import CheckBox from '@react-native-community/checkbox';
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Pressable,
} from 'react-native';
import AnimatedScrollView from '../../navigation/tabBar/AnimatedScrollView';



export default class BeforePrayer extends Component {
  //State variables

  constructor(props: any) {
    super(props);
    this.state = {
      beforePrayerList: [],
      value: '',
    };
  }

  // A function that add data to the list array
  addText(text: any) {
    if (this.state.value !== '') {
      this.state.beforePrayerList.push({
        ...this.state.beforePrayerList[this.state.beforePrayerList.length + 1],
        text: text,
        isSelected: false,
      });

      this.setState({value: ''});
    } else {
      Alert.alert('Please type in something!');
    }
  }

  // A function that set the value of isSelected based on the state of the checkbox
  setIsSelected(index: number, value: boolean) {
    let data = [];
    // Making a deep copy of the list array
    for (let i = 0; i < this.state.beforePrayerList.length; i++) {
      if (index === i) {
        data.push({...this.state.beforePrayerList[i], isSelected: value}); // Updating the object at position i === index
      } else {
        data.push(this.state.beforePrayerList[i]);
      }
    }

    this.setState({beforePrayerList: data}); // Setting the new state
  }

  // A function that delete an item at position idx from the list array
  deleteItem(idx: number) {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          const data = this.state.beforePrayerList.filter(
            (item: any, index: any) => index !== idx,
          );
          this.setState({beforePrayerList: data});
        },
      },
    ]);
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 24,
              color: '#fff',
              marginBottom: 15,
            }}>
            What need to be done.
          </Text>
          <AnimatedScrollView>
            <FlatList
              style={{flex: 1}}
              data={this.state.beforePrayerList}
              renderItem={({item, index}) => (
                <Pressable
                  style={styles.view}
                  onLongPress={() => this.deleteItem(index)}>
                  <CheckBox
                    style={styles.checkbox}
                    value={item.isSelected}
                    onValueChange={value => this.setIsSelected(index, value)}
                  />
                  <Text
                    style={{
                      ...styles.text,
                      textDecorationLine: item.isSelected
                        ? 'line-through'
                        : 'none',
                    }}>
                    {item.text}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </AnimatedScrollView>
        </View>
        <View style={styles.textBoxWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="New Task"
            placeholderTextColor={'#003131'}
            onChangeText={text => this.setState({value: text})}
            value={this.state.value}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.addText(this.state.value)}>
            <Text style={{fontSize: 34, color: '#fff'}}>+</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 10,
      flex: 4,
      backgroundColor: '#13111D',
      padding: 19,
    },
    textBoxWrapper: {
      width: '100%',
      bottom: 35,
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 19,
      flex: 1,
    },
    textInput: {
      elevation: 5,
      shadowColor: '#fff',
      shadowOffset: {width: 2, height: 12},
      shadowRadius: 12,
      borderRadius: 25,
      backgroundColor: '#fff',
      height: 42,
      paddingLeft: 15,
      width: '90%',
      color: '#003131',
      marginRight: 15,
      fontSize: 20,
    },
    btn: {
      elevation: 5,
      shadowColor: '#fff',
      shadowOffset: {width: 2, height: 12},
      shadowRadius: 12,
      backgroundColor: '#7855FF',
      height: 42,
      width: 42,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    view: {
      elevation: 5,
      shadowColor: '#fff',
      shadowOffset: {width: 2, height: 12},
      shadowRadius: 12,
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 19,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 15,
    },
    text: {
      fontSize: 20,
      color: ' #003131',
    },
    checkbox: {
      marginRight: 15,
    },
  });
