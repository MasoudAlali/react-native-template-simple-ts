import {Platform} from 'react-native';

export const KeyboardBehaviour = Platform.OS === 'ios' ? 'padding' : undefined;
