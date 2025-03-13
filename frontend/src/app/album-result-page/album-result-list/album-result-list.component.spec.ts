import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumResultListComponent } from './album-result-list.component';

describe('AlbumResultListComponent', () => {
  let component: AlbumResultListComponent;
  let fixture: ComponentFixture<AlbumResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumResultListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
