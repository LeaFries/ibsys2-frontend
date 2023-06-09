import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseStockComponent } from './warehouse-stock.component';

describe('WarehouseStockComponent', () => {
  let component: WarehouseStockComponent;
  let fixture: ComponentFixture<WarehouseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
