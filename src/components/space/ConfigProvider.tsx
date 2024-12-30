import React, { PropsWithChildren } from 'react';
import { SizeType } from '@/components/Space';

export interface ConfigContextType {
  space?: {
    size?: SizeType;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export const ConfigContext = React.createContext<ConfigContextType>({});

interface ConfigProviderProps extends PropsWithChildren<ConfigContextType> {}

export function ConfigProvider(props: ConfigProviderProps) {
  const { space, children } = props;

  return (
    <ConfigContext.Provider value={{ space }}>
      {children}
    </ConfigContext.Provider>
  );
}
