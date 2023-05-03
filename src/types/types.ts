// chat gpt api
export type ChatGptRequestType = 'data-structure' | 'algorithm';

export type ChatGptDomain = 'algorithm' | 'data-structure';
export type ChatGptType = 'description' | 'code';

// algorithm
export type AlgorithmDetails = {
  Code: string;
  Complexity: {
    [key: string]: string;
  };
  Description: string;
};
