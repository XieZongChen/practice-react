import { FC, useRef, ChangeEvent, PropsWithChildren, useState } from 'react';
import axios from 'axios';
import UploadList, { UploadFile } from './UploadList';
import Dragger from './Dragger';
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
  /**
   * 同 axios 的 withCredentials，请求为跨域类型时是否在请求中协带 cookie
   */
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
   * 是否可以拖拽上传
   */
  drag?: boolean;
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
  /**
   * 文件列表删除的回调
   */
  onRemove?: (file: UploadFile) => void;
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
    drag,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    children,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList: UploadFile[]) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList: UploadFile[]) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

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
    const uploadFile: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList: UploadFile[]) => {
      return [uploadFile, ...prevList];
    });

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
            updateFileList(uploadFile, {
              percent: percentage,
              status: 'uploading',
            });

            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(uploadFile, { status: 'success', response: resp.data });

        onSuccess?.(resp.data, file);
        onChange?.(file);
      })
      .catch((err) => {
        updateFileList(uploadFile, { status: 'error', error: err });

        onError?.(err, file);
        onChange?.(file);
      });
  };

  return (
    <div className='upload-component'>
      <div className='upload-input' onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
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
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
