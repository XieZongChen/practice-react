import InternalForm from './Form';
import Item from './Item';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Item: typeof Item;
}

const Form = InternalForm as FormInterface;

// 将 Item 挂到 Form 下方便使用
Form.Item = Item;

export default Form;
