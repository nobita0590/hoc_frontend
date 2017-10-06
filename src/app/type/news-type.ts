import { Page, Model } from './app.type';
export class News extends Model {
  Title: string;
  PrettyUrl: string;
  Description: string;
  Content: string;
  CreatorId: number;
  CategoryId: number;
}

export class NewsFilter extends Page {
  ID:  number;
}
