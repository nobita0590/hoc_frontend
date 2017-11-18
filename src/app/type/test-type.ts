import { Page, Model } from './app.type';
import { Question } from './questions-type';
export class Tests extends Model {
  Title: string = '';
  PrettyUrl: string = '';
  Description: string = '';
  Time: number = 0;
  CreatorId: number = 0;
  ClassId: number = 0;
  SubjectId: number = 0;
  QuestionsId: number[] = [];
  Questions: Question[] = [];
}

export class TestsFilter extends Page {
  ID:  number;
}
