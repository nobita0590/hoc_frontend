import { Component, OnInit } from '@angular/core';
import { TestsFrame, SelectSource, SelectSourceFilter, TestsFrameFilter } from './../../type/type';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ValidateHelper, FormErrorHelper } from './../../shared/validate.helper';
import { FlashAlert } from './../../shared/flash.alert';
import { TestsFrameTransport, SelectSourceTransport } from './../../transport/transport';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';


@Component({
  selector: 'app-tests-frame-form',
  templateUrl: './tests-frame-form.component.html',
  providers: [SelectSourceTransport, TestsFrameTransport]
})
export class TestsFrameFormComponent implements OnInit {
  confTitle = 'Cấu hình phần trăm câu hỏi xuất hiện trong đề thi được tạo ngẫu nhiên. Lưu ý rằng tổng giá trị phải là 100';
  title = 'Tạo mẫu đề';
  categorySource = [];
  classSource = [];
  difficultSource = [];
  subjectSource = [];
  typeSource = [];
  mainForm: FormGroup;
  test = new TestsFrame();
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  constructor(private fb: FormBuilder,
              private flashAlert: FlashAlert,
              private testsFrameTransport: TestsFrameTransport,
              private route: Router, private activatedRoute: ActivatedRoute,
              private selectSourceTransport: SelectSourceTransport) {
    this.mainForm = this.fb.group({
      Title: ['', [Validators.required]],
      TypeId: ['', [ValidateHelper.numberRequired]],
      Description: [''],
      Total: ['', [ValidateHelper.numberRequired]],
      DifficulConfig: this.fb.array([])
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.test.ID = params['id'];
        this.title = 'Sửa mẫu đề';
      }
    });
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
        if (groups[7]) {
          this.typeSource = groups[7];
        }
        if (this.test.ID > 0) {
          this.testsFrameTransport.getA({
            ID: this.test.ID
          } as TestsFrameFilter)
            .then( testFrame => {
              this.test = testFrame;
              this.mainForm.patchValue({
                Title: testFrame.Title,
                Time: testFrame.Time,
                Description: testFrame.Description,
                Total: testFrame.Total,
              });
              const conf = Array.isArray(testFrame.DifficulConfig) ? testFrame.DifficulConfig : [];
              for (let source of this.difficultSource) {
                let difficul = conf.find( e => {
                  return e.DifficulId == source.ID;
                });
                this.DifficulConfig.push(this.fb.group({
                  DifficulId: [source.ID],
                  Percent: [difficul ? difficul.Percent : 0]
                }));
              }
            });
        } else {
          for (let source of this.difficultSource) {
            this.DifficulConfig.push(this.fb.group({
              DifficulId: [source.ID],
              Percent: [0]
            }));
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit() {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    let test = this.mainForm.value as TestsFrame;
    console.log(test);
    this.blockUI.start();

    if (this.test.ID > 0) {
      test.ID = this.test.ID;
      this.testsFrameTransport.update(test)
        .then(_d => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Đề thi', 'Bạn đã cập nhật đề thi thành công');
          this.route.navigate(['admin/questions/test/frame']);
        })
        .catch(err => {
          this.blockUI.stop();
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
        });
    } else {
      this.testsFrameTransport.insert(test)
        .then(_d => {
          this.blockUI.stop();
          this.route.navigate(['admin/questions/test/frame']);
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Đề thi', 'Bạn đã cập nhật đề thi thành công');
        })
        .catch(err => {
          console.log(err);
          this.blockUI.stop();
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
        });
    }
    return;
  }
  get DifficulConfig(): FormArray {
    return this.mainForm.get('DifficulConfig') as FormArray;
  }
}
