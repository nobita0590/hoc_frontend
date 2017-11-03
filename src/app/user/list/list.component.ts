import { Component, OnInit } from '@angular/core';
import { UserTransport } from './../../transport/user.transport';
import { User, UserFilter } from './../../type/user-type';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [UserTransport]
})
export class ListComponent implements OnInit {
  items: User[] = [];
  itemCount = 0;
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  filter: UserFilter = new UserFilter();

  constructor(private userTranport: UserTransport) {
    this.filter.Count = true;
  }

  ngOnInit() {
  }

  reloadItems(params) {
    console.log(params);
    this.blockUI.start();
    let self = this;
    if (params) {
      this.filter.bindPage(params);
    }
    this.userTranport.getList(this.filter).then(userInfo => {
      self.blockUI.stop();
      this.items = userInfo.user;
      this.itemCount = userInfo.p_info.Total;
    }).catch(e => {
      self.blockUI.stop();
    });
  }
  delete(id: number) {
    if(!confirm("Bạn có chắc muốn khóa tài khoản khỏi hệ thống?")){
      return;
    }
    let filter = {ID: id} as UserFilter;
    this.userTranport.delete(filter)
      .then(id => {
        this.reloadItems(false);
      })
    .catch( err => {
      console.log(err);
    })
  }

  // special properties:

  rowClick(rowEvent) {
    // console.log('Clicked: ' , rowEvent);
  }

  rowDoubleClick(rowEvent) {
    // alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return `${item.LastName} ${item.FirstName}`; }

}
