import { useEffect, useState} from "react";

const useDebounce = <T>(initialValue:T, delay:number) => {
    const [value, setValue] = useState<T>(initialValue);
    const [delayedValue, setDelayedValue] = useState<T>(initialValue);

    useEffect(() => {
       const timeoutId = setTimeout(() => {
           setDelayedValue(value);
       }, delay);

       return () => clearTimeout(timeoutId);
    }, [value]);

    return [delayedValue, setDelayedValue, value, setValue] as const;
};

export default useDebounce;