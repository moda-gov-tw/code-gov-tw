import { Project, Dependency } from "../../src/types/Project";

export function extractFilterTags(data: Project) {
  const featuresSet = new Set<string>();
  const techStacksSet = new Set<string>();
  const repoOwnersSet = new Set<string>();
  const mainCopyrightOwnerSet = new Set<string>();

  // Collect description."zh-Hant".features
  if (Array.isArray(data.description["zh-Hant"].features)) {
    data.description["zh-Hant"].features.forEach((feature: string) =>
      featuresSet.add(feature),
    );
  }

  // Collect dependsOn.open.name (system dependencies)
  if (data.dependsOn?.open) {
    data.dependsOn.open.forEach((tech: Dependency) =>
      techStacksSet.add(tech.name),
    );
  }

  // Collect tw.techStacks (detail dependencies)
  if (Array.isArray(data.tw.techStacks)) {
    data.tw.techStacks.forEach((tech: Dependency) =>
      techStacksSet.add(tech.name),
    );
  }

  // Collect legal.repoOwner
  if (data.legal.repoOwner) {
    const firstPart = data.legal.repoOwner.split(" ")[0];
    repoOwnersSet.add(firstPart);
  }

  // Collect legal.mainCopyrightOwner
  if (data.legal.mainCopyrightOwner) {
    const firstPart = data.legal.mainCopyrightOwner.split(" ")[0];
    mainCopyrightOwnerSet.add(firstPart);
  }

  return {
    features: Array.from(featuresSet),
    techStacks: Array.from(techStacksSet),
    repoOwners: Array.from(repoOwnersSet),
    mainCopyrightOwners: Array.from(mainCopyrightOwnerSet),
  };
}