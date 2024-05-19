import { component$, useSignal, $, type QRL } from "@builder.io/qwik";

type Props = {
  key: string;
  option: string;
  filterName: string;
  onChange$: QRL<(index: number, state: boolean) => void>;
  checked: boolean;
  index: number;
};

export default component$<Props>((props) => {
  const loading = useSignal(false);

  const handleFilterChange = $(async (e: Event) => {
    const target = e.target as HTMLInputElement; // Cast the event target to HTMLInputElement
    loading.value = true;
    await props.onChange$(props.index, target.checked);
    loading.value = false;
  });

  return (
    <div key={props.key} class="relative flex items-center gap-4">
      <input
        id={props.option}
        class={[
          "h-4 w-4 cursor-pointer accent-brand-primary",
          props.filterName,
        ]}
        type="checkbox"
        value={props.option}
        onChange$={handleFilterChange}
        checked={props.checked}
      />
      <label for={props.option} class="cursor-pointer">
        {props.option}
      </label>
      <div
        class={[
          "loading-icon absolute -left-0.5 animate-spin",
          loading.value ? "block" : "hidden",
        ]}
      />
    </div>
  );
});
