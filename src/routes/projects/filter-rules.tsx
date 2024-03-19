import type { Project } from "~/types/Project";

export function filterProjectsByFeatures(
  project: Project,
  features: string[],
): boolean {
  return (
    features.length === 0 ||
    features.some((feature) => project.filterTags.features.includes(feature))
  );
}

export function filterProjectsByRepoOwners(
  project: Project,
  repoOwners: string[],
): boolean {
  return (
    repoOwners.length === 0 || repoOwners.includes(project.legal.repoOwner)
  );
}

export function filterProjectsByTechStacks(
  project: Project,
  techStacks: string[],
): boolean {
  return (
    techStacks.length === 0 ||
    techStacks.some((techStack) =>
      project.filterTags.techStack.includes(techStack),
    )
  );
}
