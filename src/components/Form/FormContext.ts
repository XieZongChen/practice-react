import { createContext } from 'react';

export interface FormContextProps {
    values?: Record<string, any>;
    setValues?: (values: Record<string, any>) => void; // 修改 value
    onValueChange?: (key: string, value: any) => void; // 监听 value 变化
    validateRegister?: (name: string, cb: () => void) => void; // 注册表单项的校验规则，也就是 rules 指定的那些
}

export default createContext<FormContextProps>({})
