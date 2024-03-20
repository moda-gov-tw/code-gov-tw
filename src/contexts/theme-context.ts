import { type Signal } from "@builder.io/qwik";
import { useContext, createContextId } from "@builder.io/qwik";

export enum Theme {
  light = "light",
  dark = "dark",
}

export const ThemeContext = createContextId<Signal<Theme>>("theme-context");

export const UserThemeContext =
  createContextId<Signal<Theme | null>>("user.theme-context");

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  const userTheme = useContext(UserThemeContext);
  return userTheme.value || theme.value;
};
