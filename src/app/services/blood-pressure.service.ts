import { Injectable } from '@angular/core';

export interface BloodPressure {
  systolicPressure: number;
  diastolicPressure: number;
}
export enum BPCategory {
  low = 'Low Blood Pressure',
  ideal = 'Ideal Blood Pressure',
  preHigh = 'Pre-High Blood Pressure',
  high = 'High Blood Pressure',
}
@Injectable({
  providedIn: 'root',
})
export class BloodPressureService {
  systolicMin = 70;
  systolicMax = 190;
  diastolicMin = 40;
  diastolicMax = 100;
  mainArterialPressure: number;
  bloodPressureCategory: string;

  systolicLowUpperLimit = 90;
  systolicNormalUpperLimit = 120;
  systolicPreHighUpperLimit = 140;

  diastolicLowUpperLimit = 60;
  diastolicNormalUpperLimit = 80;
  diastolicPreHighUpperLimit = 90;

  constructor() {}

  calculateMainArterialPressure({
    systolicPressure,
    diastolicPressure,
  }: BloodPressure) {
    this.mainArterialPressure = (2 * diastolicPressure + systolicPressure) / 3;
    return this.round(this.mainArterialPressure, 2);
  }

  getBloodPressureCategory({
    systolicPressure,
    diastolicPressure,
  }: BloodPressure): string {
    if (
      systolicPressure <= this.systolicLowUpperLimit &&
      diastolicPressure <= this.diastolicLowUpperLimit
    ) {
      return BPCategory.low;
    } else if (
      systolicPressure <= this.systolicNormalUpperLimit &&
      diastolicPressure <= this.diastolicNormalUpperLimit
    ) {
      return BPCategory.ideal;
    } else if (
      systolicPressure <= this.systolicPreHighUpperLimit &&
      diastolicPressure <= this.diastolicPreHighUpperLimit
    ) {
      return BPCategory.preHigh;
    } else {
      return BPCategory.high;
    }
  }

  round(num: number, precision: number) {
    if (precision < 0) {
      const factor = Math.pow(10, precision);
      return Math.round(num * factor) / factor;
    } else {
      return +(Math.round(Number(num + 'e+' + precision)) + 'e-' + precision);
    }
  }
}
