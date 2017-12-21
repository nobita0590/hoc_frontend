import { Component, OnInit } from '@angular/core';
import { TestsTransport, TestsFrameTransport, ExamsTransport } from '../../../app/transport';
import { Tests, Question, TestsFilter, Exams, QuestionHistory } from '../../../app/type';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExamConfig } from './config';
import { Helper, ChannelService } from '../../service';

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
  totalTime = 0;
  endMinute = 0;
  endSecond = 0;
  timeStock: any;
  submitting = false;
  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private testsTransport: TestsTransport,
              private examsTransport: ExamsTransport,
              private channelService: ChannelService) {
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
  submit() {
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.exams.TimeDoing = this.test.Minutes * 60 - this.totalTime;
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
        this.submitting = false;
        this.step = 4;
        this.config.ShowAnswer = 1;
        this.config.Current = 1;
      })
      .catch(err => {
        this.submitting = false;
        console.log(err);
      });
  }
  viewTime(date: Date) {
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
  startExam() {
    const user = Helper.getUserInfo();
    if (!user) {
      return this.channelService.loginCalling(true);
    }
    this.totalTime = this.test.Minutes * 60;
    this.endMinute = this.test.Minutes;
    this.config.StartTime = new Date();
    this.doExam();
  }
  doExam() {
    this.step = 2;
    this.timeStock = setInterval(() => {
      this.totalTime -= 1;
      this.endMinute = Math.floor(this.totalTime / 60);
      this.endSecond = this.totalTime - this.endMinute * 60;
    }, 1000);
  }
  stopExam(step) {
    if (step === 3 || step === 4) {
      this.step = step;
      clearInterval(this.timeStock);
    }
    if (step === 4) {
      this.submit();
    }
  }
}
