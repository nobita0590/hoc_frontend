import { Component, OnInit, Input } from '@angular/core';
import { SelectSourceTransport, TestsFrameTransport, ExamsTransport } from '../../../app/transport';
import { SelectSourceFilter, SelectSource, Question, QuestionHistory,
  TestsFrameFilter, TestsFrame, Exams } from '../../../app/type';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidateHelper, FormErrorHelper } from '../../../app/shared/validate.helper';
import { ExamConfig } from '../exam/config';
import { Helper, ChannelService } from '../../service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  providers: [SelectSourceTransport, TestsFrameTransport, ExamsTransport]
})
export class GenerateComponent implements OnInit {
  config = new ExamConfig();
  percent = '0%';
  answered = 0;
  step = 1;
  bestTrue = 0;
  showTop10 = false;
  submiting = false;
  isReady = false;
  chosen = false;
  classesSource: SelectSource[] = [];
  subjectSource: SelectSource[] = [];
  testTypeSource: TestsFrame[] = [];
  mainForm: FormGroup;
  currentFrame: TestsFrame;
  mainInfo: TestsFrameFilter;
  questions: Question[] = [];
  exams = new Exams();
  totalTime = 0;
  endMinute = 0;
  endSecond = 0;
  timeStock: any;
  constructor(private fb: FormBuilder,
              private examsTransport: ExamsTransport,
              private selectSourceTransport: SelectSourceTransport,
              private testsFrameTransport: TestsFrameTransport,
              private channelService: ChannelService) {
    this.exams.TypeId = 2;
    this.mainForm = this.fb.group({
      ID: ['', [ValidateHelper.numberRequired]],
      SubjectId: ['', [ValidateHelper.numberRequired]],
      ClassesId: ['', [ValidateHelper.numberRequired]],
    });
  }
  ngOnInit(): void {
    const ssFilter = {GroupsId: [1, 2]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[1]) {
          this.classesSource = groups[1];
        }
        if (groups[2]) {
          this.subjectSource = groups[2];
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.testsFrameTransport.getList({} as TestsFrameFilter)
      .then(_d => {
        this.testTypeSource = _d.models;
      })
      .catch(err => {
        console.log(err);
      });
  }
  changeTest() {
    console.log(this.mainForm.value.ID);
    const frameId = this.mainForm.value.ID;
    this.currentFrame = this.testTypeSource.find(e => {
      return e.ID == frameId;
    });
    console.log(this.currentFrame);
  }
  generateQuestion() {
    const user = Helper.getUserInfo();
    if (!user) {
      return this.channelService.loginCalling(true);
    }
    if (this.mainForm.invalid || this.submiting) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    this.chosen = true;
    this.mainInfo = this.mainForm.value as TestsFrameFilter;
    this.submiting = true;
    this.testsFrameTransport.generate(this.mainInfo)
      .then(_d => {
        this.submiting = false;
        this.questions = _d;
        this.isReady = true;
      })
      .catch(err => {
        console.log(err);
        this.submiting = false;
      });
  }
  chooseAnswer($e) {
    this.answered = $e;
    this.percent = Math.ceil(($e * 100) / this.questions.length) + '%';
  }
  submit() {
    if (this.submiting) {
      return;
    }
    this.submiting = true;
    this.exams.TimeDoing = this.currentFrame.Minutes * 60 - this.totalTime;
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
    this.exams.TestId = this.mainInfo.ID;
    if (this.exams.TrueNumber > this.bestTrue) {
      this.bestTrue = this.exams.TrueNumber;
    }
    this.examsTransport.insertExams(this.exams)
      .then(_d => {
        this.step = 4;
        this.config.ShowAnswer = 1;
        this.config.Current = 1;
        this.submiting = false;
      })
      .catch(err => {
        this.submiting = false;
        console.log(err);
      });
  }
  timeDoing(t: number) {
    if (t > 0) {
      const minutes = Math.floor(t / 60);
      const seconds = t - minutes * 60;
      return `${minutes} phút ${seconds} giây`;
    }
    return '0 giây';
  }
  viewTime(date: Date) {
    return Helper.viewDateTime(date);
  }
  startExam() {
    this.config.StartTime = new Date();
    this.totalTime = this.currentFrame.Minutes * 60;
    this.endMinute = this.currentFrame.Minutes;
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
