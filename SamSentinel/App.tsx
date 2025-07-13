import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/contexts/CartContext';
import { COLORS } from './src/constants/colors';

const App = () => (
  <CartProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </CartProvider>
);

export default App;
