import { FC, useRef, ChangeEvent, PropsWithChildren } from 'react';
import axios from 'axios';

import './index.scss';

export interface UploadProps extends PropsWithChildren {
  /**
   * 上传的 url
   */
  action: string;
  /**
   * 上传的请求头
   */
  headers?: Record<string, any>;
  /**
   * 文件表单字段名
   */
  name?: string;
  /**
   * 上传携带数据
   */
  data?: Record<string, any>;
  withCredentials?: boolean;
  /**
   * 文件格式
   */
  accept?: string;
  /**
   * 是否多选上传
   */
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

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      post(file);
    });
  };

  const post = (file: File) => {
    const formData = new FormData();

    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials,
    });
  };

  return (
    <div className='upload-component'>
      <div className='upload-input' onClick={handleClick}>
        {children}
        {/* 为了样式，将此 input 隐藏，由 upload-input 的 handleClick 触发上传 */}
        <input
          className='upload-file-input'
          type='file'
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

export default Upload;
