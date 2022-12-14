import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
} from 'axios';
import {baseApiUrl} from '@/constants';
import CacheService from './cacheService';
import Logger, {LogKeys} from './logger';

const globalInstance = axios.create({
  baseURL: baseApiUrl,
});

globalInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
  if (request.method === 'get') {
    const cacheKey = CacheService.getCacheKeyFromUrl(
      request.url || '',
      request?.params,
    );
    const cachedValue = await CacheService.get(cacheKey);

    if (cachedValue) {
      Logger.log(LogKeys.Cache, 'Returning from cache');
      request.adapter = config =>
        new Promise(resolve =>
          resolve({
            __cached: true,
            data: cachedValue,
            status: 200,
            statusText: 'OK',
            headers: request.headers as unknown as AxiosResponseHeaders,
            config,
            request,
          }),
        ) as AxiosPromise;
    }
  }

  request.headers = {
    ...(request.headers || {}),
  };
  return request;
});

globalInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config?.shouldCache && !response?.config?.__cached) {
      const cacheKey = CacheService.getCacheKeyFromUrl(
        response.config.url || '',
        response?.config?.params,
      );
      CacheService.save(cacheKey, response.data, response.config?.cacheTTL);
    }

    return {
      data: response.data,
      success: response.data?.success,
      status: response.status,
    } as any;
  },
  async (error: AxiosError) => {
    Logger.error(
      LogKeys.API,
      `${error.response?.config?.method} ${error.response?.config?.url} ->`,
      error,
      error.response?.data,
      error?.response?.status,
    );

    throw error;
  },
);

export default globalInstance;
