import { Page, Model } from './app.type';
export class Fags extends Model {
  Title: string;
  PrettyUrl: string;
  Content: string;
  CommentsNumber: number;
  SubjectId: number;
  ClassId: number;
  UserId: number;
  IsDone: boolean;
  SubjectName: string;
  ClassName: string;
  UserName: string;
  AvatarUrl: string;
}

export class FagsFilter extends Page {
  ID:  number;
  SubjectId: number;
  ClassId: number;
  Option: string;
  IsHot: boolean;
}
