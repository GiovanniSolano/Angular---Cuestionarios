import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearQuizComponent } from './crear-quiz.component';

describe('CrearQuizComponent', () => {
  let component: CrearQuizComponent;
  let fixture: ComponentFixture<CrearQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
