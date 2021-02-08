import {Component, Inject, OnInit} from '@angular/core';
import {AppLocation} from '../../app-location/app-location';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AppService} from '../../services/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-app-location',
  templateUrl: './edit-app-location.component.html',
  styleUrls: ['./edit-app-location.component.scss']
})
export class EditAppLocationComponent implements OnInit {
  appLocation: AppLocation = new AppLocation();
  appId: number;
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditAppLocationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.appId = this.data.appId;
    console.log(this.data.id, "id")
    this.appService.getAppLocation(this.appId, this.data.id).subscribe(data => {
      this.appLocation = data;
      this.form = new FormGroup({
        city: new FormControl(this.appLocation.city, [Validators.required]),
        country: new FormControl(this.appLocation.country, [Validators.required]),
        street: new FormControl(this.appLocation.street, [Validators.required]),
        streetNumber: new FormControl(this.appLocation.streetNumber, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      });
    }, error => {
      console.log(error);
    });

  }

  get country() { return this.form.get('country'); }
  get city() { return this.form.get('city'); }
  get street() { return this.form.get('street'); }
  get streetNumber() { return this.form.get('streetNumber'); }
  // todo dodanie tych samych plikow sie wyjebie, dodaj jakis numer do nazwy, delete dialgo czy na pewno
  onSubmit() { // TODO zwaliduj wszystkie  zmiana na postgresa i deploy, KOLOS, zabawa z frontem
    this.appLocation.country = this.form.value.country;
    this.appLocation.city = this.form.value.city;
    this.appLocation.street = this.form.value.street;
    this.appLocation.streetNumber = this.form.value.streetNumber;
    console.log(this.appLocation, 'datavdfrdf')
    this.appService.updateAppLocation(this.appLocation).subscribe(data => {
      this.close();
    }, error => {
      console.log(error);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
