import { loadYamlFile } from "./loadYamlFile";
import type { Project } from "~/types/Project";

export function collectProjects(filePaths: string[]): Project[] {
  const projects: Project[] = [];

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