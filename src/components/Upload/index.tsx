import { FC, useRef, ChangeEvent, PropsWithChildren } from 'react';
import axios from 'axios';
import UploadList, { UploadFile } from './UploadList';

import './index.scss';

const fileList: UploadFile[] = [
  {
    uid: '11',
    size: 111,
    name: 'xxxx',
    status: 'uploading',
    percent: 50,
  },
  {
    uid: '22',
    size: 111,
    name: 'yyy',
    status: 'success',
    percent: 50,
  },
  {
    uid: '33',
    size: 111,
    name: 'zzz',
    status: 'error',
    percent: 50,
  },
];

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
  /**
   * 传之前的回调，如果返回 false 就不上传，也可以返回 promise，比如在服务端校验的时候，等 resolve 之后才会上传
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * 进度更新时的回调，可以拿到进度
   */
  onProgress?: (percentage: number, file: File) => void;
  /**
   * 上传成功时的回调
   */
  onSuccess?: (data: any, file: File) => void;
  /**
   * 上传失败时的回调
   */
  onError?: (err: any, file: File) => void;
  /**
   * 上传状态改变时的回调
   */
  onChange?: (file: File) => void;
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
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
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
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
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

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          // 进度需要用已上传和总数算出
          const percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        onSuccess?.(resp.data, file);
        onChange?.(file);
      })
      .catch((err) => {
        onError?.(err, file);
        onChange?.(file);
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
      <UploadList fileList={fileList} onRemove={() => {}} />
    </div>
  );
};

export default Upload;
