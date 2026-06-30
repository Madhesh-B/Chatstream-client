import { useDispatch } from "react-redux";
import { toggleLoading } from "../features/loadingSlice";

export const useSetLoading = () => {
  const dispatch = useDispatch();
  return (status) => {
    dispatch(toggleLoading(status));
  };
};