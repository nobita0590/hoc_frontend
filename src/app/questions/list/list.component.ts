import { Component, OnInit } from '@angular/core';
import { QuestionTransport } from './../../transport/transport';
import { Question, QuestionFilter } from './../../type/questions-type';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import { HelperTransport } from './../../transport/helper.transport';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [QuestionTransport]
})
export class ListComponent implements OnInit {
  items: Question[] = [];
  itemCount = 0;
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  filter: QuestionFilter = new QuestionFilter();

  constructor(private questionTranport: QuestionTransport) {
    this.filter.Count = true;
    this.filter.IsFill = true;
  }

  ngOnInit() {
  }

  reloadItems(params) {
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
    if (!confirm('Bạn có chắc muốn xóa tin khỏi hệ thống?')) {
      return;
    }
    let filter = {ID: id} as QuestionFilter;
    this.questionTranport.delete(filter)
      .then(id => {
        this.reloadItems(false);
      })
      .catch( err => {
        console.log(err);
      });
  }
  download(id: number) {
    location.href = (HelperTransport.api(`document/download/${id}?access_token=${localStorage.getItem('access_token')}`));
  }

  // special properties:

  rowClick(rowEvent) {
    // console.log('Clicked: ' , rowEvent);
  }

  rowDoubleClick(rowEvent) {
    // alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item: Question) { return `${item.Content}`; }
}
