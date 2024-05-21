import { Project } from '../../src/types/Project';
import { normalizeUnit } from './normalizeUnit';

type Index = {
  features: Record<string, number[]>;
  repoOwners: Record<string, number[]>;
  techStacks: Record<string, number[]>;
};

// Define the main providers, other will be grouped under "其他"
const mainProviders = [
  "數位發展部",
  "行政院公共數位創新空間（PDIS）",
  "臺北市政府資訊局",
];

export function createIndex(projects : Project[]): Index {
  const index: Index = {
    features: {},
    repoOwners: {"其他": []},
    techStacks: {},
  };

  projects.forEach((project) => {
    Object.values(project.description).forEach((desc) => {
      desc.features.forEach((name) => {
        if (!index.features[name]) {
          index.features[name] = [];
        }
        index.features[name].push(project.id);
      });
    });

    const { mainCopyrightOwner } = project.legal;
    const normalizeOwner = normalizeUnit(mainCopyrightOwner)
  
    if (mainProviders.includes(normalizeOwner)) {
      if (!index.repoOwners[normalizeOwner]) {
        index.repoOwners[normalizeOwner] = [];
      }
      index.repoOwners[normalizeOwner].push(project.id)
    } else {
      index.repoOwners["其他"].push(project.id)
    }
  
    if (project.dependsOn) {
      [
        ...(project.dependsOn.open || []),
        ...(project.dependsOn.close || []),
      ].forEach((dep) => {
        if (!index.techStacks[dep.name]) {
          index.techStacks[dep.name] = [];
        }
        index.techStacks[dep.name].push(project.id);
      });
    }
  
    if (project.tw.techStacks) {
      project.tw.techStacks.forEach((techStack) => {
        if (!index.techStacks[techStack.name]) {
          index.techStacks[techStack.name] = [];
        }
        index.techStacks[techStack.name].push(project.id);
      });
    }
  });

  return index;
}