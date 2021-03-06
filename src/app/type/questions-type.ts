import { Page, Model } from './app.type';
export class Question extends Model {
  CategoryId: number;
  Content: string;
  TypeId: number;
  ClassId: number;
  DifficultId: number;
  SubjectId: number;
  CreatorId: number;
  Answer: string;
  FullAnswer: string;
  AnswerView: Answer[];
  Ticker;
}

export class Answer {
  No = 0;
  IsTrue = false;
  Content = '';
}

export class QuestionFilter extends Page {
  ID:  number;
  IsFill: boolean;
  ClassId = '';
  SubjectId = '';
  CategoryId = '';
  DifficultId = '';
}
