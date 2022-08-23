// import React, {Component} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {StackParams} from '../../navigation/stackPramsType';

// const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

// export default class AfterPrayer extends Component {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       currentTime: null,
//       currentDay: null,
//       daysArray: [
//         'pazar',
//         'pazartesi',
//         'sali',
//         'carsamba',
//         'persembe',
//         'cuma',
//         'cumartesi',
//         'pazar'
//       ],
//     };
//   }

//   componentWillMount() {
//     this.getCurrentTime();
//   }

//   getCurrentTime = () => {
//     let hour = new Date().getHours();
//     let minutes = new Date().getMinutes();
//     let seconds = new Date().getSeconds();

//     if (minutes < 10) {
//       minutes = '0' + minutes;
//     }

//     if (seconds< 10) {
//       seconds = '0' + seconds;
//     }

//     if (hour == 0) {
//       hour = '00';
//     }

//     this.setState({
//       currentTime: hour + ':' + minutes + ':' + seconds + ' ' ,
//     });

//     this.state.daysArray.map((item, key) => {
//       if (key == new Date().getDay()) {
//         this.setState({currentDay: item.toUpperCase()});
//       }
//     });
//   };
//   componentWillUnmount() {
//     clearInterval(this.timer);
//   }

//   componentDidMount() {
//     this.timer = setInterval(() => {
//       this.getCurrentTime();
//     }, 1000);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View>
//           <Text style={styles.daysText}>{this.state.currentDay}</Text>
//           <Text style={styles.timeText}>{this.state.currentTime}</Text>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === 'ios' ? 20 : 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 30,
//     textAlign: 'center',
//     margin: 10,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   timeText: {
//     fontSize: 50,
//     color: '#f44336',
//   },
//   daysText: {
//     color: '#2196f3',
//     fontSize: 25,
//     paddingBottom: 0,
//   },
// });

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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class AfterPrayer extends Component {
  //State variables

  constructor(props: any) {
    super(props);
    this.state = {
      afterPrayerList: [],
      value: '',
    };
  }

  //   componentDidMount() {
  //     const {currentUser} = auth();
  //     const {uid} = currentUser;

  //     firestore()
  //       .collection('listOfGames')
  //       .onSnapshot(snapshot => {
  //         const historiesMap = [];
  //         snapshot.forEach(doc => {
  //           historiesMap.push({...doc.data(), ref: doc.ref, id: doc.id});
  //         });
  //         historiesMap.sort((a, b) => a.createdAt - b.createdAt);

  //         this.setState({
  //           listOfGamesState: historiesMap,
  //         });
  //       });
  //   }

  // A function that add data to the list array
  addText(text: any) {
    if (this.state.value !== '') {
      this.state.afterPrayerList.push({
        ...this.state.afterPrayerList[this.state.afterPrayerList.length + 1],
        text: text,
        isSelected: false,
      });
      const {currentUser} = auth();
      const {uid} = currentUser;
      firestore()
        .collection('Users')
        .doc(uid)
        .set({
          afterPrayerList: this.state.afterPrayerList,
        })
        .then(() => {
          console.log('User added!');
        });

      this.setState({value: ''});900
    } else {
      Alert.alert('Please type in something!');
    }
  }

  // A function that set the value of isSelected based on the state of the checkbox
  setIsSelected(index: number, value: boolean) {
    let data = [];
    // Making a deep copy of the list array
    for (let i = 0; i < this.state.afterPrayerList.length; i++) {
      if (index === i) {
        data.push({...this.state.afterPrayerList[i], isSelected: value}); // Updating the object at position i === index
      } else {
        data.push(this.state.afterPrayerList[i]);
      }
    }

    this.setState({afterPrayerList: data}); // Setting the new state
    const {currentUser} = auth();
    const {uid} = currentUser;
    firestore()
      .collection('Users')
      .doc(uid)
      .update({
        afterPrayerList: data,
      })
      .then(() => {
        console.log('User added!');
      });
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
          const data = this.state.afterPrayerList.filter(
            (item: any, index: any) => index !== idx,
          );

          this.setState({afterPrayerList: data});
          const {currentUser} = auth();
          const {uid} = currentUser;
          firestore()
            .collection('Users')
            .doc(uid)
            .update({
              afterPrayerList: data,
            })
            .then(() => {
              console.log('User added!');
            });
        },
      },
    ]);
  }

  componentDidMount() {
    const {currentUser} = auth();
    const {uid} = currentUser;

    // const subscriber= firestore()
    //   .collection('Users')
    //   .doc(uid)
    //   .get()
    //   .then(list => {
    //     const listData = list.data();
    //     let data = listData.afterPrayerList;
    //     this.state.afterPrayerList = data;
    //   })
    //   .catch(err => console.log(err));
    firestore()
          .collection('Users')
          .doc(uid)
          .onSnapshot(list => {
              const listData = list.data();
              let data = listData.afterPrayerList;

              this.state.afterPrayerList = data;

              console.log(this.state.afterPrayerList);
          });
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
              data={this.state.afterPrayerList}
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
