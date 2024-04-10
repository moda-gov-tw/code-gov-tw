import { component$, useSignal } from "@builder.io/qwik";
import ChevronUpIcon from "~/media/icons/chevron-up-icon.svg?jsx";
import ChevronDownIcon from "~/media/icons/chevron-down-icon.svg?jsx";

type AccordionProps = {
  title: string;
  description: string;
};

export default component$<AccordionProps>(({ title, description }) => {
  const isOpen = useSignal(false);
  return (
    <div class="flex flex-col">
      <button
        class="flex items-center justify-between border-t border-gray-400 pt-8"
        onClick$={() => (isOpen.value = !isOpen.value)}
      >
        <div class="text-left text-lg font-medium">{title}</div>
        <div>
          {isOpen.value ? (
            <ChevronUpIcon class="h-6 w-6" />
          ) : (
            <ChevronDownIcon class="h-6 w-6" />
          )}
        </div>
      </button>
      {isOpen.value && (
        <p class="pr-12 pt-4 text-left" aria-hidden={isOpen.value}>
          {description}
        </p>
      )}
    </div>
  );
});
