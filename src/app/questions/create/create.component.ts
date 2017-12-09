import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Question, QuestionFilter, Answer } from './../../type/questions-type';
import { ValidateHelper, FormErrorHelper } from './../../shared/validate.helper';
import { HelperTransport, SelectSourceTransport, QuestionTransport } from './../../transport/transport';
import { SelectSourceFilter } from './../../type/setting-type';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import { FlashAlert } from './../../shared/flash.alert';
declare var CKEDITOR: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [QuestionTransport, SelectSourceTransport]
})

export class CreateComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  uploadUrl = HelperTransport.api('upload');
  categorySource = [];
  classSource = [];
  difficultSource = [];
  subjectSource = [];

  mainForm: FormGroup;
  title = 'Tạo câu hỏi';
  question: Question = new Question();
  sub: any;
  filter: QuestionFilter = new QuestionFilter();
  // categories = NewsFilter.getCategories();
  isEdit = false;

  constructor(private fb: FormBuilder,
              private questionTransport: QuestionTransport,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private flashAlert: FlashAlert,
              private selectSourceTransport: SelectSourceTransport) {
    this.mainForm = this.fb.group({
      CategoryId: ['', [Validators.required] ],
      Content: ['', [Validators.required] ],
      FullAnswer: ['', [Validators.required] ],
      ClassId: ['', Validators.required ],
      DifficultId: ['', Validators.required ],
      SubjectId: ['', Validators.required ],
      AnswerView: this.fb.array([])
    });
  }
  handValidate(question: Question): boolean {
    var valid = false, contentValid = true;
    if (question.AnswerView.length < 2) {
      this.flashAlert.flashAlert(FlashAlert.AlertError, 'Câu trả lời', 'Một câu hỏi phải có ít nhất 2 câu trả lời');
      return false;
    }
    for (var e of question.AnswerView) {
      if (e.IsTrue) {
        valid = true;
      }
      if (!e.Content.trim()) {
        contentValid = false;
      }
    }
    if (!valid) {
      this.flashAlert.flashAlert(FlashAlert.AlertError, 'Câu trả lời', 'Bạn phải có ít nhất một câu trả lời đúng');
      return false;
    }
    if (!contentValid) {
      this.flashAlert.flashAlert(FlashAlert.AlertError, 'Câu trả lời', 'Vui lòng điền đầy đủ nội dung câu trả lời');
      return false;
    }
    return true;
  }

  onSubmit() {
    // console.log(this.mainForm.value)
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    let question = this.mainForm.value as Question;
    if (!this.handValidate(question)) {
      return;
    }
    this.blockUI.start();
    if (this.isEdit) {
      question.ID = this.question.ID;
      this.questionTransport.update(question)
        .then(id => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Câu hỏi', 'Cập nhật câu hỏi thành công');
          this.route.navigate(['admin/questions']);
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.blockUI.stop();
        });
    }else {
      this.questionTransport.insert(question)
        .then(id => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Câu hỏi', 'Cập nhật câu hỏi thành công');
          this.route.navigate(['admin/questions']);
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
    let ssFilter = {GroupsId: [1, 2, 3, 5]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[1]) {
          this.classSource = groups[1];
        }
        if (groups[2]) {
          this.subjectSource = groups[2];
        }
        if (groups[3]) {
          this.difficultSource = groups[3];
        }
        if (groups[5]) {
          this.categorySource = groups[5];
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
        this.questionTransport.getA(this.filter)
          .then(question => {
            this.question = question;
            this.mainForm.patchValue({
              CategoryId: question.CategoryId,
              Content: question.Content,
              ClassId: question.ClassId,
              DifficultId: question.DifficultId,
              SubjectId: question.SubjectId
            });
            // AnswerView
            if (Array.isArray(question.AnswerView)) {
              for (const e of question.AnswerView) {
                this.addAnswer(e);
              }
            }
            setTimeout(() => {
              CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]].setData(question.Content);
              CKEDITOR.instances[Object.keys(CKEDITOR.instances)[1]].setData(question.FullAnswer);
            }, 200);
          })
          .catch(err => {
            console.log(err);
            // this.route.navigate(['admin/questions']);
          });
      }else {
        this.addAnswer();
      }
    });
  }
  get AnswerView(): FormArray {
    return this.mainForm.get('AnswerView') as FormArray;
  }
  addAnswer(answer?: Answer) {
    if (!answer) {
      answer = new Answer();
    }
    // answer.No = this.AnswerView.length;
    this.AnswerView.push(this.fb.group(answer));
  }
  removeAnswer(index) {
    if (confirm('Bạn có chắc muốn xóa câu trả lời này?')) {
      this.AnswerView.removeAt(index);
    }
  }
}
