// chat gpt api
export type ChatGptRequestType = 'data-structure' | 'algorithm';

// data-structure
export type DataStructureName = string;
export type ProgrammingLanguage = string;
export type DataStructureDetails = {
  Code: string;
  Complexity: {
    [key: string]: string;
  };
  Description: string;
};
export type DataStructureDetailsState = 'empty' | 'reported' | 'ok';

// algorithm
export type AlgorithmDetails = {
  Code: string;
  Complexity: {
    [key: string]: string;
  };
  Description: string;
};
