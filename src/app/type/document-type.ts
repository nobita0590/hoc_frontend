import { Page, Model } from './app.type';
export class Document extends Model {
  Name: string;
  PathStore: string;
  Description: string;
  CreatorId: number;
  CreatorName: string;
  ClassId: number;
  ClassName: string;
  SubjectId: number;
  SubjectName: string;
  DownloadNumber: number;
}

export class DocumentFilter extends Page {
  ID:  number;
  IsFill: boolean;
}
