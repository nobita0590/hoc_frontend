import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { News, NewsFilter } from './../../type/news-type';
import { ValidateHelper, FormErrorHelper } from './../../shared/validate.helper';
import { NewsTransport } from './../../transport/news.transport';
import { HelperTransport } from './../../transport/helper.transport';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import { FlashAlert } from './../../shared/flash.alert';
declare var CKEDITOR: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [NewsTransport]
})

export class CreateComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  uploadUrl = HelperTransport.api('upload');
  oldImgs: string[] = [];

  mainForm: FormGroup;
  title = 'Đăng tin';
  news: News = new News();
  sub: any;
  filter: NewsFilter = new NewsFilter();
  categories = NewsFilter.getCategories();
  isEdit = false;

  constructor(private fb: FormBuilder,
              private newsTransport: NewsTransport,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private flashAlert: FlashAlert) {
    this.mainForm = this.fb.group({
      Title: ['', [Validators.required] ],
      PrettyUrl: ['', [Validators.required] ],
      Description: ['', Validators.required ],
      CategoryId: ['', Validators.required ],
      Content: ['', Validators.required ]
    });
  }
  /*
  * Title: string;
  PrettyUrl: string;
  Description: string;
  Content: string;
  CreatorId: number;
  CategoryId: number;*/

  onSubmit() {
    console.log(this.mainForm.value)
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    let news = this.mainForm.value as News;
    news.ImageUrl = this.news.ImageUrl;
    this.blockUI.start();
    if (this.isEdit) {
      news.ID = this.news.ID
      this.newsTransport.update(news)
        .then(id => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Tin tức', 'Cập nhật tin tức thành công');
          this.route.navigate(['admin/news']);
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.blockUI.stop();
        });
    }else {
      this.newsTransport.insert(news)
        .then(id => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Tin tức', 'Cập nhật tin tức thành công');
          this.route.navigate(['admin/news']);
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.blockUI.stop();
        });
    }
  }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.title = 'Sửa tin';
        this.filter.ID = +params['id'];
        this.newsTransport.getA(this.filter)
          .then(news => {
            this.news = news;
            if (news.ImageUrl) {
              this.oldImgs = [HelperTransport.imageUrl(news.ImageUrl)];
            }
            this.mainForm.setValue({
              Title: news.Title,
              PrettyUrl: news.PrettyUrl,
              Description: news.Description,
              CategoryId: news.CategoryId,
              Content: news.Content,
            });
            setTimeout(() => {
              CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]].setData(news.Content);
            }, 100);
          })
          .catch(err => {
            console.log(err);
            this.route.navigate(['admin/news']);
          });
      }
    });
  }
  onRemovedImage($e) {
    this.news.ImageUrl = '';
  }
  onUploadFinished($e) {
    console.log('onUploadFinished', $e);
    if ($e.serverResponse && $e.serverResponse.status === 200) {
      try {
        let data = JSON.parse($e.serverResponse._body);
        if (data.status) {
          this.news.ImageUrl = data.data.FilePath;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  onUploadStateChanged($e) {
    console.log('onUploadStateChanged', $e);
  }
  setPrettyUrl(str: string) {
    this.mainForm.patchValue({'PrettyUrl': FlashAlert.VNToId(str)});
  }
}
