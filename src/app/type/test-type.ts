import { Page, Model } from './app.type';
import { Question } from './questions-type';
export class Tests extends Model {
  Title: string = '';
  TypeId: number = 0;
  PrettyUrl: string = '';
  Description: string = '';
  Time: number = 0;
  CreatorId: number = 0;
  ClassId: number = 0;
  SubjectId: number = 0;
  QuestionsId: number[] = [];
  Questions: Question[] = [];
  ClassName: string;
  SubjectName: string;
  TypeName: string;
  Minutes: number;
}

export class TestsFilter extends Page {
  ID:  number;
  uf: string;
  ClassId: number = 0;
  TypeId: number = 0;
  SubjectId: number = 0;
  From: Date;
  To: Date;
}

export class Exams {
  ID:  number;
  UserId: number;
  UserName: string;
  TestId: number;
  TestName: string;
  TypeId: number;
  Total: number;
  TrueNumber: number;
  Score: number;
  StartTime: Date;
  FinishTime: Date;
  TimeDoing: number;
  History: QuestionHistory[];
}

export class ExamsFilter extends Page {
  ID:  number;
  IDs: number[];
  TestIds: number[];
  TypeId: number;
  From: Date;
  To: Date;
}
export class QuestionHistory {
  True: any;
  Picked: number;
  QuestionId: number;
}
