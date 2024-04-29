import { type QRL, component$ } from "@builder.io/qwik";
import QuestionMark from "~/media/icons/question-mark.svg?jsx";
import ExclamationCircle from "~/media/icons/exclamation-circle.svg?jsx";

type TextareaInputProps = {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: QRL<(element: HTMLTextAreaElement) => void>;
  onInput$: (event: Event, element: HTMLTextAreaElement) => void;
  onChange$: (event: Event, element: HTMLTextAreaElement) => void;
  onBlur$: (event: Event, element: HTMLTextAreaElement) => void;
  tooltips?: string;
};

export default component$<TextareaInputProps>(({ label, error, ...props }) => {
  const { id, name, required } = props;
  return (
    <div class="flex max-w-lg flex-col">
      <label class="flex items-center" for={name}>
        <div
          class={[
            "font-medium",
            required && "after:text-red-500 after:content-['*']",
          ]}
        >
          {label}
        </div>
        {props.tooltips && (
          <div class="group/tooltips relative inline-block">
            <QuestionMark />
            <tooltips class="invisible absolute bottom-4 left-4 min-w-40 bg-gray-600 px-2 py-1 text-white group-hover/tooltips:visible min-[375px]:min-w-40 md:min-w-52">
              {props.tooltips}
            </tooltips>
          </div>
        )}
      </label>
      <div class="relative">
        <textarea
          class={[
            "min-h-24 w-full rounded-md border border-[#DEE0E3] px-3 py-2",
            "focus:outline-none focus:ring focus:ring-[rgba(234,88,12,0.50)]",
            "invalid:border-[#EF4444] hover:border-gray-600",
          ]}
          {...props}
          id={id || name}
        />
        <div
          class={[
            "absolute right-4 top-1/2 -translate-y-1/2 transform",
            !error ? "hidden" : "visible",
          ]}
        >
          <ExclamationCircle />
        </div>
      </div>
      {error && (
        <small id={`${id || name}-error`} class="w-full text-end text-[#EF4444]">
          {error}
        </small>
      )}
    </div>
  );
});
