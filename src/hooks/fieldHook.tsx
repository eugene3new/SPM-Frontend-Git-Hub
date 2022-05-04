import { IOptions } from '@common/RepeaterOld/models';
import React from 'react';
import { useAxiosNextAuth } from './requestHook';

export const useAutoCompleteOptions = (options: string | IOptions[]): IOptions[] => {
  const API = useAxiosNextAuth();
  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState<IOptions[]>([]);

  const fetchOptions = React.useCallback(
    async (url: string) => {
      const response = await API.get<string[]>(url);
      const responseOptions = response.data.map((item) => {
        return { value: item, label: item };
      });
      setAutoCompleteOptions(responseOptions);
    },
    [API]
  );

  React.useEffect(() => {
    if (typeof options === 'string') {
      fetchOptions(options);
    } else {
      setAutoCompleteOptions(options);
    }
  }, [options, fetchOptions]);

  return autoCompleteOptions;
};
