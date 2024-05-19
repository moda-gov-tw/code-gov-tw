import { type QRL, component$, $, useSignal } from "@builder.io/qwik";
import FunnelIcon from "~/media/icons/funnel-icon.svg?jsx";

type Props = {
  display: boolean;
  onClick$: QRL<() => void>;
};

export default component$<Props>((props) => {
  const loading = useSignal(false);

  const handleButtonClick = $(async () => {
    loading.value = true;
    await props.onClick$();
    loading.value = false;
  });

  return (
    <div
      class={[
        "max-wrapper bg-gray-100 px-6 pt-16 md:hidden md:px-10 md:pt-16 lg:px-10 lg:pt-20 xl:px-[120px]",
        props.display ? "hidden" : "block",
      ]}
    >
      <div class="flex flex-col gap-6 md:flex-row md:gap-20 xl:min-h-[50vh]">
        <button
          class={[
            "flex cursor-pointer items-center justify-center gap-4 rounded-md border border-primary-700 bg-white px-3.5 py-2.5 text-base font-semibold text-primary-700 shadow-sm",
            "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
            "relative",
          ]}
          onClick$={[handleButtonClick]}
        >
          {$localize`設定篩選條件`}
          <FunnelIcon q:slot="icon-right" class="h-5 w-5 text-primary-700" />
          <span
            class={[
              "loading-icon absolute",
              loading.value ? "block animate-spin" : "hidden",
            ]}
          ></span>
        </button>
      </div>
    </div>
  );
});
