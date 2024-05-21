import { writeFileSync } from "fs";
import { join } from "path";
import { collectProjects } from "./lib/collectProjects";
import { collectUniqueValues } from "./lib/collectUniqueValues";
import { getYamlFiles } from "./lib/getYamlFiles"; // Provide the correct file path for the module
import { customizeProjects } from "./lib/customizeProjects";
import { createIndex } from "./lib/createIndex";

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
const projects = collectProjects(yamlFiles);
const modifiedProjects = customizeProjects(projects);
const index = createIndex(modifiedProjects);

const outputFiltersFile = join(baseDir, "./outputs/filters.json");
const outputProjectsFile = join(baseDir, "./outputs/projects.json");
const outputIndexFile = join(baseDir, "./outputs/index.json");

try {
  writeFileSync(outputProjectsFile, JSON.stringify(modifiedProjects, null, 2));
  writeFileSync(outputFiltersFile, JSON.stringify(finalFilters, null, 2));
  writeFileSync(outputIndexFile, JSON.stringify(index, null, 2));
  console.log(
    `Successfully saved unique filter values to ${outputFiltersFile}`,
  );
  console.log(`Successfully saved projects to ${outputProjectsFile}`);
} catch (e) {
  console.error(`Failed to save unique values to JSON file: ${e}`);
}
