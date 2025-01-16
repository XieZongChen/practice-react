import React, { useRef } from 'react';
import { Button, Flex } from 'antd';
import Upload, { UploadProps } from './components/Upload';

const props: UploadProps = {
  name: 'file',
  action: 'https://www.baidu.com',
  headers: {},
  drag: true,
  beforeUpload(file) {
    console.log('beforeUpload', file);
    return true;
  },
  onSuccess(ret) {
    console.log('onSuccess', ret);
  },
  onError(err) {
    console.log('onError', err);
  },
  onProgress(percentage, file) {
    console.log('onProgress', percentage);
  },
  onChange(file) {
    console.log('onChange', file);
  },
};

function App() {
  return (
    <Upload {...props}>
      <Button>Test Upload</Button>
    </Upload>
  );
}

export default App;
