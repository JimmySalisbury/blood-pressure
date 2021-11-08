import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodPressureService } from '../services/blood-pressure.service';

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

  constructor(private bloodPressureService: BloodPressureService) {}

  onSubmit() {
    console.log('submit');
    this.bpCategory = this.bloodPressureService.getBloodPressureCategory(
      this.bpFormMetric.value
    );
    this.bpValue = this.bloodPressureService.calculateMainArterialPressure(
      this.bpFormMetric.value
    );
  }
}
