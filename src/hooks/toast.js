import { useDispatch } from "react-redux"
import { setToast } from "../features/toastSlice";

export const useToaster = () => {
  const dispatch = useDispatch();
  return (message, type) => dispatch(setToast({ message, type }));
}