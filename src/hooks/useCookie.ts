import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

/**
 * 操作 cookie
 * @param cookieName cookie 存储名称
 * @returns 
 */
const useCookie = (
    cookieName: string
): [string | null, (newValue: string, options?: Cookies.CookieAttributes) => void, () => void] => {
    const [value, setValue] = useState<string | null>(() => Cookies.get(cookieName) || null);

    // 自定义 hook 里返回的函数都要用 useCallback 包裹下，这样调用者就不用自己处理了
    const updateCookie = useCallback(
        (newValue: string, options?: Cookies.CookieAttributes) => {
            Cookies.set(cookieName, newValue, options);
            setValue(newValue);
        },
        [cookieName]
    );

    const deleteCookie = useCallback(() => {
        Cookies.remove(cookieName);
        setValue(null);
    }, [cookieName]);

    return [value, updateCookie, deleteCookie];
};

export default useCookie;
