import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
} from 'axios';
import {apiEndpoints, baseApiUrl} from '@/constants';
import CacheService from './cacheService';
import Logger, {LogKeys} from './logger';

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
});

axiosInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
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

axiosInstance.interceptors.response.use(
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

export const fileReader: (
  fileId?: Nullable<string>,
  endpoint?: string,
  params?: Nullable<object>,
) => Promise<{
  data: Nullable<string>;
  status: number;
  success: boolean;
  errorType?: 'SINGLE' | 'MULTIPLE';
  errorReason?: string;
}> = async (fileId, endpoint = apiEndpoints.documents.download, params) => {
  try {
    const {data} = await axiosInstance.get(endpoint, {
      responseType: 'blob',
      params: params || {
        fileId,
      },
    });
    if (!data) {
      return {
        data: null,
        status: 500,
        success: false,
      };
    }
    return {
      data: await new Promise((resolve, reject) => {
        const fr = new FileReader();
        // @ts-ignore
        fr.onloadend = ({target: {result}}) => {
          resolve(result);
        };
        // @ts-ignore
        fr.onerror = ({target: {error}}) => reject(error);
        fr.readAsDataURL(data);
      }),
      status: 200,
      success: true,
    };
  } catch (e) {
    return {
      data: null,
      success: false,
      status: 500,
      errorReason: (e as Error).message,
    };
  }
};

const _get = axiosInstance.get;

axiosInstance.get = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
): Promise<R> => {
  return new Promise(resolve =>
    requestAnimationFrame(() => {
      resolve(_get(url, config));
    }),
  );
};

export default axiosInstance;
