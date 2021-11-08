import { TestBed } from '@angular/core/testing';

import { BloodPressureService } from './blood-pressure.service';

describe('BloodPressureService', () => {
  let service: BloodPressureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodPressureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Low Blood Pressure', () => {
    expect(
      service.getBloodPressureCategory({
        systolicPressure: 80,
        diastolicPressure: 60,
      })
    ).toEqual('Low Blood Pressure');
  });

  it('should return Ideal Blood Pressure', () => {
    expect(
      service.getBloodPressureCategory({
        systolicPressure: 110,
        diastolicPressure: 79,
      })
    ).toEqual('Ideal Blood Pressure');
  });

  it('should return Pre-High Blood Pressure', () => {
    expect(
      service.getBloodPressureCategory({
        systolicPressure: 139,
        diastolicPressure: 89,
      })
    ).toEqual('Pre-High Blood Pressure');
  });

  it('should return High Blood Pressure', () => {
    expect(
      service.getBloodPressureCategory({
        systolicPressure: 150,
        diastolicPressure: 100,
      })
    ).toEqual('High Blood Pressure');
  });

  it('should return 88 for main arterial pressure', () => {
    expect(
      service.calculateMainArterialPressure({
        systolicPressure: 80,
        diastolicPressure: 60,
      })
    ).toEqual(66.67);
  });

  it('should return a decimal of 3 places', () => {
    expect(service.round(45.44444444, 3)).toEqual(45.444);
  });

  it('should return a decimal of -3 places', () => {
    expect(service.round(45.44444444, -2)).toEqual(0);
  });
});
