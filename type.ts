export type Book = {
  title: string;
  description: string;
  imageURL: string;
  owner: string;
};

export type GoogleBooksApiResponse = {
  totalItems: number;
  items: Item[];
};

export type Item = {
  volumeInfo: {
    authors: string[];
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    title: string;
    subtitle: string;
  };
};
