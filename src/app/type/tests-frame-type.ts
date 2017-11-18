import { Page, Model } from './app.type';

export class TestsFrame extends Model {
  Title: string;
  DifficulConfig: DifficulConfig[];
  Description: string;
  Total: number;
  Time: number;
  CreatorId: number;
}

export class DifficulConfig {
  DifficulId: number;
  Percent: number;
}

export class TestsFrameFilter extends Page {
  ID:  number;
}
