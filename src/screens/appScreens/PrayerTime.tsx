import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../navigation/stackPramsType';
import {Dropdown} from 'react-native-element-dropdown';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AnimatedScrollView from '../../navigation/tabBar/AnimatedScrollView';
import MailAndGmailButton from '../../components/MailAndGmailButton';
import store from '../../store/MainStore';
import { observer } from 'mobx-react';

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

observer;
export default class Tab1 extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      country: [],
      cities: [],
      town: [],

      valueDropdownCountry: '',
      valueDropdownCities: '',
      valueDropdownTown: '',
    };
  }

  async componentDidMount() {
    const countryResponse = await fetch(
      'https://namaz-vakti-api.herokuapp.com/countries',
    );
    const country = await countryResponse.json();
    this.setState({country: country});
    
  }
  getCities = async UlkeID => {
    const citiesResponse = await fetch(
      `https://namaz-vakti-api.herokuapp.com/cities?country=${UlkeID}`,
    );
    const cities = await citiesResponse.json();
    this.setState({cities: cities});
  };
  getTown = async SehirID => {
    const townResponse = await fetch(
      `https://namaz-vakti-api.herokuapp.com/regions?country=2&city=${SehirID}`,
    );
    const town = await townResponse.json();
    this.setState({town: town});
  };
  getTime = async IlceID => {
    const timeResponse = await fetch(
      `https://namaz-vakti-api.herokuapp.com/data?region=${IlceID}`,
    );
    const time = await timeResponse.json();
    store.time = time[0];
  };

  signOut() {
    //sign out with email adress
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    //google sign out
    GoogleSignin.signOut();
  }

  render() {
    return (
      <AnimatedScrollView>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={this.state.country}
            search
            maxHeight={300}
            labelField="UlkeAdi"
            valueField="UlkeID"
            placeholder={'Select Country'}
            searchPlaceholder="Search..."
            value={this.state.valueDropdownCountry}
            onChange={item => {
              this.setState({
                valueDropdownCountry: item.UlkeID,
              });
              this.getCities(item.UlkeID);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={this.state.cities}
            search
            maxHeight={300}
            labelField={
              this.state.valueDropdownCountry === '2' ? 'sehirAdi' : 'SehirAdi'
            }
            valueField={
              this.state.valueDropdownCountry === '2' ? 'sehirID' : 'SehirID'
            }
            placeholder={'Select City'}
            searchPlaceholder="Search..."
            value={this.state.valueDropdownCities}
            onChange={item => {
              if (this.state.valueDropdownCountry == '2') {
                this.setState({
                  valueDropdownCities: item.sehirID,
                });
                this.getTown(item.sehirID);
              } else {
                this.setState({
                  valueDropdownCities: item.SehirID,
                });
                this.getTown(item.SehirID);
              }
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={this.state.town}
            search
            maxHeight={300}
            labelField="IlceAdi"
            valueField="IlceID"
            placeholder={'Select Town'}
            searchPlaceholder="Search..."
            value={this.state.valueDropdownTown}
            onChange={item => {
              this.setState({
                valueDropdownCountry: item.IlceID,
              });
              this.getTime(item.IlceID);
            }}
          />
          <Button title={'TAMAM'} onPress={() => this.componentDidMount()} />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>NAMAZ VAK??TLER??</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.prayerDateText}>??msak : {store.time[1]}</Text>
          <Text style={styles.prayerDateText}>G??nes : {store.time[2]}</Text>
          <Text style={styles.prayerDateText}>????le : {store.time[3]}</Text>
          <Text style={styles.prayerDateText}>??kindi : {store.time[4]}</Text>
          <Text style={styles.prayerDateText}>Ak??am : {store.time[5]}</Text>
          <Text style={styles.prayerDateText}>Yats?? : {store.time[6]}</Text>
        </View>
        <View style={styles.exitButton}>
          <MailAndGmailButton
            icon={'exit-outline'}
            color={'red.900'}
            onPress={() => this.signOut()}
            title={'HESAPTAN ??IKIS YAP'}
          />
        </View>
      </AnimatedScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13111D',
    alignItems: 'center',
    paddingTop: '15%',
  },

  dropdown: {
    margin: '3%',
    height: '15%',
    width: '90%',
    backgroundColor: '#7855FF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#7855FF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: 17,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  prayerDateText: {
    fontSize: 30,
    color: '#fff',
  },
  dateText: {
    fontSize: 40,
    color: '#7855FF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  date: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: '5%',
    paddingLeft: '27%',

    justifyContent: 'flex-end',
  },
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '15%',
  },
});