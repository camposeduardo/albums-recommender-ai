import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumResultPageComponent } from './album-result-page.component';

describe('AlbumResultPageComponent', () => {
  let component: AlbumResultPageComponent;
  let fixture: ComponentFixture<AlbumResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumResultPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
