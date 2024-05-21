import { $, component$, useSignal, type QRL } from "@builder.io/qwik";

type Props = {
  key: number;
  target: number;
  current: number;
  onClick$: QRL<(target: number) => void>;
};

export default component$<Props>((props) => {
  const loading = useSignal(false);

  const handleButtonClick = $(async () => {
    loading.value = true;
    await props.onClick$(props.target);
    loading.value = false;
  });

  return (
    <button
      key={props.key}
      class={[
        "group relative w-10 font-medium hover:text-brand-secondary",
        props.current === props.target
          ? "text-brand-secondary"
          : "text-gray-300",
        "transition-colors duration-[50ms] ease-out",
      ]}
      onClick$={handleButtonClick}
      disabled={props.target === props.current || props.target === -1}
    >
      {props.target === -1 ? "..." : props.target}
      <span
        class={[
          "absolute inset-x-0 -top-4 w-10 border-t-2 border-brand-secondary group-hover:border-brand-secondary",
          props.current === props.target
            ? "border-brand-secondary"
            : "border-transparent",
          "transition-colors duration-[50ms] ease-out",
        ]}
      ></span>
      <span
        class={[
          "loading-icon absolute left-2.5 top-0.5 animate-spin",
          loading.value ? "block" : "hidden",
        ]}
      />
    </button>
  );
});
