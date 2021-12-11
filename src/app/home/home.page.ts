import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodPressureService } from '../services/blood-pressure.service';

import { ChartDataset, ChartOptions } from 'chart.js';
import { baseColors } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
  bpFormMetric = new FormGroup({
    systolicPressure: new FormControl('', [
      Validators.required,
      Validators.min(70),
      Validators.max(190),
    ]),
    diastolicPressure: new FormControl('', [
      Validators.required,
      Validators.min(40),
      Validators.max(100),
    ]),
  });

  bpCategory: string;
  bpValue: number;

  lineChartData = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private bloodPressureService: BloodPressureService) {}

  onSubmit() {
    this.bpCategory = this.bloodPressureService.getBloodPressureCategory(
      this.bpFormMetric.value
    );
    this.bpValue = this.bloodPressureService.calculateMainArterialPressure(
      this.bpFormMetric.value
    );
  }
}
