import { Page } from './app.type';
export class FagComments  {
  ID: number;
  FagId: number;
  UserId: number;
  Content: string;
  IsTrusted: boolean;
  CurrentUser: number;
  Upvote: number;
  Downvote: number;
  VoteInfo:	string;
  UserName: string;
  AvatarUrl: string;
  CreatedAt: string;
  Editting: boolean;
}

export class FagCommentsFilter extends Page {
  ID: number;
  FagId: number;
  IsTrusted: boolean;
}
