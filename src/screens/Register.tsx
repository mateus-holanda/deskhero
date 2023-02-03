import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!property || !description) {
      return Alert.alert('Register', 'Please, fill in all fields.');
    }

    setIsLoading(true);

    firestore().collection('orders').add({
      property,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      Alert.alert('Request', 'Request registered successfully!');
      navigation.goBack();
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
      return Alert.alert('Request', 'Something went wrong while creating your request.');
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="New request" />

      <Input
        placeholder="Property Number"
        mt={4}
        onChangeText={setProperty}
      />

      <Input
        placeholder="Problem description"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Register"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}