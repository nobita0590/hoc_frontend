import { Page, Model } from './app.type';
export class Document extends Model {
  Title: string;
  PrettyUrl: string;
  Description: string;
  Content: string;
  CreatorId: number;
  CategoryId: number;
}

export class DocumentFilter extends Page {
  ID:  number;
}
