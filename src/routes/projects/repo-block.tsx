import { component$ } from "@builder.io/qwik";
import ArrowRightIcon from "~/media/icons/arrow-right-icon.svg?jsx";
import LabelButton from "./label";
import Link from "~/components/link";

export const RepoBlock = component$(
  ({
    name,
    repoOwner,
    shortDescription,
    features = [],
    dependsOn = [],
    techStacks = [],
    id,
  }: {
    name: string;
    repoOwner: string;
    shortDescription: string;
    features?: string[];
    dependsOn?: { name: string }[];
    techStacks?: { name: string }[];
    id: number;
  }) => {
    return (
      <div class="flex flex-col rounded-[6px] border border-gray-400 bg-white lg:flex-row">
        <div class="flex flex-1 flex-col gap-7 p-6">
          <div class="flex flex-col gap-7 lg:flex-row lg:justify-between">
            <div class="text-xl font-medium">{name}</div>
            <div class="text-lg font-medium">
              {$localize`提供單位：`}
              {repoOwner}
            </div>
          </div>
          <div class="leading-7">{shortDescription}</div>
          <hr class="border-gray-500" />
          <div class="flex flex-col gap-7 lg:grid lg:grid-cols-2">
            <div class="flex flex-col gap-4">
              <div>{$localize`功能類型`}</div>
              <div class="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <LabelButton key={feature}>{feature}</LabelButton>
                ))}
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <div>{$localize`使用技術`}</div>
              <div class="flex flex-wrap gap-2">
                {dependsOn.map((depend: { name: string }) => (
                  <LabelButton key={depend.name}>{depend.name}</LabelButton>
                ))}
                {techStacks.map((tech: { name: string }) => (
                  <LabelButton key={tech.name}>{tech.name}</LabelButton>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Link class="flex-shrink-0 lg:h-full lg:min-w-40" href={`${id}`}>
          <div
            class={[
              "flex h-20 w-full justify-center rounded-b-[5px] bg-gray-500 lg:h-full lg:rounded-b-none lg:rounded-e-[5px]",
              "transition-colors duration-[50ms] ease-out hover:bg-gray-600",
            ]}
          >
            <div class="flex items-center justify-center gap-2">
              <div class="font-normal text-white">{$localize`更多細節`}</div>
              <div class="text-white">
                <ArrowRightIcon class="h-6 w-6" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  },
);
