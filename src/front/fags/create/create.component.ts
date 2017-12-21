import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormErrorHelper } from '../../../app/shared/validate.helper';
import { Fags, SelectSource, SelectSourceFilter } from '../../../app/type';
import { SelectSourceTransport, FagsTransport } from '../../../app/transport';
import { Helper, ChannelService } from '../../service';
import { Router } from '@angular/router';

declare var CKEDITOR: any;
@Component({
  selector: 'app-fags-create',
  templateUrl: './create.component.html',
  providers: [SelectSourceTransport, FagsTransport]
})
export class CreateComponent implements OnInit {
  isLoading = false;
  mainForm: FormGroup;
  classSource: SelectSource[] = [];
  subjectSource: SelectSource[] = [];
  constructor(private fb: FormBuilder,
              private selectSourceTransport: SelectSourceTransport,
              private fagsTransport: FagsTransport,
              private router: Router,
              private channelService: ChannelService) {
    this.mainForm = this.fb.group({
      Title: ['', [Validators.required] ],
      Content: ['', [Validators.required] ],
      SubjectId: ['', [Validators.required] ],
      ClassId: ['', Validators.required ],
    });
  }

  ngOnInit(): void {
    const ssFilter = {GroupsId: [1, 2]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[1]) {
          this.classSource = groups[1];
        }
        if (groups[2]) {
          this.subjectSource = groups[2];
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit() {
    const user = Helper.getUserInfo();
    if (!user) {
      return this.channelService.loginCalling(true);
    }
    if (this.isLoading) {
      return;
    }
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    this.isLoading = true;
    const fag = this.mainForm.value as Fags;
    fag.PrettyUrl = Helper.VNToId(fag.Title);
    this.fagsTransport.insert(fag)
      .then( _d => {
        this.isLoading = false;
        this.router.navigate(['/hoi-dap', _d.PrettyUrl, _d.ID]);
      })
      .catch( err => {
        this.isLoading = false;
        console.log(err);
      });
  }
}
