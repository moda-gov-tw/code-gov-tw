import { component$ } from "@builder.io/qwik";
import Button from "~/components/button";
import ArrowTopRightOnSquare from "~/media/icons/arrow-top-right-on-square.svg?jsx";

type OpenAPIProps = {
  name: string;
  description: string;
  url: string;
};

export default component$<OpenAPIProps>((props) => {
  return (
    <div class="mt-8">
      <div class="flex flex-col items-start gap-4 rounded-md border border-gray-500 bg-white p-6">
        <h4>{props.name}</h4>
        <div>{props.description}</div>
        <Button href={props.url}>
          {$localize`詳細資訊`}
          <ArrowTopRightOnSquare
            q:slot="icon-right"
            class="w-5 text-brand-primary"
          />
        </Button>
      </div>
    </div>
  );
});
