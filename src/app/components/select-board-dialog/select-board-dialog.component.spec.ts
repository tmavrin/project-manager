import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoardDialogComponent } from './select-board-dialog.component';

describe('SelectBoardDialogComponent', () => {
  let component: SelectBoardDialogComponent;
  let fixture: ComponentFixture<SelectBoardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBoardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
