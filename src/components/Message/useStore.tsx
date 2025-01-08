import { useState } from 'react';
import { MessageProps, Position } from '.';

type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

const initialState = {
  top: [],
  bottom: [],
};

/**
 * 用于创建及操作 message 列表
 */
function useStore(defaultPosition: Position) {
  // 由于 message 可以选择在上方弹或者在下方弹，所以要分别维护两个列表
  const [messageList, setMessageList] = useState<MessageList>({
    ...initialState,
  });

  return {
    messageList,
    add: (messageProps: MessageProps) => {
      const id = getId(messageProps);
      setMessageList((preState) => {
        // 需要先看 props 是否有设置 id，有的话需要处理 id 冲突的情况
        if (messageProps?.id) {
          const position = getMessagePosition(preState, messageProps.id);
          // 如果有 position，说明当前 id 存在 message，所以不用添加新的，此处直接返回之间的列表
          if (position) return preState;
        }

        const position = messageProps.position || defaultPosition;
        const isTop = position.includes('top');
        const messages = isTop
          ? // top 列表中，新的数据插在队列前方
            [{ ...messageProps, id }, ...(preState[position] ?? [])]
          : // bottom 列表中，新的数据插在队列后方
            [...(preState[position] ?? []), { ...messageProps, id }];

        return {
          ...preState,
          [position]: messages,
        };
      });
      return id;
    },

    update: (id: number, messageProps: MessageProps) => {
      if (!id) return;

      setMessageList((preState) => {
        const nextState = { ...preState };
        const { position, index } = findMessage(nextState, id);

        if (position && index !== -1) {
          // 如果能找到 message，则更新 message
          nextState[position][index] = {
            ...nextState[position][index],
            ...messageProps,
          };
        }

        return nextState;
      });
    },

    remove: (id: number) => {
      setMessageList((prevState) => {
        const position = getMessagePosition(prevState, id);

        if (!position) return prevState;
        return {
          ...prevState,
          [position]: prevState[position].filter((notice) => notice.id !== id),
        };
      });
    },

    clearAll: () => {
      setMessageList({ ...initialState });
    },
  };
}

/**
 * 记录自增 id
 */
let count = 1;

/**
 * 生成一个新的 message id
 * @param messageProps 需要生成 id 的 message 的 props
 * @returns
 */
export function getId(messageProps: MessageProps) {
  if (messageProps.id) {
    // 如果此 message 的 props 有设置 id，则直接用这个 id
    return messageProps.id;
  }
  // 使用自增 id
  count += 1;
  return count;
}

/**
 * 获取所传列表中 message id 对应的 message 的 position，也可用来判断一个 id 是否存在 message
 * @param messageList 当前列表
 * @param id 所查 message id
 * @returns
 */
export function getMessagePosition(messageList: MessageList, id: number) {
  // 用 for of 遍历出所有 position 和 列表
  for (const [position, list] of Object.entries(messageList)) {
    if (list.find((item) => item.id === id)) {
      // 如果当前列表里有所查 id，则返回当前 position
      return position as Position;
    }
  }
}

/**
 * 在所传列表中找到 message id 对应的 message，并返回其 position 和 index
 * @param messageList 当前列表
 * @param id 所查 message id
 * @returns
 */
export function findMessage(messageList: MessageList, id: number) {
  // todo: 这里有性能优化空间，现在有重复查找
  // 先找在哪个 position 中
  const position = getMessagePosition(messageList, id);

  // 再根据 position 找到对应列表的 index
  const index = position
    ? messageList[position].findIndex((message) => message.id === id)
    : -1;

  return {
    position,
    index,
  };
}

export default useStore;
