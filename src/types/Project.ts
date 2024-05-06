export type Dependency = {
  name: string;
  version?: string;
};

type Contact = {
  name: string;
  email?: string;
  phone?: string | null;
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

type Localisation = {
  localisationReady: boolean;
  availableLanguages: string[];
};

export type Project = {
  id: number;
  publiccodeYmlVersion: string;
  name: string;
  url: string;
  categories: string[];
  localisation: Localisation;
  platforms: string[];
  releaseDate: string;
  landingURL?: string;
  developmentStatus: string;
  softwareType: string;
  description: {
    [key: string]: {
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
    mainCopyrightOwner: string;
  };
  filterTags: {
    features: string[];
    techStacks: string[];
    mainCopyrightOwners: string[];
    repoOwners: string[];
  };
  usedBy?: string[];
  tw: {
    countryExtensionVersion: string;
    techStacks?: Dependency[];
    vulnerabilityScanners?: string[];
    accessibilityConformance?: string | null;
    overrides?: {
      repoOwners?: string[];
      mainCopyrightOwners?: string[];
    };
    mainCopyrightOwnerLogo?: string;
    // Workaround field for the missing data in this time
    createdDate?: string;
    // Workaround field for the missing data in this time
    openapi?: OpenAPI[];
  };
};
