import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Tests, SelectSource, Question } from './../../type/type';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidateHelper, FormErrorHelper } from './../../shared/validate.helper';
import { FlashAlert } from './../../shared/flash.alert';
import { TestsTransport } from './../../transport/transport';
import { Router } from '@angular/router';

@Component({
  selector: 'test-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./test.form.scss'],
  providers: [TestsTransport]
})
export class TestFormComponent implements OnInit {
  @Input() classSource: SelectSource[];
  @Input() subjectSource: SelectSource[];
  @Input() difficultSource: SelectSource[];
  @Input() testTypeSource: SelectSource[];
  @Input() test: Tests;
  @Output() onDone = new EventEmitter();
  mainForm: FormGroup;
  constructor(private fb: FormBuilder,
              private flashAlert: FlashAlert,
              private testsTransport: TestsTransport,
              private route: Router) {
    this.mainForm = this.fb.group({
      Title: ['', [Validators.required]],
      ClassId: ['', [ValidateHelper.numberRequired]],
      SubjectId: ['', [ValidateHelper.numberRequired]],
      TypeId: ['', [ValidateHelper.numberRequired]],
      // Time: ['', [ValidateHelper.numberRequired]],
      Description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.mainForm.setValue({
      Title: this.test.Title,
      ClassId: this.test.ClassId,
      SubjectId: this.test.SubjectId,
      // Time: this.test.Time,
      TypeId: this.test.TypeId,
      Description: this.test.Description,
    });
  }
  showClassName(item: Question): string {
    let option = this.classSource.find(e => {
      return e.ID == item.ClassId;
    });
    if (option) {
      return option.Value;
    }
    return '';
  }
  showSubjectName(item: Question): string {
    let option = this.subjectSource.find(e => {
      return e.ID == item.SubjectId;
    });
    if (option) {
      return option.Value;
    }
    return '';
  }
  showDifficulName(item: Question): string {
    let option = this.difficultSource.find(e => {
      return e.ID == item.DifficultId;
    });
    if (option) {
      return option.Value;
    }
    return '';
  }
  removeQuestion(i: number) {
    this.test.Questions.splice(i, 1);
  }
  handValidate(test: Tests): boolean {
    if (!this.test.Questions || this.test.Questions.length < 1) {
      this.flashAlert.flashAlert(FlashAlert.AlertError, 'Câu hỏi', 'Vui lòng chọn câu hỏi cho đề thi của bạn');
      return false;
    }
    return true;
  }
  onSubmit() {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    let test = this.mainForm.value as Tests;
    if (!this.handValidate(test)) {
      return;
    }
    test.QuestionsId = this.test.Questions.map(q => {
      return q.ID;
    });
    if (this.test.ID > 0) {
      test.ID = this.test.ID;
      this.testsTransport.update(test)
        .then(_d => {
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Đề thi', 'Bạn đã cập nhật đề thi thành công');
          this.route.navigate(['admin/questions/test']);
          //this.onDone.emit();
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
        });
    } else {
      this.testsTransport.insert(test)
        .then(_d => {
          this.route.navigate(['admin/questions/test']);
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Đề thi', 'Bạn đã cập nhật đề thi thành công');
          //this.onDone.emit();
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
        });
    }
    console.log(test);
    //  this.onDone.emit();
  }
}
