import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/uiSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  return {
    theme,
    toggle: () => dispatch(toggleTheme()),
  };
};
