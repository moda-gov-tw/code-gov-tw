export type Dependency = {
  name: string;
  version?: string;
};

type Contact = {
  name: string;
  email?: string;
  phone?: string;
  affiliation?: string;
};

type Contractor = {
  name: string;
  until: string;
  email?: string;
  website?: string;
};

type OpenAPI = {
  name: string;
  description: string;
  url: string;
};

export type Project = {
  id: number;
  name: string;
  url?: string;
  releaseDate: string;
  landingURL?: string;
  developmentStatus: string;
  softwareType: string;
  description: {
    "zh-Hant": {
      localisedName: string;
      shortDescription: string;
      longDescription?: string;
      features: string[];
      screenshots?: string[];
    };
  };
  dependsOn?: {
    open?: Dependency[];
    close?: Dependency[];
  };
  maintenance: {
    type: string;
    contractors?: Contractor[];
    contacts: Contact[];
  };
  legal: {
    license: string;
    repoOwner: string;
  };
  filterTags: {
    features: string[];
    techStacks: string[];
    repoOwners: string[];
  };
  usedBy: string[];
  tw: {
    countryExtensionVersion: string;
    techStacks?: Dependency[];
    vulnerability?: string[];
    // Workaround for the missing field
    createdDate: string;
    openapi?: OpenAPI[];
  };
};
