import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsFrameComponent } from './tests-frame.component';

describe('TestsFrameComponent', () => {
  let component: TestsFrameComponent;
  let fixture: ComponentFixture<TestsFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
