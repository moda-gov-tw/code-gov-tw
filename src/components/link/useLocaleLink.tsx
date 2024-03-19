import { useLocation } from "@builder.io/qwik-city";

export default function useLocaleLink() {
  const location = useLocation();
  const locale = location.params.locale;
  const baselink = locale ? `/${locale}` : "";

  return baselink;
}
