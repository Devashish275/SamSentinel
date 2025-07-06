import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import FinalBillScreen from '../screens/FinalBillScreen';
import MrWaltScreen from '../screens/MrWaltScreen';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.BACKGROUND },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="FinalBill" component={FinalBillScreen} />
        <Stack.Screen name="MrWalt" component={MrWaltScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 