import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodPressureService } from '../services/blood-pressure.service';

import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage implements OnInit {
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
  bdData = [];

  // New feature code 1: code
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineChartData: ChartConfiguration['data'] = {
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

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  // end new feature code for

  constructor(private bloodPressureService: BloodPressureService) {}

  ngOnInit() {
    console.log(this.chart);
    this.bdData = JSON.parse(localStorage.getItem('bp_data') || '[]');
    if (this.bdData.length !== 0) {
      this.lineChartData.datasets[0].data.push(
        ...this.bdData.map((data) => data.systolicPressure)
      );
      this.lineChartData.datasets[1].data.push(
        ...this.bdData.map((data) => data.diastolicPressure)
      );
      this.lineChartData.labels?.push(...this.bdData.map((data) => data.date));
      this.chart?.update();
    }
  }

  onSubmit() {
    this.bpCategory = this.bloodPressureService.getBloodPressureCategory(
      this.bpFormMetric.value
    );
    this.bpValue = this.bloodPressureService.calculateMainArterialPressure(
      this.bpFormMetric.value
    );
    this.saveToLocalStorage();
  }

  //  New feature code 1: functions
  saveToLocalStorage() {
    this.bdData = JSON.parse(localStorage.getItem('bp_data') || '[]');
    this.bdData = [
      ...this.bdData,
      { ...this.bpFormMetric.value, date: new Date().toLocaleString() },
    ];
    localStorage.setItem('bp_data', JSON.stringify(this.bdData));

    this.lineChartData.datasets[0].data.push(
      this.bpFormMetric.value.systolicPressure
    );
    this.lineChartData.datasets[1].data.push(
      this.bpFormMetric.value.diastolicPressure
    );
    this.lineChartData.labels?.push(new Date().toLocaleString());
    this.chart?.update();
    console.log(this.chart);
  }

  clearLocalStorage() {
    localStorage.removeItem('bp_data');
    this.bdData.length = 0;
    this.lineChartData.datasets[0].data.length = 0;
    this.lineChartData.datasets[1].data.length = 0;
    this.lineChartData.labels.length = 0;
    this.chart?.update();
    console.log(this.chart);
  }
  // end New feature functions
}
