import { loadYamlFile } from "./loadYamlFile";
import { Dependency } from "../../src/types/Project";

// Function to collect unique values from specified keys in an array of YAML file paths
export function collectUniqueValues(filePaths: string[]): {
  platforms: string[];
  categories: string[];
  mainCopyrightOwners: string[];
  repoOwners: string[];
  features: string[];
  techStacks: string[];
} {
  const platformsSet = new Set<string>();
  const categoriesSet = new Set<string>();
  const mainCopyrightOwnerSet = new Set<string>();
  const repoOwnersSet = new Set<string>();
  const featuresSet = new Set<string>();
  const techStacksSet = new Set<string>();

  filePaths.forEach((filePath) => {
    try {
      const data = loadYamlFile(filePath);

      // Collect platforms
      if (data && Array.isArray(data.platforms)) {
        data.platforms.forEach((platform: string) =>
          platformsSet.add(platform),
        );
      }

      // Collect categories
      if (data && Array.isArray(data.categories)) {
        data.categories.forEach((category: string) =>
          categoriesSet.add(category),
        );
      }

      // Collect legal.mainCopyrightOwner
      if (
        data?.legal?.mainCopyrightOwner &&
        typeof data.legal.mainCopyrightOwner === "string"
      ) {
        mainCopyrightOwnerSet.add(data.legal.mainCopyrightOwner);
      }

      // Collect legal.repoOwner
      if (data?.legal?.repoOwner && typeof data.legal.repoOwner === "string") {
        const firstPart = data.legal.repoOwner.split(" ")[0];
        repoOwnersSet.add(firstPart);
      }

      // Collect description."zh-Hant".features
      if (
        data?.description?.["zh-Hant"]?.features &&
        Array.isArray(data.description["zh-Hant"].features)
      ) {
        data.description["zh-Hant"].features.forEach((feature: string) =>
          featuresSet.add(feature),
        );
      }

      // Collect dependsOn.open.name (system dependencies)
      if (data?.dependsOn?.open) {
        data.dependsOn.open.forEach((tech: Dependency) =>
          techStacksSet.add(tech.name),
        );
      }

      // Collect tw.techStacks (detail dependencies)
      if (data?.tw?.techStacks) {
        data.tw.techStacks.forEach((tech: Dependency) =>
          techStacksSet.add(tech.name),
        );
      }
    } catch (e) {
      console.error(
        `Failed to load or parse YAML file: ${filePath}, Error: ${e}`,
      );
    }
  });

  // Convert the Sets to arrays to return the unique values
  return {
    platforms: Array.from(platformsSet),
    categories: Array.from(categoriesSet),
    mainCopyrightOwners: Array.from(mainCopyrightOwnerSet),
    repoOwners: Array.from(repoOwnersSet),
    features: Array.from(featuresSet),
    techStacks: Array.from(techStacksSet),
  };
}