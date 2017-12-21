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
  Resitered: any;
  StudentsNumber: number;
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

export class CourseRegister {
  ID: number;
  CourseId: number;
  UserId: number;
  CreatedAt: Date;
  CourseName: string;
  UserName: string;
  UserPhone: string;
}

export class CourseRegisterFilter extends Page {
  ID: number;
  CourseId: number;
  UserId: number;
}
