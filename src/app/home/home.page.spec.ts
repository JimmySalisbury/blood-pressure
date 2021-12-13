import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [
          IonicModule.forRoot(),
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid if form  empty', () => {
    expect(component.bpFormMetric.valid).toBeFalsy();
  });

  it('should error if form field out of bonds', () => {
    const errors = {};
    const systolicPressure = component.bpFormMetric.controls.systolicPressure;
    systolicPressure.setValue(69);
    expect(systolicPressure.errors).toBeTruthy();
    systolicPressure.setValue(191);
    expect(systolicPressure.errors).toBeTruthy();

    const diastolicPressure = component.bpFormMetric.controls.diastolicPressure;
    diastolicPressure.setValue(39);
    expect(diastolicPressure.errors).toBeTruthy();
    diastolicPressure.setValue(101);
    expect(diastolicPressure.errors).toBeTruthy();
  });

  it('returns a BP of Ideal on form submit', () => {
    expect(component.bpFormMetric.valid).toBeFalsy();
    component.bpFormMetric.controls.systolicPressure.setValue(120);
    component.bpFormMetric.controls.diastolicPressure.setValue(80);

    expect(component.bpFormMetric.valid).toBeTruthy();
    component.onSubmit();
    expect(component.bpCategory).toEqual('Ideal Blood Pressure');
  });

  it('should save to locale storage', () => {
    component.clearLocalStorage();
    expect(component.bpFormMetric.valid).toBeFalsy();
    component.bpFormMetric.controls.systolicPressure.setValue(120);
    component.bpFormMetric.controls.diastolicPressure.setValue(80);
    expect(component.bpFormMetric.valid).toBeTruthy();

    component.saveToLocalStorage();
    expect(component.lineChartData.datasets[0].data.length).toEqual(1);
    expect(component.lineChartData.datasets[1].data.length).toEqual(1);
    expect(component.lineChartData.labels.length).toEqual(1);
    expect(component.bdData.length).toEqual(1);
  });

  it('should set locale storage to be empty', () => {
    expect(component.bpFormMetric.valid).toBeFalsy();
    component.bpFormMetric.controls.systolicPressure.setValue(120);
    component.bpFormMetric.controls.diastolicPressure.setValue(80);

    expect(component.bpFormMetric.valid).toBeTruthy();
    component.clearLocalStorage();
    expect(component.lineChartData.datasets[0].data.length).toEqual(0);
    expect(component.lineChartData.datasets[1].data.length).toEqual(0);
    expect(component.lineChartData.labels.length).toEqual(0);
    expect(component.bdData.length).toEqual(0);
  });
});
