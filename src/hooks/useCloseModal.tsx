import { useEffect } from "react";

type RefType = React.MutableRefObject<HTMLDivElement | null>;
type CallbackType = () => void;

const useCloseModal = (ref: RefType, callback: CallbackType): void => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
};

export default useCloseModal;
