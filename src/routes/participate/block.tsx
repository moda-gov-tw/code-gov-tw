import { component$, Slot } from "@builder.io/qwik";

type BlockProps = {
  title: string;
};

export default component$<BlockProps>(({ title }) => {
  return (
    <div class="relative z-10 flex flex-col rounded-lg py-16 md:bg-gray-100 md:p-10">
      <div class="text-xl font-medium">{title}</div>
      <div class="mt-8 flex flex-col gap-4">
        <Slot />
      </div>
      {/* full-width backgroud color for mobile view */}
      <span class="absolute inset-0 -z-[1] -mx-6 h-full w-screen rounded-lg bg-gray-100 md:hidden"></span>
    </div>
  );
});
