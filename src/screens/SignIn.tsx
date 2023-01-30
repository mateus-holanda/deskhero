import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('SignIn', 'Please, provide your e-mail and password.');
    }

    setIsLoading(true);

    auth().signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
      setIsLoading(false);

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return Alert.alert('Enter', 'Invalid e-mail or password.');
      }

      if (error.code === 'auth/invalid-email') {
        return Alert.alert('Enter', 'Please, provide a valid e-mail.');
      }

      return Alert.alert('Enter', 'An error occured while trying to sign in.');
    });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        SignIn
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Enter"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  )
}