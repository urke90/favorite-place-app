import { useState, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// interface IAxiosHook {
//     error: string | null | undefined;
//     isLoading: boolean;
//     sendRequest: (
//         url: string,
//         method?: string,
//         dataToSend?: object
//     ) => Promise<any>;
// }

/**
 * TODO figure out what to to with TS.... use axios TS or my own
 */

const useAxios = () => {
    const [error, setError] = useState<null | string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendRequest = useCallback(
        async ({ url, method, data }: AxiosRequestConfig) => {
            setIsLoading(true);
            try {
                const result = await axios({
                    url,
                    method: method ? method : 'GET',
                    data: data ? data : null
                });
                setIsLoading(false);
                return result;
            } catch (err) {
                const error = err as AxiosError;
                setIsLoading(false);
                setError(
                    error.response?.data.message ||
                        'Something went wrong, please try later'
                );
            }
        },
        []
    );

    const clearErrorHandler = useCallback(() => setError(null), []);

    return { isLoading, error, sendRequest, clearErrorHandler };
};

export default useAxios;

/**
 * https://medium.com/fashioncloud/a-functional-programming-approach-to-error-handling-in-typescript-d9e8c58ab7f
 * https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
 * https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if
 * https://github.com/axios/axios#example
 * https://usehooks-ts.com/react-hook/use-fetch
 * https://www.npmjs.com/package/use-http
 */

//  interface IHttpState<T> {
//     isLoading: boolean;
//     error: null | string;
//     clearErrorHandler: () => void;
//     sendRequest: (
//         url: string,
//         method: Method,
//         data: T
//     ) => Promise<AxiosResponse<any, any> | undefined> | T;
// }

// const useHttp = <T>(): IHttpState<T> => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const sendRequest = useCallback(
//         async (url: string, method: Method, dataToSend: T) => {
//             try {
//                 setIsLoading(true);
//                 const response = await axios({
//                     url,
//                     method,
//                     data: dataToSend
//                 });

//                 return response.data;
//             } catch (err) {
//                 const error = err as AxiosError;
//                 setError(
//                     error?.response?.data.message ||
//                         'Something went wrong, please try again later!'
//                 );
//             }
//             setIsLoading(false);
//         },
//         []
//     );

//     const clearErrorHandler = () => setError(null);

//     return { isLoading, error, sendRequest, clearErrorHandler };
// };

// export default useHttp;
