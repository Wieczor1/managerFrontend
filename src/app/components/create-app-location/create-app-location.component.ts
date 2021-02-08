import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AppLocation} from '../../app-location/app-location';
import {AppService} from '../../services/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-app-location',
  templateUrl: './create-app-location.component.html',
  styleUrls: ['./create-app-location.component.scss']
})
export class CreateAppLocationComponent implements OnInit {
  appLocation: AppLocation = new AppLocation();
  appId: number;
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateAppLocationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.appId = this.data.appId;
    this.form = new FormGroup({
      city: new FormControl(this.appLocation.city, [Validators.required]),
      country: new FormControl(this.appLocation.country, [Validators.required]),
      street: new FormControl(this.appLocation.street, [Validators.required]),
      streetNumber: new FormControl(this.appLocation.streetNumber, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
    });
  }

  get country() { return this.form.get('country'); }
  get city() { return this.form.get('city'); }
  get street() { return this.form.get('street'); }
  get streetNumber() { return this.form.get('streetNumber'); }

  onSubmit() {
    this.appLocation.country = this.form.value.country;
    this.appLocation.city = this.form.value.city;
    this.appLocation.street = this.form.value.street;
    this.appLocation.streetNumber = this.form.value.streetNumber;
    this.appService.createAppLocation(this.appId, this.appLocation).subscribe(data => {
      this.close();
    }, error => {
      console.log(error);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
