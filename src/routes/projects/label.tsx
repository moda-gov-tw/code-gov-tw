import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="rounded-2xl border border-brand-secondary p-1 px-2">
      <div class="whitespace-nowrap text-[10px] font-normal text-brand-secondary">
        <Slot />
      </div>
    </div>
  );
});
