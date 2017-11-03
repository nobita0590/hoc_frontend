import { Page, Model } from './app.type';
export class SelectSource extends Model {
  ID: number;
  Value: string;
  ConvertedValue: string;
  GroupId: number;
  IsSystem: number;
  Order: number;
  RelateId: number;
}

export class SelectSourceFilter extends Page {
  ID:  number;
  GroupsId: number[];
}
