import { VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { Header } from '../components/Header';

interface RouteParams {
  orderId: string;
}

export function Details() {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Request details" />
    </VStack>
  );
}
