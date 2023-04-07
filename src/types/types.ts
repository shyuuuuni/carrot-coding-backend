// chat gpt api
export type ChatGptRequestType = 'data-structure' | 'algorithm';

// algorithm
export type AlgorithmDetails = {
  Code: string;
  Complexity: {
    [key: string]: string;
  };
  Description: string;
};
