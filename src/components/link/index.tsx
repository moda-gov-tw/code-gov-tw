import { Slot, component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import useLocaleLink from "./useLocaleLink";

export default component$((props: LinkProps) => {
  const base = useLocaleLink();
  const href = `${base}${props.href}`;

  return (
    <Link {...props} href={href}>
      <Slot />
    </Link>
  );
});
