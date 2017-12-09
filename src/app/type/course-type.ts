import { Page, Model } from './app.type';
export class Course extends Model {
  Title: string;
  PrettyUrl: string;
  BoughtNumber: number;
  ImageUrl: string;
  YoutubeUrl: string;
  TeacherId: number;
  TeacherName: string;
  Price: number;
  IsSaleOff: boolean;
  SaleOffPrice: number;
  SaleOffDescription: string;
  Tags: string;

  Description: string;
  Content: CourseChapter[];
  Benefit: string;
  Target: string;
  Interest: string;

  StartDate: Date;
  EndDate: Date;

  CreatorId: number;
  CreatorName: string;
}
export class CourseChapter {
  Title: string;
  Steps: CourseStep[];
}
export class CourseStep {
  Name: string;
}

export class CourseFilter extends Page {
  ID:  number;
}
