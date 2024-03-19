import { component$, Slot } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
import Link from "~/components/link";

export default component$<LinkProps>((props) => {
  return (
    <Link
      class={[
        "flex items-center justify-center gap-3 rounded-md border border-primary bg-white px-3.5 py-2.5 text-base font-semibold text-primary shadow-sm",
        "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
        props.class,
      ]}
      rel="noopener"
      href={props.href}
    >
      <Slot name="icon-left" />
      <div>
        <Slot />
      </div>
      <Slot name="icon-right" />
    </Link>
  );
});
