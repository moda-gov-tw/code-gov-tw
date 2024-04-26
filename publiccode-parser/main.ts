import { readFileSync, readdirSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { join } from "path";
import type { Project, Dependency } from "~/types/Project";

// Function to load and parse a YAML file
function loadYamlFile(filePath: string): any {
  try {
    // Read the file
    const fileContents = readFileSync(filePath, "utf8");
    // Parse the YAML content
    const data = parse(fileContents);
    const filterTags = extractFilterTags(data);
    return { ...data, filterTags };
  } catch (e) {
    console.error(`Failed to load or parse YAML file: ${e}`);
    return null;
  }
}

function extractFilterTags(data: Project) {
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

  // override repoOwners for filterTags
  if (data.tw.overrides) {
    if (data.tw.overrides.repoOwners) {
      repoOwnersSet.clear();
      data.tw.overrides.repoOwners.forEach((repoOwner: string) =>
        repoOwnersSet.add(repoOwner),
      );
    }
  }

  return {
    features: Array.from(featuresSet),
    techStacks: Array.from(techStacksSet),
    repoOwners: Array.from(repoOwnersSet),
    mainCopyrightOwners: Array.from(mainCopyrightOwnerSet),
  };
}

// Function to get YAML files in a directory
function getYamlFiles(directoryPath: string): string[] {
  try {
    const files = readdirSync(directoryPath);
    // Filter out files that end with .yaml or .yml
    const yamlFiles = files.filter(
      (file) => file.endsWith(".yaml") || file.endsWith(".yml"),
    );
    // Return the full path of the files
    return yamlFiles.map((file) => join(directoryPath, file));
  } catch (e) {
    console.error(`Failed to read directory: ${e}`);
    return [];
  }
}

function collectProjects(filePaths: string[]): object[] {
  const projects: object[] = [];

  filePaths.forEach((filePath, index) => {
    try {
      const data = loadYamlFile(filePath);
      projects.push({ id: index, ...data });
    } catch (e) {
      console.error(
        `Failed to load or parse YAML file: ${filePath}, Error: ${e}`,
      );
    }
  });

  return projects;
}

// Function to collect unique values from specified keys in an array of YAML file paths
function collectUniqueValues(filePaths: string[]): {
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

// get current directory
const baseDir = new URL(".", import.meta.url).pathname;

const directoryPath = join(baseDir, "./projects"); // Replace with your directory path
const yamlFiles = getYamlFiles(directoryPath);
const filterValues = collectUniqueValues(yamlFiles);

const finalFilters = {
  platforms: [...filterValues.platforms],
  categories: [...filterValues.categories],
  mainCopyrightOwners: [...filterValues.mainCopyrightOwners],
  repoOwners: [...filterValues.repoOwners, "其他"],
  features: [...filterValues.features],
  techStacks: [...filterValues.techStacks],
};
console.log("Collected finalFilters values:", finalFilters);
const projects = collectProjects(yamlFiles);

const outputFiltersFile = join(baseDir, "./outputs/filters.json");
const outputProjectsFile = join(baseDir, "./outputs/projects.json");

try {
  writeFileSync(outputProjectsFile, JSON.stringify(projects, null, 2));
  writeFileSync(outputFiltersFile, JSON.stringify(finalFilters, null, 2));
  console.log(
    `Successfully saved unique filter values to ${outputFiltersFile}`,
  );
  console.log(`Successfully saved projects to ${outputProjectsFile}`);
} catch (e) {
  console.error(`Failed to save unique values to JSON file: ${e}`);
}
