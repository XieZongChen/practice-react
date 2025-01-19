import React, {
  CSSProperties,
  useState,
  useRef,
  FormEvent,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import FormContext from './FormContext';

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: CSSProperties;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  children?: ReactNode;
}

export interface FormRefApi {
  getFieldsValue: () => Record<string, any>;
  setFieldsValue: (values: Record<string, any>) => void;
}

const Form = forwardRef<FormRefApi, FormProps>((props: FormProps, ref) => {
  const {
    className,
    style,
    children,
    onFinish,
    onFinishFailed,
    initialValues,
    ...others
  } = props;

  const [values, setValues] = useState<Record<string, any>>(
    initialValues || {}
  );

  /**
   * 使用 ref 仿照 antd 的 useForm hook 让用户可以操作 store
   * 实现 useForm 需要让 store 与组件分离
   * 用 ref 算是最小成本模拟核心功能
   */
  useImperativeHandle(
    ref,
    () => {
      return {
        getFieldsValue() {
          return values;
        },
        setFieldsValue(fieldValues) {
          setValues({ ...values, ...fieldValues });
        },
      };
    },
    []
  );

  /**
   * ref 的值保存在 current 属性上，修改它不会触发重新渲染
   * errors、validator 这种就是不需要触发重新渲染的数据，所以用 useRef
   */
  const validatorMap = useRef(new Map<string, () => void>());
  const errors = useRef<Record<string, any>>({});

  const onValueChange = (key: string, value: any) => {
    values[key] = value;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    for (const [key, callbackFunc] of validatorMap.current) {
      if (typeof callbackFunc === 'function') {
        errors.current[key] = callbackFunc();
      }
    }

    const errorList = Object.keys(errors.current)
      .map((key) => {
        return errors.current[key];
      })
      .filter(Boolean);

    if (errorList.length) {
      onFinishFailed?.(errors.current);
    } else {
      onFinish?.(values);
    }
  };

  const handleValidateRegister = (name: string, cb: () => void) => {
    validatorMap.current.set(name, cb);
  };

  const cls = classNames('ant-form', className);

  return (
    <FormContext.Provider
      value={{
        onValueChange,
        values,
        setValues: (v) => setValues(v),
        validateRegister: handleValidateRegister,
      }}
    >
      <form {...others} className={cls} style={style} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
});

export default Form;
