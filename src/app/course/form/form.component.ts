import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Course, CourseChapter, CourseFilter, SelectSource, SelectSourceFilter } from './../../type';
import { ValidateHelper, FormErrorHelper } from './../../shared/validate.helper';
import { CourseTransport, HelperTransport, SelectSourceTransport } from './../../transport';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import { FlashAlert } from './../../shared/flash.alert';
declare var CKEDITOR: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [CourseTransport, SelectSourceTransport]
})
export class FormComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  uploadUrl = HelperTransport.api('upload?folder=course');
  oldImgs: string[] = [];
  teachers: SelectSource[] = [];

  mainForm: FormGroup;
  title = 'Đăng tin';
  course: Course = new Course();
  filter: CourseFilter = new CourseFilter();
  isEdit = false;

  constructor(private fb: FormBuilder,
              private courseTransport: CourseTransport,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private flashAlert: FlashAlert,
              private selectSourceTransport: SelectSourceTransport) {
    this.mainForm = this.fb.group({
      Title: ['', [Validators.required] ],
      PrettyUrl: ['', [Validators.required] ],
      YoutubeUrl: '',
      TeacherId: ['', [Validators.required] ],
      Price: [0],
      IsSaleOff: true,
      SaleOffPrice: 0,
      SaleOffDescription: '',
      Tags: '',
      Description: ['', Validators.required ],
      Benefit: ['', Validators.required ],
      Target: ['', Validators.required ],
      Interest: ['', Validators.required ],
      StartDate: [new Date(), Validators.required],
      EndDate: [new Date(), Validators.required],
      Content: this.fb.array([])
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.courseTransport.getA({
          ID: +params['id'],
        } as CourseFilter)
          .then(course => {
            this.course = course;
            if (course.ImageUrl) {
              this.oldImgs = [HelperTransport.imageUrl(course.ImageUrl)];
              this.mainForm.patchValue({
                Title: course.Title,
                PrettyUrl: course.PrettyUrl,
                YoutubeUrl: course.YoutubeUrl,
                TeacherId: course.TeacherId,
                Price: course.Price,
                IsSaleOff: course.IsSaleOff,
                SaleOffPrice: course.SaleOffPrice,
                SaleOffDescription: course.SaleOffDescription,
                Tags: course.Tags,
                Description: course.Description,
                Benefit: course.Benefit,
                Target: course.Target,
                Interest: course.Interest,
                StartDate: course.StartDate,
                EndDate: course.EndDate,
                // Content: this.fb.array([])
              });
              if (Array.isArray(course.Content)) {
                for (let chap of course.Content) {
                  this.addChaper(chap);
                }
              }
              setTimeout(() => {
                CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]].setData(course.Description);
                CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]].setData(course.Benefit);
                CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]].setData(course.Target);
                CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]].setData(course.Interest);
              }, 100);
            }
          });
      } else {
        this.addChaper();
      }
    });
    let ssFilter = {GroupsId: [6]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[6]) {
          this.teachers = groups[6];
        }
      });
  }
  onSubmit() {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    let course = this.mainForm.value as Course;
    course.ImageUrl = this.course.ImageUrl;
    this.blockUI.start();
    if (this.course.ID) {
      this.courseTransport.update(course)
        .then( _d => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Khóa học', 'Cập nhật khóa học thành công');
          this.route.navigate(['admin/course']);
        })
        .catch( err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.blockUI.stop();
        });
    } else {
      this.courseTransport.insert(course)
        .then( _d => {
          this.blockUI.stop();
          this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Khóa học', 'Cập nhật khóa học thành công');
          this.route.navigate(['admin/course']);
        })
        .catch( err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.blockUI.stop();
        });
    }
  }
  get Content(): FormArray {
    return this.mainForm.get('Content') as FormArray;
  }
  addChaper(chap?: CourseChapter) {
    let title = '', steps = [];
    if (!chap) {
      steps = [this.fb.group({
        Name: '',
      })];
    } else {
      title = chap.Title;
      if (Array.isArray(chap.Steps)) {
        for (let step of chap.Steps) {
          steps.push(this.fb.group({
            Name: step.Name,
          }));
        }
      } else {
        steps = [this.fb.group({
          Name: '',
        })];
      }
    }
    let chapGroup = this.fb.group({
      Title: [title],
      Steps: this.fb.array(steps)
    });
    this.Content.push(chapGroup);
  }
  addStep(chap: any) {
    eval('window.f = chap');
    chap.get('Steps').push(this.fb.group({
      Name: '',
    }));
  }
  removeChap(i) {
    this.Content.removeAt(i);
  }
  onRemovedImage($e) {
    this.course.ImageUrl = '';
  }
  onUploadFinished($e) {
    if ($e.serverResponse && $e.serverResponse.status === 200) {
      try {
        let data = JSON.parse($e.serverResponse._body);
        if (data.status) {
          this.course.ImageUrl = data.data.FilePath;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  onUploadStateChanged($e) {
    console.log('onUploadStateChanged', $e);
  }
  setPrettyUrl(str: string) {
    this.mainForm.patchValue({'PrettyUrl': FlashAlert.VNToId(str)});
  }
}
