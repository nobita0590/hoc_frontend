import { Page, Model } from './app.type';
export class News extends Model {
  Title: string;
  PrettyUrl: string;
  ImageUrl: string;
  Description: string;
  Content: string;
  CreatorId: number;
  CategoryId: number;
  Views: number;
}

export class NewsFilter extends Page {
  ID:  number;
  Relate: number;
  CategoriesId: number[];
  IgnoreIds: number[];
  From: number;
  To: number;
  static getCategories() {
    return [
      {id: 1, name: 'Thông tin tuyển sinh'},
      {id: 2, name: 'Bí quyết học thi'}
      /*{id: 3, name: 'Khóa học online'},
      {id: 4, name: 'Khóa học offline'},*/
    ];
  }
}
