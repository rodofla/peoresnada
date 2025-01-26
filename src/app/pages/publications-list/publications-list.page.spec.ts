import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationsListPage } from './publications-list.page';

describe('PublicationsListPage', () => {
  let component: PublicationsListPage;
  let fixture: ComponentFixture<PublicationsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
