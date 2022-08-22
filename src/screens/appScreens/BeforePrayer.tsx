import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../navigation/stackPramsType';

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class AfterPrayer extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      currentTime: null,
      currentDay: null,
      daysArray: [
        'pazar',
        'pazartesi',
        'sali',
        'carsamba',
        'persembe',
        'cuma',
        'cumartesi',
        'pazar'
      ],
    };
  }

  componentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds< 10) {
      seconds = '0' + seconds;
    }

    if (hour == 0) {
      hour = '00';
    }

  

    this.setState({
      currentTime: hour + ':' + minutes + ':' + seconds + ' ' ,
    });

    this.state.daysArray.map((item, key) => {
      if (key == new Date().getDay()) {
        this.setState({currentDay: item.toUpperCase()});
      }
    });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.daysText}>{this.state.currentDay}</Text>
          <Text style={styles.timeText}>{this.state.currentTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 50,
    color: '#f44336',
  },
  daysText: {
    color: '#2196f3',
    fontSize: 25,
    paddingBottom: 0,
  },
});
