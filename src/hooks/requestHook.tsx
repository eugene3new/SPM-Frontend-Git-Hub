import { isBrowser } from '@helpers';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IMessage } from 'context/NotificationContext';
import { IErrorResponse, IPatchRequest } from 'models/request';
import { DefaultSession } from 'next-auth';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useContentLoadingLine, useMessage } from './contextHook';

export interface CustomSession extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string | null;
  };
  expires?: string;
}

interface IResponseMessage {
  text: string;
}

export const useAxiosNextAuth = () => {
  const [data]: [data: CustomSession | null, isLoading: boolean] = useSession();
  const [uiResponseMessage, setUiResponseMessage] = React.useState<IMessage | null>(null);
  const { addMessage } = useMessage();

  React.useEffect(() => {
    if (addMessage && uiResponseMessage) {
      addMessage(uiResponseMessage);
      // Temporary will delete and change later
      if (isBrowser) {
        setTimeout(() => {
          addMessage(null);
        }, 5000);
      }
    }
  }, [addMessage, uiResponseMessage]);

  const nextAuthAxiosInstance = React.useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    const request = (config: AxiosRequestConfig) => {
      if (data && data.user?.accessToken) {
        const newConfig = config;
        newConfig.headers.Authorization = `Bearer ${data.user?.accessToken}`;
      }
      return config;
    };

    const response = (rsp: AxiosResponse) => rsp;
    const error = (err: AxiosError) => {
      if (err.response) {
        if (err.response.status === 400) {
          console.log(err.response.data);
          if (err.response.data.title) {
            // setUiResponseMessage({ title: 'Error', text: err.response.data.title, status: 'danger' });
          }
        }
        /*
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        */
        return Promise.reject<IErrorResponse>(err.response.data);
      }
      return Promise.reject(err);
    };
    axiosInstance.interceptors.request.use(request, error);
    axiosInstance.interceptors.response.use(response, error);
    return axiosInstance;
  }, [data]);

  return nextAuthAxiosInstance;
};

export const useFormHttpHelper = (
  initial: any,
  url: string | undefined
): [any, (data: any) => Promise<AxiosResponse<any>> | null, boolean, (value: boolean) => void] => {
  const { setIsLineLoaderShowing } = useContentLoadingLine();
  const [getFields, setFields] = React.useState(initial);
  const [error, setError] = React.useState();
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const API = useAxiosNextAuth();

  const fetchFormData = React.useCallback(async () => {
    if (API && url) {
      setIsLineLoaderShowing(true);
      try {
        const response = await API.get(url);
        if (response.data) {
          setFields(response.data);
          setIsEdit(true);
        } else {
          setIsEdit(false);
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLineLoaderShowing(false);
      }
    }
  }, [url, API, setIsLineLoaderShowing]);

  React.useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  const customRequest = (data: Record<string, string>) => {
    if (url) {
      if (isEdit) {
        const patchObject: IPatchRequest[] = [];
        Object.keys(data).forEach((key) => {
          patchObject.push({
            path: key,
            op: 'replace',
            value: data[key],
          });
        });
        const patch = API.patch(url, patchObject);
        return patch;
      }
      const post = API.post(url, data);
      return post;
    }
    return null;
  };

  const setIsEditable = (value: boolean) => {
    setIsEdit(value);
  };

  return [getFields, customRequest, isEdit, setIsEditable];
};
