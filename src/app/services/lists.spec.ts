import { TestBed } from '@angular/core/testing';

import { ToDoList } from '../../types';
import { List } from '../list/list';
import { ListsService } from './lists';

describe('Lists', () => {
  let service: ListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
