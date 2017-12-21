import { Component, OnInit } from '@angular/core';
import { Fags,  FagsFilter,
  SelectSource, SelectSourceFilter,
  FagComments, FagCommentsFilter } from '../../../app/type';
import { SelectSourceTransport, FagsTransport, FagCommentsTransport } from '../../../app/transport';
import { Helper, ChannelService } from '../../service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var CKEDITOR: any;

@Component({
  selector: 'app-fags-detail',
  templateUrl: './detail.component.html',
  providers: [SelectSourceTransport, FagsTransport, FagCommentsTransport],
  styles: [`
    .block-wegit li a.active { background: #00cc52;}
    .list-class li a.active { background: #b6dd80;}
    .faq-detail .pr-3 a.action:hover {color: #090}
    .faq-detail .pr-3 a.active {color: #090}
  `]
})
export class DetailComponent implements OnInit {
  user = Helper.getUserInfo();
  isLoading = false;
  classSource: SelectSource[] = [];
  subjectSource: SelectSource[] = [];
  filter = new FagsFilter();
  comments: FagComments[] = [];
  query = {};
  fags = new Fags();
  answer = '';
  ckConfig = Helper.getCkPublicConfig();
  constructor(private selectSourceTransport: SelectSourceTransport,
              private fagCommentsTransport: FagCommentsTransport,
              private fagsTransport: FagsTransport,
              private router: Router,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private channelService: ChannelService) {
    this.filter.Count = true;
    this.filter.Rows = 5;
    this.filter.Page = 1;
    this.filter.Total = 10;
    this.filter.Count = true;
    this.title.setTitle('Hỏi đáp');
  }
  checkLogin() {
    if (!this.user) {
      this.channelService.loginCalling(true);
      return false;
    }
    return true;
  }
  ngOnInit(): void {
    const ssFilter = {GroupsId: [1, 2]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[1]) {
          this.classSource = groups[1];
        }
        if (groups[2]) {
          this.subjectSource = groups[2];
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'] as number;
      if (!(id > 0)) {
        this.router.navigate(['/hoi-dap']);
      }
      this.fagsTransport.getA({ID: id} as FagsFilter)
        .then(_d => {
          this.fags = _d;
        })
        .catch(err => {
          this.router.navigate(['/hoi-dap']);
        });
      this.fagCommentsTransport.getList({
        FagId: id
      } as FagCommentsFilter)
        .then(_d => {
          this.comments = _d.models || [];
        });
    });
  }
  sendAnswer() {
    if (!this.checkLogin()) {
      return;
    }
    if (this.isLoading) {
      return;
    }
    const ck = CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]];
    const comment = new FagComments();
    comment.Content = ck.getData().trim();
    comment.FagId = this.fags.ID;
    ck.setData('');
    if (!comment.Content) {
      return;
    }
    this.isLoading = true;
    this.fagCommentsTransport.insert(comment)
      .then(_d => {
        this.isLoading = false;
        _d.UserName = this.user.FirstName + ' ' + this.user.LastName;
        _d.AvatarUrl = this.user.AvatarUrl;
        this.comments.push(_d);
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  }
  editAnswer(comment: FagComments) {
    if (!this.checkLogin()) {
      return;
    }
    setTimeout(() => {
      this.isLoading = true;
      this.fagCommentsTransport.update(comment)
        .then(_d => {
          this.isLoading = false;
          comment.Editting = false;
        })
        .catch(err => {
          this.isLoading = false;
          comment.Editting = false;
        });
    }, 50);
  }
  userAvatar(origin) {
    return Helper.userAvatar(origin);
  }
  viewTime(t: string) {
    return Helper.viewDate(new Date(t));
  }
  canAnswer() {
    if (!this.user) {
      return true;
    }
    if (this.user.ID == this.fags.UserId) {
      return false;
    }
    for (const comment of this.comments) {
      if (comment.UserId == this.user.ID){
        return false;
      }
    }
    return true;
  }
  vote(comment: FagComments, up: boolean, index: number) {
    if (!this.checkLogin()) {
      return;
    }
    if ((up && comment.CurrentUser == 1) || (!up && comment.CurrentUser == -1) || (this.user.ID == comment.UserId)) {
      return;
    }
    const commentFilter = new FagCommentsFilter();
    commentFilter.FagId = comment.FagId;
    commentFilter.ID = comment.ID;
    commentFilter.IsTrusted = up;
    this.fagCommentsTransport.vote(commentFilter)
      .then(_d => {
        comment.Upvote = _d.Upvote;
        comment.Downvote = _d.Downvote;
        comment.CurrentUser = _d.CurrentUser;
      })
      .catch(err => {
        console.log(err);
      });
  }
  trustComment(comment: FagComments) {
    if (!this.checkLogin()) {
      return;
    }
    const commentFilter = new FagCommentsFilter();
    commentFilter.FagId = comment.FagId;
    commentFilter.ID = comment.ID;
    commentFilter.IsTrusted = true;
    this.fagCommentsTransport.trust(commentFilter)
      .then(_d => {
        if (_d) {
          this.fags.IsDone = true;
          comment.IsTrusted = true;
        }else {
          this.fags.IsDone = false;
          comment.IsTrusted = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
