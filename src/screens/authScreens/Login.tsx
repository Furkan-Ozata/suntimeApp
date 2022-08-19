import React, {Component} from 'react';
import {Alert, Image, SafeAreaView,ScrollView,StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../navigation/stackPramsType';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";


const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class Login extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  homeGet = () => {
    navigation.navigate('Home');
  };

  render() {
    
    return (
        <NativeBaseProvider>
        <Center  flex={1} bgColor={"#2A2541"} w="100%">
        <Box     safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="#fff" _dark={{
          color: "warmGray.50"
        }}>
            Welcome
          </Heading>
          <Heading mt="1"color="#fff" fontWeight="800" size="md">
            Sign in to continue!
          </Heading>
  
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label color={"white"}>Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link onPress={()=>navigation.navigate('Home')} _text={{
              fontSize: "sm",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="purple">
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="#fff">
                I'm a new user.{" "}
              </Text>
              <Link onPress={()=>navigation.navigate('Register')}_text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
      </NativeBaseProvider>
    );
}
}

