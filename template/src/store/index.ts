import {combineReducers} from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import general from './general';
import StorageService from '@/services/storageService';
import {isTest} from '@/constants';

const reducers = combineReducers({
  general,
});

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: StorageService,
  blacklist: [],
};

const persistedReducer = persistReducer<RootState>(persistConfig, reducers);

const store = isTest
  ? configureStore({
      reducer: reducers,
    })
  : configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        });
      },
    });

const persistor = isTest ? null : persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
