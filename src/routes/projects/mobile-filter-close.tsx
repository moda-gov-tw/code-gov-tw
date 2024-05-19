import { type QRL, component$, $, useSignal } from "@builder.io/qwik";

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
        "sticky top-0 z-10 items-center justify-between bg-white p-6",
        props.display ? "flex" : "hidden",
      ]}
    >
      <h3>{$localize`設定篩選條件`}</h3>
      <button
        class={[
          "flex cursor-pointer items-center justify-center gap-4 rounded-md border border-primary-700 bg-white px-3.5 py-2.5 text-base font-semibold text-primary-700 shadow-sm",
          "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
          "relative",
        ]}
        onClick$={handleButtonClick}
      >
        {$localize`完成`}
        <span
          class={[
            "loading-icon absolute",
            loading.value ? "block animate-spin" : "hidden",
          ]}
        ></span>
      </button>
    </div>
  );
});
