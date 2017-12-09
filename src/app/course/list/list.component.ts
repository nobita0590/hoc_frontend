import { Component, OnInit } from '@angular/core';
import { CourseTransport, SelectSourceTransport } from '../../transport';
import { Course, CourseFilter, SelectSourceFilter } from '../../type';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CourseTransport, SelectSourceTransport]
})
export class ListComponent implements OnInit {
  isCreating = false;
  items: Course[] = [];
  itemCount = 0;
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  filter: CourseFilter = new CourseFilter();
  categorySource = [];
  classSource = [];
  difficultSource = [];
  subjectSource = [];

  constructor(private courseTransport: CourseTransport,
              private selectSourceTransport: SelectSourceTransport) {
    this.filter.Count = true;
  }

  ngOnInit() {
    /*let ssFilter = {GroupsId: [1, 2, 3, 5]} as SelectSourceFilter;
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
      });*/
  }

  reloadItems(params?) {
    this.blockUI.start();
    this.filter.Count = true;
    if (params) {
      this.filter.bindPage(params);
    }
    this.courseTransport.getList(this.filter).then(_d => {
      this.blockUI.stop();
      this.items = _d.models;
      this.itemCount = _d.p_info.Total;
    }).catch(e => {
      this.blockUI.stop();
    });
  }
  delete(id: number) {
    if (!confirm('Bạn có chắc muốn xóa khóa học khỏi hệ thống?')) {
      return;
    }
    let filter = {ID: id} as CourseFilter;
    this.courseTransport.delete(filter)
      .then( id => {
        this.reloadItems(false);
      })
      .catch( err => {
        console.log(err);
      });
  }
}
