import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarQuizComponent } from './realizar-quiz.component';

describe('RealizarQuizComponent', () => {
  let component: RealizarQuizComponent;
  let fixture: ComponentFixture<RealizarQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
