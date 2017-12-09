import { Component, OnInit } from '@angular/core';
import { TestsTransport, TestsFrameTransport, ExamsTransport } from '../../../app/transport';
import { Tests, Question, TestsFilter, Exams, QuestionHistory } from '../../../app/type';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExamConfig } from './config';
import { Helper } from '../../service/Helper';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  providers: [TestsTransport, TestsFrameTransport, ExamsTransport]
})
export class ExamComponent implements OnInit {
  showTop10 = false;
  bestTrue = 0;
  percent = '0%';
  config = new ExamConfig();
  step = 1;
  answered = 0;
  title = '';
  className = '';
  subjectName = '';
  typeName = '';
  description = '';
  test: Tests = new Tests();
  exams = new Exams();
  top10: Exams[] = [];
  questions: Question[] = [];
  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private testsTransport: TestsTransport,
              private examsTransport: ExamsTransport) {
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params['id'] as number;
      if (id) {
        this.testsTransport.getForExams({ID: id} as TestsFilter)
          .then(_d => {
            const test = _d.test;
            this.top10 = _d.exams;
            this.title = test.Title;
            this.className = test.ClassName;
            this.subjectName = test.SubjectName;
            this.typeName = test.TypeName;
            this.description = test.Description;
            this.test = test;
            this.questions = test.Questions;
            this.exams.TypeId = 1;
            if (this.top10[0]) {
              this.bestTrue = this.top10[0].TrueNumber;
            }
          });
      }
    });
  }
  chooseAnswer($e) {
    this.answered = $e;
    this.percent = Math.ceil(($e * 100) / this.questions.length) + '%';
  }
  onPause($e) {
    if ($e == 3) {
      this.step = $e;
    }
    if ($e == 4) {
      this.submit();
    }
  }
  start() {
    this.step = 2;
    this.config.StartTime = new Date();
  }
  submit() {
    this.exams.TrueNumber = 0;
    this.exams.History = [];
    for (const _q of this.questions) {
      const quest = new QuestionHistory();
      quest.QuestionId = _q.ID;
      quest.Picked = _q.Ticker;
      for ( const i in _q.AnswerView) {
        if (_q.AnswerView[i].IsTrue) {
          quest.True = i;
          if (_q.Ticker == i) {
            this.exams.TrueNumber += 1;
          }
        }
      }
      this.exams.History.push(quest);
    }
    this.exams.Total = this.questions.length;
    this.exams.Score = this.exams.TrueNumber * 10 / this.exams.Total;
    this.exams.StartTime = this.config.StartTime;
    this.exams.FinishTime = new Date();
    this.exams.TestId = this.test.ID;
    if (this.exams.TrueNumber > this.bestTrue) {
      this.bestTrue = this.exams.TrueNumber;
    }
    this.examsTransport.insertExams(this.exams)
      .then(_d => {
        this.step = 4;
        this.config.ShowAnswer = 1;
        this.config.Current = 1;
      })
      .catch(err => {
        console.log(err);
      });
  }
  viewTime(date: Date) {
    /*console.log(date);
    if (!(date  instanceof Date)) {
      date = new Date(date);
    }*/
    return Helper.viewDateTime(date);
  }
  timeDoing(t: number) {
    if (t > 0) {
      const minutes = Math.floor(t / 60);
      const seconds = t - minutes * 60;
      return `${minutes} phút ${seconds} giây`;
    }
    return '0 giây';
  }
}
