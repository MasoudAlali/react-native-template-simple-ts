import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView as RNSafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {persistor, store} from '@/store';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Modal from '@/components/ui/Modal';
import {
  useNavigationStateTracker,
  useNavigationTheme,
} from '@/hooks/navigation';
import {isTest, KeyboardBehaviour} from '@/constants';
import {MainStack, navigationRef} from '@/navigators';

const SA = Platform.select<any>({
  android: SafeAreaView,
  ios: RNSafeAreaView,
});

const App = () => {
  const {onReady, onStateChange} = useNavigationStateTracker();
  const {statusBarColor, navigationTheme} = useNavigationTheme();

  const Container: React.FC<{children: React.ReactNode}> = ({children}) =>
    isTest ? (
      <Provider store={store}>{children}</Provider>
    ) : (
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor as ReturnType<typeof persistStore>}>
          <GestureHandlerRootView style={styles.mainContainer}>
            {children}
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    );

  return (
    <Container>
      <SA style={styles.mainContainer}>
        <NavigationContainer
          ref={navigationRef}
          onReady={onReady}
          onStateChange={onStateChange}
          theme={navigationTheme}>
          <StatusBar barStyle={statusBarColor} />
          <KeyboardAvoidingView
            behavior={KeyboardBehaviour}
            style={styles.innerContainer}>
            <MainStack />
          </KeyboardAvoidingView>
        </NavigationContainer>
      </SA>
      <Modal />
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#00000000',
  },
  innerContainer: {
    flex: 1,
  },
});

export default App;
