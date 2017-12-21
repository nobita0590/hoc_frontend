import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Documents, DocumentFilter, SelectSourceFilter } from './../../type';
import { FormErrorHelper } from './../../shared/validate.helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import { FlashAlert } from './../../shared/flash.alert';
import { HelperTransport, SelectSourceTransport, DocumentTransport } from './../../transport';
import { FileType } from './../upload-document.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [DocumentTransport, SelectSourceTransport]
})
export class CreateComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  oldFiles: FileType[] = [] as FileType[];
  filesResponse: FileType[];

  uploadError = '';
  mainForm: FormGroup;
  title = 'Tạo tài liệu';
  document: Documents = new Documents();
  sub: any;
  filter: DocumentFilter = new DocumentFilter();
  isEdit = false;
  uploadUrl = HelperTransport.api('upload');
  classes = [];
  subjects = [];

  constructor(private fb: FormBuilder,
              private documentTransport: DocumentTransport,
              private selectSourceTransport: SelectSourceTransport,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private flashAlert: FlashAlert) {
    this.mainForm = this.fb.group({
      Name: ['', [Validators.required] ],
      Description: ['', Validators.required ],
      ClassId: ['' ],
      SubjectId: ['' ]
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
    console.log(this.filesResponse, this.oldFiles);
    let filePath = '';
    if (this.filesResponse) {
      if (this.filesResponse.length !== 1) {
        this.uploadError = 'Bạn phải chọn một tập tin để upload';
        return;
      }else {
        filePath = this.filesResponse[0].Path;
      }
    }else {
      if (this.oldFiles.length) {
        filePath = this.oldFiles[0].Path;
      }else {
        console.log('here')
        this.uploadError = 'Bạn phải chọn một tập tin để upload';
        return;
      }
    }
    this.uploadError = '';
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    const doc = this.mainForm.value as Documents;
    doc.PathStore = filePath;
    this.blockUI.start();
    if (this.isEdit) {
      doc.ID = this.document.ID;
      this.documentTransport.update(doc)
        .then(id => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Tài liệu', 'Cập nhật tài liệu thành công');
          this.route.navigate(['admin/document']);
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.blockUI.stop();
        });
    }else {
      this.documentTransport.insert(doc)
        .then(id => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Tài liệu', 'Tạo tài liệu thành công');
          this.route.navigate(['admin/document']);
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
    let ssFilter = {GroupsId: [1, 2]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[1]) {
          this.classes = groups[1];
        }
        if (groups[2]) {
          this.subjects = groups[2];
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.sub = this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.title = 'Sửa tin';
        this.filter.ID = +params['id'];
        this.documentTransport.getA(this.filter)
          .then(doc => {
            this.document = doc;
            this.mainForm.setValue({
              Name: doc.Name,
              Description: doc.Description,
              ClassId: doc.ClassId,
              SubjectId: doc.SubjectId,
            });
            this.oldFiles = [{Path: doc.PathStore, Name: doc.PathStore}] as FileType[];
          })
          .catch(err => {
            console.log(err);
            this.route.navigate(['admin/document']);
          });
      }
    });
  }
  onFileChange($e) {
    this.filesResponse = $e;
    // console.log($e);
  }
  onUploadFinished($e) {
    if ($e.serverResponse && $e.serverResponse.status === 200) {
      try {
        let data = JSON.parse($e.serverResponse._body);
        if (data.status) {
          // this.user.AvatarUrl = data.data.FilePath;
          this.mainForm.patchValue({PathStore: data.data.FilePath});
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  onUploadStateChanged($e) {}
}
