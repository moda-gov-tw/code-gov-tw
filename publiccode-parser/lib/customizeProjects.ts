import type { Project } from "../../src/types/Project";
import { normalizeUnit } from "./normalizeUnit";

// Define the logos for the main copyright owners
const mainCopyrightOwnerLogos: Record<string, string> = {
  "數位發展部": "/images/logos/MODA-logo.svg",
  "英國政府數位服務團 Government Digital Service": "/images/logos/gov-uk-logo.webp",
  "Foundation for Public Code": "/images/logos/foundation-for-public-code-logo.webp",
  "Yivi": "/images/logos/yivi-logo.webp",
  "臺北市政府資訊局": "/images/logos/department-of-informations-technology-taipei-city-government-logo.webp",
  "行政院公共數位創新空間（PDIS）": "/images/logos/PDIS-logo.webp",
  "Element": "/images/logos/matrix-element-logo.webp",
};

export function customizeProjects(projects: Project[]) {
  const modifiedProjects: Project[] = [];

  for (const project of projects) {
    const newProject: Project = { ...project };

    const { mainCopyrightOwner } = project.legal;

    if (!mainCopyrightOwner) continue;

    const normalizeOwner = normalizeUnit(mainCopyrightOwner);
    // customize provider logo
    newProject.tw = {
      ...newProject.tw,
      mainCopyrightOwnerLogo: mainCopyrightOwnerLogos[normalizeOwner],
    };
    modifiedProjects.push(newProject);
  }

  return modifiedProjects;
}
