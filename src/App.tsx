import { useRef } from 'react';
import { Button, Checkbox, Input } from 'antd';
import Form, { FormRefApi } from './components/Form';

function App() {
  const form = useRef<FormRefApi>(null);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        ref={form}
        initialValues={{ remember: true, username: 'test-init' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            { required: true, message: '请输入用户名!' },
            { max: 6, message: '长度不能大于 6' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item>
          <div>
            <Button type='primary' htmlType='submit'>
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
      <Button
        type='primary'
        onClick={() => {
          console.log(form.current?.getFieldsValue());
        }}
      >
        打印表单值
      </Button>
    </>
  );
}

export default App;
