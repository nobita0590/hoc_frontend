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
  AnswerView: Answer[];
}

export class Answer {
  No = 0;
  IsTrue = false;
  Content = '';
}

export class QuestionFilter extends Page {
  ID:  number;
  IsFill: boolean;
}
