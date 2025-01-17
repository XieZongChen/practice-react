import React, {
  ReactNode,
  CSSProperties,
  useState,
  useContext,
  ReactElement,
  useEffect,
  ChangeEvent,
  FC,
} from 'react';
import classNames from 'classnames';
import Schema from 'async-validator';

import FormContext from './FormContext';

export interface ItemProps {
  className?: string;
  style?: CSSProperties;
  label?: ReactNode;
  name?: string;
  /**
   * 子节点值的属性
   * 默认为 value
   * 当表单项为 checkbox、switch 等时，应该传 checked
   */
  valuePropName?: string;
  rules?: Array<Record<string, any>>;
  /**
   * 这里重新申明 children 的类型，保证有值时一定是个 React 组件
   */
  children?: ReactElement;
}

/**
 * 根据表单项类型来获取 value 值
 */
const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
  const { target } = e;
  if (target.type === 'checkbox') {
    return target.checked;
  } else if (target.type === 'radio') {
    return target.value;
  }

  return target.value;
};

const Item: FC<ItemProps> = (props: ItemProps) => {
  const { className, label, children, style, name, valuePropName, rules } =
    props;

  const [value, setValue] = useState<string | number | boolean>();
  const [error, setError] = useState('');
  const { onValueChange, values, validateRegister } = useContext(FormContext);
  useEffect(() => {
    // 当 context 中本组件的数据发生变更时，同步更新本组件内部的 value
    if (name && value !== values?.[name]) {
      setValue(values?.[name]);
    }
  }, [name, value, values, values?.name]);

  const handleValidate = (value: any) => {
    let errorMsg = null;
    if (name && Array.isArray(rules) && rules.length) {
      const validator = new Schema({
        [name]: rules.map((rule) => {
          return {
            type: 'string',
            ...rule,
          };
        }),
      });

      validator.validate({ [name]: value }, (errors: any) => {
        if (errors) {
          if (errors?.length) {
            setError(errors[0].message!);
            errorMsg = errors[0].message;
          }
        } else {
          setError('');
          errorMsg = null;
        }
      });
    }

    return errorMsg;
  };

  useEffect(() => {
    if (name) {
      // context 注册 name 对应的 validator 函数
      validateRegister?.(name, () => handleValidate(value));
    }
  }, [value]);

  if (!name) {
    // 如果没 name 参数，说明是提交按钮等只需要样式的情况，直接返回 children
    return children;
  }

  const propsName: Record<string, any> = {};
  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }

  /**
   * 用 React.cloneElement 的形式为 children 传入 value、onChange 等参数
   */
  const childEle =
    React.Children.toArray(children).length > 1
      ? children
      : React.cloneElement(children!, {
          ...propsName,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            // onChange 回调里设置 value，并且修改 context 里的 values 的值
            const value = getValueFromEvent(e);
            setValue(value);
            onValueChange?.(name, value);

            handleValidate(value);
          },
        });

  const cls = classNames('ant-form-item', className);

  return (
    <div className={cls} style={style}>
      <div>{label && <label>{label}</label>}</div>
      <div>
        {childEle}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default Item;
