import type { Project } from "../../src/types/Project";

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

// Define the main providers, other will be grouped under "其他"
const mainProviders = [
  "數位發展部",
  "行政院公共數位創新空間（PDIS）",
  "臺北市政府資訊局",
];

// Normalize the unit name like the following:
// "數位發展部" => "數位發展部"
// "數位發展部 資訊處" => "數位發展部"
// "數位發展部 數位政府司" => "數位發展部"
function normalizeUnit(unit: string): string {
  if (unit.startsWith("數位發展部")) {
    return "數位發展部";
  }
  return unit;
}

export function customizeProjects(projects: Project[]) {
  const modifiedProjects: Project[] = [];

  for (const project of projects) {
    const newProject: Project = { ...project };

    const { mainCopyrightOwner } = project.legal;

    if (!mainCopyrightOwner) continue;

    // customize filter repoOwners
    const normalizeOwner = normalizeUnit(mainCopyrightOwner)
    if (mainProviders.includes(normalizeOwner)) {
      newProject.filterTags.repoOwners = [normalizeOwner];
    } else {
      newProject.filterTags.repoOwners = ["其他"];
    }

    // customize provider logo
    newProject.tw = {
      ...newProject.tw,
      mainCopyrightOwnerLogo: mainCopyrightOwnerLogos[normalizeOwner],
    };
    modifiedProjects.push(newProject);
  }

  return modifiedProjects;
}
