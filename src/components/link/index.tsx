import { Slot, component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import { Link, useLocation, type LinkProps } from "@builder.io/qwik-city";
import useLocaleLink from "./useLocaleLink";

export default component$((props: LinkProps) => {
  const base = useLocaleLink();
  const href = `${base}${props.href}`;

  const state = useSignal(false);
  const location = useLocation();

  // Reset the state when navigation is done.
  useTask$(({ track }) => {
    track(() => location.isNavigating);
    if (!location.isNavigating) {
      state.value = false;
    }
  });

  // Set the state to true when the link is clicked.
  const onClick = $(() => {
    state.value = true;
  });

  return (
    <Link
      {...props}
      href={href}
      class={["relative", props.class ?? ""]}
      onClick$={onClick}
    >
      <Slot />
      <span
        class={[
          "animate-expand absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transform bg-primary",
          location.isNavigating && state.value ? "absolute" : "hidden",
        ]}
      ></span>
    </Link>
  );
});
