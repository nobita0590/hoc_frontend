import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectSource, SelectSourceFilter} from './../../type/setting-type';
import { CategoryModalComponent } from './category-modal.component';
import { FlashAlert } from './../../shared/flash.alert';
import { SelectSourceTransport } from './../../transport/select-source.transport';
// import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [SelectSourceTransport]
})
export class CategoryComponent implements OnInit {
  // public subscriptions: Subscription[] = [];
  categories = [
    {id: 1, name: 'Lớp'},
    {id: 2, name: 'Môn học'},
    {id: 5, name: 'Chuyên mục'},
    {id: 3, name: 'Độ khó'},
    {id: 4, name: 'Tỉnh/ Thành phố'},
  ];
  isChange = false;
  listSource: SelectSource[] = [];
  currentCategory = this.categories[0];
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private flashAlert: FlashAlert,
              private selectSourceTransport: SelectSourceTransport) { }

  ngOnInit() {
    this.modalService.onHide.subscribe((reason: string) => {
      // console.log(`onHide event has been fired${reason ? ', dismissed by ' + reason : ''}`);
      this.refreshList();
    });
    this.refreshList();
  }
  switchCategory(category) {
    this.currentCategory = category;
    this.refreshList();
  }
  public createSelectSource() {
    this.bsModalRef = this.modalService.show(CategoryModalComponent, {class : 'modal-lg'});
    let source = new SelectSource();
    source.GroupId = this.currentCategory.id;
    this.bsModalRef.content.source = source;
    this.bsModalRef.content.category = this.currentCategory;
    // this.bsModalRef.showSource();
  }
  refreshList() {
    let filter = new SelectSourceFilter();
    filter.GroupsId = [this.currentCategory.id];
    this.selectSourceTransport.getList(filter)
      .then(_d => {
        this.listSource = _d;
        setTimeout(() => {
          this.isChange = false;
        }, 200);
      })
      .catch(err => {
        console.log(err);
      });
  }
  editSource(item: SelectSource) {
    this.bsModalRef = this.modalService.show(CategoryModalComponent, {class : 'modal-lg'});
    this.bsModalRef.content.source = item;
    // console.log(this.listSource)
  }
  changeList() {
    this.isChange = true;
    // console.log(this.listSource);
  }
  saveOrder() {
    let order = {};
    for (let i in this.listSource) {
      order[this.listSource[i].ID] = i;
    }
    this.selectSourceTransport.updateSort({sort: order})
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(order);
    this.isChange = false;
  }
  deleteSource(item: SelectSource) {
    if (!confirm("Bạn có chắc muốn xóa")) {
      return;
    }
    this.selectSourceTransport.delete({ID: item.ID} as SelectSourceFilter)
      .then( _d => {
        this.refreshList();
      })
      .catch(err => {
        console.log(err);
      });
  }
}



