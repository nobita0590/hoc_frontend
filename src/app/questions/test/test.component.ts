import { Component, OnInit } from '@angular/core';
import { TestsTransport, SelectSourceTransport } from './../../transport/transport';
import { TestsFilter, SelectSourceFilter, Tests } from './../../type/type';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';

@Component({
  selector: 'app-list',
  templateUrl: './test.component.html',
  styleUrls: [],
  providers: [TestsTransport, SelectSourceTransport]
})
export class TestComponent implements OnInit {
  test: Tests = new Tests();
  isCreating = false;
  items: Tests[] = [];
  itemCount = 0;
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  filter: TestsFilter = new TestsFilter();
  categorySource = [];
  classSource = [];
  difficultSource = [];
  subjectSource = [];

  constructor(private testsTransport: TestsTransport,
              private selectSourceTransport: SelectSourceTransport) {
    this.filter.Count = true;
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
  }

  reloadItems(params?) {
    console.log(params);
    this.blockUI.start();
    if (params) {
      this.filter.bindPage(params);
    }
    this.testsTransport.getList(this.filter).then(userInfo => {
      this.blockUI.stop();
      this.items = userInfo.models;
      this.itemCount = userInfo.p_info.Total;
    }).catch(e => {
      this.blockUI.stop();
    });
  }
  delete(id: number) {
    if (!confirm('Bạn có chắc muốn xóa bài thi khỏi hệ thống?')) {
      return;
    }
    let filter = {ID: id} as TestsFilter;
    this.testsTransport.delete(filter)
      .then( id => {
        this.reloadItems(false);
      })
      .catch( err => {
        console.log(err);
      });
  }
}
