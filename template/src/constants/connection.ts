import {isDev} from '@/constants/environment';

const DevConfig = {
  baseApiUrl: '',
};

const ProdConfig = {
  baseApiUrl: '',
};

export const {baseApiUrl} = isDev ? DevConfig : ProdConfig;

export const apiEndpoints = {};
