import { component$, Slot } from "@builder.io/qwik";

type SectionProps = {
  class?: string;
};

export default component$<SectionProps>((props) => {
  return (
    <section class={props.class}>
      <div
        class={
          "max-wrapper px-6 py-16 md:px-10 md:py-16 lg:px-10 lg:py-20 xl:px-[120px]"
        }
      >
        <Slot />
      </div>
    </section>
  );
});
