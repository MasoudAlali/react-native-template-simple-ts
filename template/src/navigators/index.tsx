import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from '@/types/navigation';
import Home from '@/screens/Home';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

const MainStackNavigator =
  createNativeStackNavigator<Navigation.RootStackParamList>();

export const MainStack = () => {
  return (
    <MainStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}>
      <MainStackNavigator.Screen name={'Home'} component={Home} />
    </MainStackNavigator.Navigator>
  );
};
