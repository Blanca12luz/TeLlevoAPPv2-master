import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewpaswordPage } from './newpasword.page';

describe('NewpaswordPage', () => {
  let component: NewpaswordPage;
  let fixture: ComponentFixture<NewpaswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpaswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
