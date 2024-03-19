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

  // Collect description."zh-Hant".features
  if (Array.isArray(data.description["zh-Hant"].features)) {
    data.description["zh-Hant"].features.forEach((feature: string) =>
      featuresSet.add(feature),
    );
  }

  // Collect tw.techStack
  if (Array.isArray(data.tw.techStacks)) {
    data.tw.techStacks.forEach((techStack: Dependency) =>
      techStacksSet.add(techStack.name),
    );
  }

  // Collect dependsOn.open.name
  if (data.dependsOn?.open) {
    data.dependsOn.open.forEach(({ name }: { name: string }) =>
      techStacksSet.add(name),
    );
  }

  return {
    features: Array.from(featuresSet),
    techStack: Array.from(techStacksSet),
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

  filePaths.forEach((filePath) => {
    try {
      const data = loadYamlFile(filePath);
      projects.push(data);
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
  repoOwners: string[];
  features: string[];
  techStacks: string[];
} {
  const platformsSet = new Set<string>();
  const categoriesSet = new Set<string>();
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

      // Collect legal.repoOwner
      if (data?.legal?.repoOwner && typeof data.legal.repoOwner === "string") {
        repoOwnersSet.add(data.legal.repoOwner);
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

      // Collect dependsOn.open.name
      if (data?.dependsOn?.open) {
        data.dependsOn.open.forEach(({ name }: { name: string }) =>
          techStacksSet.add(name),
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
console.log("Collected filterValues values:", filterValues);

const finalFilters = {
  platforms: [...filterValues.platforms],
  categories: [...filterValues.categories],
  repoOwners: [
    ...filterValues.repoOwners,
    "臺北市",
    "新北市",
    "桃園市",
    "臺中市",
    "臺南市",
    "高雄市",
    "英國 gov.uk",
  ],
  features: [
    "表單填寫/資料上傳",
    "個案管理",
    "地圖資訊呈現",
    "資料檢索",
    ...filterValues.features,
    "其他",
  ],
  techStacks: [...filterValues.techStacks],
};

const outputFiltersFile = join(baseDir, "./outputs/filters.json");
const projects = collectProjects(yamlFiles);
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
