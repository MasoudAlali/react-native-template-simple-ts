import {StackScreenProps} from '@react-navigation/stack';

export namespace Navigation {
  export type AllParams = undefined;

  export type RootStackParamList = {
    Home: undefined;
  };

  export interface Page<T extends keyof RootStackParamList>
    extends StackScreenProps<RootStackParamList, T> {}
}
