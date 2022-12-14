import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {StackParams} from '../../navigation/stackPramsType';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Alert,
} from 'native-base';

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class Login extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login(email: string, password: string) {
    console.log(this.state.email);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch((err) => {
        Alert.alert(err);
      });
  }

  render() {
    return (
      <NativeBaseProvider>
        <Center flex={1} bgColor={'#13111D'} w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="#fff">
              Hoş Geldiniz
            </Heading>
            <Heading mt="1" color="#fff" fontWeight="800" size="md">
              Devam etmek için oturum açın!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label color={'white'}>Email</FormControl.Label>
                <Input color={'white'} onChangeText={text => this.setState({email: text})} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Şifre</FormControl.Label>
                <Input
                color={'white'}
                  onChangeText={text => this.setState({password: text})}
                  type="password"
                />
                <Link
                  _text={{
                    fontSize: 'sm',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  Şifreni mi unuttun?
                </Link>
              </FormControl>
              <Button
                onPress={() =>
                  this.login(this.state.email, this.state.password)
                }
                mt="2"
                bg="#7855FF">
                Giriş
              </Button>

              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="#fff">
                  Hemen Simdi{' '}
                </Text>
                <Link
                  onPress={() => navigation.navigate('Register')}
                  _text={{
                    color: 'indigo.500',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}>
                  KAYDOL
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    );
  }
}
