import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import ArrowLeftIcon from "~/media/icons/arrow-left-icon.svg?jsx";

type PageNavProps = {
  disabled: boolean;
  onClick$: QRL<() => void>;
};

export default component$<PageNavProps>((props) => {
  const loading = useSignal(false);

  const handlePageChange = $(async () => {
    loading.value = true;
    await props.onClick$();
    loading.value = false;
  });

  return (
    <button
      class={[props.disabled ? "pointer-events-none opacity-0" : ""]}
      onClick$={handlePageChange}
    >
      <div class="relative flex gap-3">
        <ArrowLeftIcon class="w-5" />
        <div class="text-sm font-medium">{$localize`上一頁`}</div>
        <div
          class={[
            "loading-icon absolute animate-spin",
            loading.value ? "block" : "hidden",
          ]}
        />
      </div>
    </button>
  );
});
