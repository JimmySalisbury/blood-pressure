import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let lineChartOptions = {
    responsive: true,
  };

  let lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  let lineChartData = {
    datasets: [
      {
        data: [],
        label: 'Systolic',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Diastolic',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'red',

        fill: 'origin',
      },
    ],
    labels: [],
  };

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
    component.clearLocalStorage();
    expect(component.bpFormMetric.valid).toBeFalsy();
    component.bpFormMetric.controls.systolicPressure.setValue(120);
    component.bpFormMetric.controls.diastolicPressure.setValue(80);

    expect(component.bpFormMetric.valid).toBeTruthy();
    component.onSubmit();
    expect(component.bpCategory).toEqual('Ideal Blood Pressure');
    expect(component.lineChartData.datasets[0].data.length).toBeGreaterThan(0);
    expect(component.lineChartData.datasets[1].data.length).toBeGreaterThan(0);
    expect(component.lineChartData.labels.length).toBeGreaterThan(0);
    expect(component.bdData.length).toBeGreaterThan(0);
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

  it('should respond true if componant  variables created', () => {
    component.clearLocalStorage();
    expect(component.lineChartOptions).toEqual(lineChartOptions);
    expect(component.lineChartColors).toEqual(lineChartColors);
    expect(component.lineChartOptions).toEqual(lineChartOptions);
  });
});
