import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FileUploader, FilterFunction } from 'ng2-file-upload';
import { HelperTransport } from './../transport/helper.transport';

const URL = HelperTransport.api('upload/private');

@Component({
  selector: 'upload-document',
  template: `
    <div class="file-container container">
      <div class="row">
        <div class="drop-container">
          <label class="choose-file-label" (click)="uploadFile.click()">Chọn file</label>
          <input type="file" style="display: none" #uploadFile ng2FileSelect [uploader]="uploader">
        </div>
      </div>
      <div class="row" *ngIf="filesAvailable.length">
        <ul class="list-thumb-img-xx">
          <li *ngFor="let file of filesAvailable">
            <div class="one-thumb">
              <div class="w-thumb-img" [ngClass]="'w-thumb-img-' + _getFileType(file.Name)"></div>
              <span class="del-item" *ngIf="!file.isRemove" (click)="toggleFile(file)">
              <i class="fa fa-times"></i>
            </span>
              <div class="del-cancel" *ngIf="file.isRemove" (click)="toggleFile(file)">
                <i class="fa fa-times-circle-o"></i>
                <span>Hủy bỏ</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="row" *ngIf="errorString">
        <div class="alert alert-danger" style="width:100%;border-radius:0px">
          <!--<button class="close" style="cursor: pointer" (click)="errorString = ''">
            <span aria-hidden="true">&times;</span>
          </button>-->
          <span>{{errorString}}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./upload-document.component.scss'],
  providers: []
})

export class UploadDocumentComponent implements OnInit {
  @Input('oldfiles') filesAvailable: FileType[];
  @Input() limit: number;
  @Output() onFileChange = new EventEmitter<FileType[]>();
  @Input()
  set error(err: string) {
    this.errorString = err;
  }
  get error(): string {
    return this.errorString;
  }
  // public filesAvailable: FileType[] = [];
  public uploader: FileUploader;
  errorString = '';
  constructor() {
    this.filesAvailable = [];
  }
  public toggleFile(file: FileType) {
    if (file.isRemove && this.getFileSuccess().length == this.limit) {
      this.errorString = `Bạn chỉ được chọn tối đa ${this.limit} tập tin`;
      return;
    }
    this.errorString = '';
    file.isRemove = !file.isRemove;
    this.onFileChange.emit(this.getFileSuccess());
  }
  private getFileSuccess(): FileType[] {
    let a = [];
    for (let file of this.filesAvailable) {
      if (!file.isRemove) {
        a.push(file);
      }
    }
    return a;
  }
  private _getFileType(fileName: string): string {
    let nameSplit = fileName.split('.'),
        fileExt = nameSplit[nameSplit.length - 1];
    switch (fileExt) {
      case 'ods':
      case 'xls':
      case 'xlsx':
        return 'xls';
      case 'doc':
      case 'docx':
        return 'doc';
      case 'jpg':
      case 'jpeg':
        return 'jpg';
      default: return fileExt;
    }
  }
  ngOnInit() {
    let limit = 1,self = this;
    if (this.limit && this.limit > 1) {
      limit = this.limit;
    }else {
      this.limit = limit;
    }
    this.uploader = new FileUploader({
      url: URL,
      itemAlias: 'private_file',
      autoUpload: true,
      filters: [
        {
          name : 'vietanh',
          fn: function(item, options){
            if (self.getFileSuccess().length >= limit) {
              self.errorString = `Bạn chỉ được upload tối đa ${limit} tập tin. Bạn có thể bỏ chọn file để tiếp tục upload`;
              return false;
            }
            return true;
          }
        }
      ],
      queueLimit: limit,
    });
    eval('window.uploader = this.uploader');
    this.uploader.onAfterAddingAll = function (fileItems) {
      return { fileItems: fileItems };
    };
    this.uploader.onSuccessItem = function (item, response, status, headers) {
      let a =  { item: item, response: response, status: status, headers: headers };
      let res = JSON.parse(response).data;
      let file = {
        Name: res.FileName,
        Path: res.FilePath,
      } as FileType;
      self.filesAvailable.push(file);
      self.onFileChange.emit(self.getFileSuccess());
      self.uploader.clearQueue();
      self.errorString = '';
      return a;
    };
  }
}
export class FileType {
  Name: string;
  Path: string;
  isRemove: boolean;
  Type: string;
}
