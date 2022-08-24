import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {StackParams} from '../../navigation/stackPramsType';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
} from 'native-base';

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class Register extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  register(email: string, password: string) {
    console.log(this.state.email);
    auth()
      .createUserWithEmailAndPassword(email, password)
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

  render() {
    return (
      <NativeBaseProvider>
        <Center flex={1} bgColor={'#13111D'} px="3" w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              size="lg"
              color="#fff"
              _dark={{
                color: 'warmGray.50',
              }}
              fontWeight="semibold">
              Hoş Geldiniz
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="medium"
              size="xs">
              Devam etmek için kaydolun!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  color={'white'}
                  onChangeText={text => this.setState({email: text})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Şifre</FormControl.Label>
                <Input
                  color={'white'}
                  onChangeText={text => this.setState({password: text})}
                  type="password"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Şifreyi onayla</FormControl.Label>
                <Input color={'white'} type="password" />
              </FormControl>
              <Button
                onPress={() =>
                  this.register(this.state.email, this.state.password)
                }
                mt="2"
                bg="#7855FF">
                KAYDOL
              </Button>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    );
  }
}
