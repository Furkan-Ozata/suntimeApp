import React, {Component} from 'react';
import {Alert, Button, Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../navigation/stackPramsType';
import MailAndGmailButton from '../../components/MailAndGmailButton';
import AppleAndFacebookButton from '../../components/AppleAndFacebookbutton';
import { Text,Link, NativeBaseProvider, HStack } from "native-base";

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class Home extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  loginGet = () => {
    navigation.navigate('Login');
  };

  render() {
    
    return (
      <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <View style={styles.topView}>
          <Image
            style={styles.image}
            source={require('../../assets/img/sun-logo.png')}
          />
        </View>
        <View style={styles.buttonContainer}>
      
          <MailAndGmailButton
            icon={'mail-outline'}
            color={'purple.900'}
            onPress={()=>{navigation.navigate('Login')}}
            title={'E-POSTA ILE DEVAM ET'}
          />
          <MailAndGmailButton
            icon={'logo-google'}
            color={'red.900'}
            onPress={() => Alert.alert('gmail')}
            title={'GOOGLE ILE DEVAM ET'}
            
          />
          <View style={styles.button}>
          <AppleAndFacebookButton
              icon={'logo-apple'}
              color={'black'}
              onPress={() => Alert.alert('APPLE')} title={''}            
          />
          <AppleAndFacebookButton
              icon={'logo-facebook'}
              color={'blue.500'}
              onPress={() => Alert.alert('Facebook')} title={''}           
          />
          </View>
          {/* <MailAndGmailButton
            icon={'arrow-forward-outline'}
            color={'purple.900'}
            onPress={() => Alert.alert('email')}
            title={'KAYDOL'}
          /> */}
        
        <HStack mt="6" justifyContent="center">
              <Text fontSize="lg" color="#fff">
                I'm a new user.{" "}
              </Text>
              <Link onPress={()=>navigation.navigate('Register')} _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "lg"
            }} >
                Sign Up
              </Link>
            </HStack>
              
        </View>
      </ScrollView>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2A2541',
  },
  topView: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  buttonContainer: {
    resizeMode: 'contain',
    marginTop: '20%',
  },
  button:{
    display: "flex",
    flexDirection:"row"
  },
  image: {
    marginTop: 50,
    width: 300,
    resizeMode: 'contain',
    height: 300,
  },
});
