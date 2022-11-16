import React, {useCallback, useRef} from 'react';
import AnalyticService from '@/services/analyticService';
import {StatusBarStyle, useColorScheme} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';
import {Colors} from '@/constants';
import {navigationRef} from '@/navigators';

export const useNavigationStateTracker = () => {
  const routeNameRef = React.useRef<string>();

  const onReady = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, []);

  const onStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRoute = navigationRef.current?.getCurrentRoute();
    const currentRouteName = currentRoute?.name;
    const currentRouteParams = currentRoute?.params;

    if (previousRouteName !== currentRouteName) {
      AnalyticService.logScreenView(currentRouteName, currentRouteParams || {});
    }
    routeNameRef.current = currentRouteName;
  }, []);

  return {
    onReady,
    onStateChange,
    routeName: routeNameRef.current,
  };
};

export const useNavigationTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationTheme = useRef({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.core_100,
    },
  });

  return {
    isDarkMode,
    statusBarColor: (isDarkMode
      ? 'light-content'
      : 'dark-content') as StatusBarStyle,
    navigationTheme: navigationTheme.current,
  };
};
