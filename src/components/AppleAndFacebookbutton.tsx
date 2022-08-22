import React, {FC} from 'react';
import {Button, VStack, Center, NativeBaseProvider, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface Props {
  onPress: (p: object) => void;
  color: string;
  icon: string
  
}

const AppleAndFacebookButton: FC<Props> = props => {
 
  return (
    <NativeBaseProvider>
      <VStack   marginTop={5} alignItems="center">
        <Button
          bg={props.color}
          size={'md'}
          w={'80%'}
          h={'10'}
          onPress={props.onPress}
          leftIcon={<Icon as={Ionicons} name={props.icon} size="lg" />}>
        </Button>
      </VStack>
    </NativeBaseProvider>
  );
};

export default AppleAndFacebookButton;