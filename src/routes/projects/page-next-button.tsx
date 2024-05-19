import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import ArrowRightIcon from "~/media/icons/arrow-right-icon.svg?jsx";

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
      disabled={props.disabled}
    >
      <div class="relative flex gap-3">
        <div class="text-sm font-medium">{$localize`下一頁`}</div>
        <ArrowRightIcon
          class={["w-5", loading.value ? "opacity-0" : "opacity-100"]}
        />
        <div
          class={[
            "loading-icon absolute right-0 animate-spin",
            loading.value ? "block" : "hidden",
          ]}
        />
      </div>
    </button>
  );
});
