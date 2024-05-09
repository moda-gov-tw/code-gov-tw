import { readFileSync, readdirSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { extractFilterTags } from "./extractFilterTags";

// Function to load and parse a YAML file
export function loadYamlFile(filePath: string): any {
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