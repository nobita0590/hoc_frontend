import { Page, Model } from './app.type';

export class TestsFrame extends Model {
  Title: string;
  DifficulConfig: DifficulConfig[];
  Description: string;
  Total: number;
  Time: number;
  CreatorId: number;
  CreatorName: string;
  SubjectId: number;
  ClassesId: number;
  TypeId: number;
  TypeName: string;
  SubjectName: string;
  ClassesName: string;
}

export class DifficulConfig {
  DifficulId: number;
  Percent: number;
}

export class TestsFrameFilter extends Page {
  ID:  number;
}
