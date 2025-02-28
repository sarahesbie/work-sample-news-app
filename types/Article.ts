export interface Article {
  title: string;
  url: string;
  date: string;
  section: string;
}

export type GroupedArticles = { [section: string]: Article[] };
