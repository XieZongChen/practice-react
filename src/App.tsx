import React, { useRef } from 'react';
import { Button, Flex } from 'antd';
import Upload, { UploadProps } from './components/Upload';

const props: UploadProps = {
  name: 'file',
  action: 'https://test.com',
  headers: {},
  // onChange(info) {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
};

function App() {
  return (
    <Upload {...props}>
      <Button>Test Upload</Button>
    </Upload>
  );
}

export default App;
