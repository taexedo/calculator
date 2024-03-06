import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInformationComponent } from './task-information.component';

describe('TaskInformationComponent', () => {
  let component: TaskInformationComponent;
  let fixture: ComponentFixture<TaskInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
