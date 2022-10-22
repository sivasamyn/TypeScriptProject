import { useState, useEffect } from "react";

function useLocalStorage(key:any, firstValue:null = null):any {
  const initialValue:any = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState<string>(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      if (item == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

export default useLocalStorage;
