import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../app/type';
import { ExamConfig } from './config';
@Component({
  selector: 'div[examContent]',
  template: `
    <h6 class="pb-2">Làm bài lần 1<hr></h6>
    <div *ngFor="let _q of qShow;let i = index" class="question">
      <div class="row">
        <div class="col-sm-auto no">{{_config.Current * _config.Per + i - 1}}</div>
        <div class="col-sm ">
          <p appMathJax [MathJax]="_q.Content"></p>
        </div>
      </div>
      <div class="row answer">
        <div class="custom-controls-stacked d-block">
          <label *ngFor="let answer of _q.AnswerView;let j = index" class="custom-control custom-radio d-block">
            <input type="radio" class="custom-control-input" [(ngModel)]="_q.Ticker"
                   name="_answer_{{i}}" value="{{j}}" (click)="choose()">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description" appMathJax [MathJax]="answer.Content"></span>
            <i *ngIf="_config.ShowAnswer != 0 && answer.IsTrue" class="text-success fa fa-check"
               [ngClass]="{'text-success': _q.Ticker == j, 'text-danger': _q.Ticker != j}"></i>
          </label>
        </div>
      </div>
      <div *ngIf="_config.ShowAnswer == 2" class="card p-3" appMathJax [MathJax]="_q.FullAnswer"></div>
      <hr>
    </div>
    <div class="text-center">
      <a *ngIf="_config.ShowAnswer == 0" (click)="pause(3)" class="btn btn-lg px-5 m-2 btn-info"><i class="fa fa-save"></i> Lưu bài</a>
      <a *ngIf="_config.ShowAnswer == 0" (click)="pause(4)" class="btn btn-lg px-5 m-2 btn-success">Nộp bài</a>
      <a *ngIf="_config.Current > 1" (click)="back()" class="btn btn-lg px-5 m-2 btn-success">Back</a>
      <a *ngIf="_config.Current < _config.Max" (click)="next()" class="btn btn-lg px-5 m-2 btn-success">Next</a>
    </div>
  `,
  providers: []
})
export class ExamContentComponent implements OnInit {
  /*[(ngModel)]=*/
  _config: ExamConfig;
  per = 2;
  _questions: Question[];
  qShow: Question[] = [];
  get questions(): Question[]{
    return this._questions;
  }
  @Input()
  set config(_cf: ExamConfig){
    this._config = _cf;
  }
  get config(): ExamConfig {
    return this._config;
  }
  @Input()
  set questions(questions: Question[]) {
    // console.log(this.questions);
    this._config.Max = Math.ceil(questions.length / this._config.Per);
    this._questions = questions;
    this.qShow = this._questions.slice((this._config.Current - 1) * this._config.Per, this._config.Current * this._config.Per );
  }
  @Output()onCheck = new EventEmitter<number>();
  @Output()onPause = new EventEmitter<number>();
  constructor() {
  }
  ngOnInit(): void {
  }
  choose() {
    setTimeout(() => {
      let num = 0;
      for (const _q of this._questions){
        if (_q.Ticker >= 0) {
          num += 1;
        }
      }
      this.onCheck.emit(num);
    }, 5);
  }
  next() {
    this._config.Current ++;
    this.qShow = this._questions.slice((this._config.Current - 1) * this._config.Per, this._config.Current * this._config.Per );
  }
  back() {
    this._config.Current --;
    this.qShow = this._questions.slice((this._config.Current - 1) * this._config.Per, this._config.Current * this._config.Per );
  }
  pause(val: number) {
    if (val == 3 || val == 4) {
      this.onPause.emit(val);
    }
  }
}
