import { FC, useRef, ChangeEvent, PropsWithChildren } from 'react';


import './index.scss';

export interface UploadProps extends PropsWithChildren {
  action: string;
  headers?: Record<string, any>;
  name?: string;
  data?: Record<string, any>;
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
  } = props;


  return (
    <div className='upload-component'>
      <div className='upload-input'>
        {children}
        <input
          className='upload-file-input'
          type='file'
        />
      </div>
    </div>
  );
};

export default Upload;
