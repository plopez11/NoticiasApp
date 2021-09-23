
export interface RespuestaTopHeadlines {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}

export interface RespuestaPais {
  status: string;
  totalResults: number;
  paisesCode: contriesCode[];
}

export interface contriesCode {
  name: string;
  alpha2Code: string;
}