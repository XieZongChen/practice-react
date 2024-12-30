import React from 'react';
import { Icon, IconProps } from '.';

const loadedSet = new Set<string>();

export function createFromIconfont(scriptUrl: string) {
  if (
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    // 防止加载过的再次加载
    !loadedSet.has(scriptUrl)
  ) {
    // 在 document.body 上添加 <script> 标签引入传入地址
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);

    loadedSet.add(scriptUrl);
  }

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;

    return (
      <Icon {...rest} ref={ref}>
        {type ? (
          // 使用 use 引用
          <use xlinkHref={`#${type}`} />
        ) : null}
      </Icon>
    );
  });

  return Iconfont;
}
