import { Slot, component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";

type NavLinkProps = LinkProps & { isActive?: boolean };

export default component$(({ isActive, ...props }: NavLinkProps) => {
  return (
    <Link {...props} class={[props.class ?? "", isActive ? "text-xl" : ""]}>
      <Slot />
    </Link>
  );
});
