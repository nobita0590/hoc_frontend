import { Page, Model } from './app.type';
export class News extends Model {
  Title: string;
  PrettyUrl: string;
  ImageUrl: string;
  Description: string;
  Content: string;
  CreatorId: number;
  CategoryId: number;
}

export class NewsFilter extends Page {
  ID:  number;
  static getCategories() {
    return [
      {id: 1, name: 'Khóa học online'},
      {id: 2, name: 'Khóa học offline'},
      {id: 3, name: 'Thông tin tuyển sinh'},
      {id: 4, name: 'Bí quyết học thi'}
    ];
  }
}
