import { readdirSync } from "fs";
import { join } from "path";

// Function to get YAML files in a directory
export function getYamlFiles(directoryPath: string): string[] {
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