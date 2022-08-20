import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../navigation/stackPramsType';
import {Dropdown} from 'react-native-element-dropdown';


const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class PrayerTime extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
          country: [],
          cities: [],
          town: [],
          time: [],
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
        this.setState({time: time[0]});
      };
    
      render() {
        return (
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
            <View style={styles.textContainer}>
              <Text style={styles.dateText}>Tarih : {this.state.time[0]}</Text>
              <Text style={styles.prayerDateText}>
                Imsak : {this.state.time[1]}
              </Text>
              <Text style={styles.prayerDateText}>
                Gunes : {this.state.time[2]}
              </Text>
              <Text style={styles.prayerDateText}>Ogle : {this.state.time[3]}</Text>
              <Text style={styles.prayerDateText}>
                Aksam : {this.state.time[4]}
              </Text>
              <Text style={styles.prayerDateText}>
                Yatsi : {this.state.time[5]}
              </Text>
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#102D66',
        alignItems: 'center',
        paddingTop: '15%',
      },
    
      dropdown: {
        margin: '1%',
        height: '5%',
        width: '90%',
        backgroundColor: '#800070',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#800070',
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
        fontSize: 35,
        color: '#800070',
        fontWeight: 'bold',
      },
      textContainer: {
        marginTop: '20%',
        paddingLeft: '5%',
      },
    });
    