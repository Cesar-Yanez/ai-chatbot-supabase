export interface Document {
    pageContent: string;
    metadata: {
      source: string;
      page: number;
    };
  }