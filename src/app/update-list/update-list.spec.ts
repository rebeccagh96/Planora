import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateList } from './update-list';

describe('UpdateList', () => {
  let component: UpdateList;
  let fixture: ComponentFixture<UpdateList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
