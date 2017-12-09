import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';

declare var CKEDITOR: any;
@Component({
  selector: 'app-fags-create',
  templateUrl: './create.component.html',
  providers: []
})
export class CreateComponent implements OnInit {
  mainForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.mainForm = this.fb.group({
      CategoryId: ['', [Validators.required] ],
      Content: ['', [Validators.required] ],
      FullAnswer: ['', [Validators.required] ],
      ClassId: ['', Validators.required ],
      DifficultId: ['', Validators.required ],
      SubjectId: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
  }

}
