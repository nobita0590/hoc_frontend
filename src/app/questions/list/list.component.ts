import { Component, OnInit } from '@angular/core';
import { QuestionTransport, SelectSourceTransport, TestsTransport } from './../../transport/transport';
import { Question, QuestionFilter, SelectSourceFilter, Tests, TestsFilter } from './../../type/type';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [QuestionTransport, SelectSourceTransport, TestsTransport]
})
export class ListComponent implements OnInit {
  test: Tests = new Tests();
  isCreating = false;
  items: Question[] = [];
  itemCount = 0;
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  filter: QuestionFilter = new QuestionFilter();
  categorySource = [];
  classSource = [];
  difficultSource = [];
  subjectSource = [];
  testTypeSource = [];

  constructor(private questionTranport: QuestionTransport,
              private selectSourceTransport: SelectSourceTransport,
              private activatedRoute: ActivatedRoute,
              private testsTransport: TestsTransport) {
    this.filter.Count = true;
    this.filter.IsFill = true;
  }
  onToggle() {
    this.isCreating = !this.isCreating;
  }

  ngOnInit() {
    let ssFilter = {GroupsId: [1, 2, 3, 5, 7]} as SelectSourceFilter;
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
        if (groups[7]) {
          this.testTypeSource = groups[7];
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let tId = params['t'];
      if (tId !== undefined ){
        if (tId == 0) {
          this.isCreating = true;
        }else{
          this.testsTransport.getA({ID: tId} as TestsFilter)
            .then(test => {
              this.test = test;
              this.isCreating = true;
            });
        }
      }
      console.log(tId);
    });
  }

  reloadItems(params?) {
    console.log(params);
    this.blockUI.start();
    if (params) {
      this.filter.bindPage(params);
    }
    this.questionTranport.getList(this.filter).then(userInfo => {
      this.blockUI.stop();
      this.items = userInfo.models;
      this.itemCount = userInfo.p_info.Total;
    }).catch(e => {
      this.blockUI.stop();
    });
  }
  delete(id: number) {
    if (!confirm('Bạn có chắc muốn xóa câu hỏi khỏi hệ thống?')) {
      return;
    }
    let filter = {ID: id} as QuestionFilter;
    this.questionTranport.delete(filter)
      .then( id => {
        this.reloadItems(false);
      })
      .catch( err => {
        console.log(err);
      });
  }
  addToTest(item: Question) {
    let check = this.test.Questions.find(q => {
      return q.ID == item.ID;
    })
    if (!check) {
      this.test.Questions.push(item);
    }
  }
  isAdded(item: Question): boolean {
    let check = this.test.Questions.find(q => {
      return q.ID == item.ID;
    });
    return check ? true : false;
  }
  createTest() {
    this.test = new Tests();
    this.test.Title = 'title';
    this.isCreating = !this.isCreating;
  }
}
