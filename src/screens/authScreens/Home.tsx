import React, {Component} from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../navigation/stackPramsType';
import MailAndGmailButton from '../../components/MailAndGmailButton';
import AppleAndFacebookButton from '../../components/AppleAndFacebookbutton';
import {Text, Link, NativeBaseProvider, HStack} from 'native-base';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class Home extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '56410204684-a836r12d2qcogv0j0v8g1lvbmadnpebd.apps.googleusercontent.com',
    });
  }

  async googleSignIn() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  // async facebookSignIn() {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // }

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
              color={'#7855FF'}
              onPress={() => navigation.navigate('Login')}
              title={'E-POSTA ILE DEVAM ET'}
            />
            <MailAndGmailButton
              icon={'logo-google'}
              color={'red.900'}
              onPress={() =>
                this.googleSignIn().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
              title={'GOOGLE ILE DEVAM ET'}
            />
             <MailAndGmailButton
                icon={'logo-apple'}
                color={'black'}
                onPress={() => Alert.alert('APPLE')}
              title={'APPLE ILE DEVAM ET'}
            />
            {/* <View style={styles.button}>
              <AppleAndFacebookButton
                icon={'logo-apple'}
                color={'black'}
                onPress={() => Alert.alert('APPLE')}
              />
              <AppleAndFacebookButton
                icon={'logo-facebook'}
                color={'blue.600'}
                onPress={() =>
                  this.facebookSignIn().then(() =>
                    console.log('Signed in with Facebook!'),
                  )
                }
              />
            </View> */}

            <HStack mt="6" justifyContent="center">
              <Text fontSize="lg" color="#fff">
                Hemen Simdi{' '}
              </Text>
              <Link
                onPress={() => navigation.navigate('Register')}
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'lg',
                }}>
                KAYDOL
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
    backgroundColor: '#13111D',
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
  button: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    marginTop: 50,
    width: 300,
    resizeMode: 'contain',
    height: 300,
  },
});
