import React, {FC} from 'react';
import {Button, VStack, Center, NativeBaseProvider, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface Props {
  title: string;
  onPress: (p: object) => void;
  color: string;
  icon: string
}

const mailAndGmailButton: FC<Props> = props => {
  return (
    <NativeBaseProvider>
      <VStack  marginTop={5} alignItems="center">
        <Button
          bg={props.color}
          size={'md'}
          w={'85%'}
          h={'10'}
          onPress={props.onPress}
          leftIcon={<Icon as={Ionicons} name={props.icon} size="lg" />}>
          {props.title}
        </Button>
      </VStack>
    </NativeBaseProvider>
  );
};

export default mailAndGmailButton;
