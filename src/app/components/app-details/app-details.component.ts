import {Component, OnInit} from '@angular/core';
import {App} from '../../app/app';
import {AppService} from '../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {AppLocation} from '../../app-location/app-location';
import {AppImageData} from '../../app-image-data/app-image-data';
import {FileService} from '../../services/file.service';
import {UploadImageComponent} from '../upload-image/upload-image.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateAppLocationComponent} from '../create-app-location/create-app-location.component';
import {LoginService} from '../../services/login.service';
import {EditAppLocationComponent} from '../edit-app-location/edit-app-location.component';


@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {
  id: number;
  app: App = new App();
  // appLocation: AppLocation = new AppLocation();
  appLocations: AppLocation[];
  appImages: AppImageData[];
  deleted: Map<number, boolean> = new Map();
  selectedImage: AppImageData = new AppImageData();




  constructor(private appService: AppService,
              private fileService: FileService,
              private route: ActivatedRoute,
              public loginService: LoginService,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    this.appService.getAppById(this.id).subscribe(data => {
      this.app = data;
    }, error => {
      console.log(error);
    });
    this.appService.getAppLocations(this.id).subscribe(data => {
      this.appLocations = data;
      this.appLocations.sort( (a,b) => (a.id < b.id ? -1 : 1));
    }, error => {
      console.log(error);
    });
    this.appService.getAppImagesById(this.id).subscribe(data => {
      this.appImages = data;
      this.appImages.sort( (a,b) => (a.id < b.id ? -1 : 1));
      data.forEach(value => this.deleted.set(value.id, false));
      // this.deleted.set(-1, false)
    }, error => {
      console.log(error);
    });
  }

  onImageChange(image: AppImageData) {
    this.selectedImage = image;
    console.log(this.selectedImage);
  }

  deleteImage(selectedImage: AppImageData) {
    this.fileService.deleteImageById(selectedImage.id).subscribe(data => {
      console.log(data);
      this.deleted.set(selectedImage.id, true);
      console.log(this.deleted);
      // this.selectedImage.id = 0;
    }, error => {}); // TODO napis no images wtedy czy cos jak nic niema

  }

  editImage(selectedImage: AppImageData) {
    this.dialog.afterAllClosed.subscribe(data => {
      this.appService.getAppImagesById(this.id).subscribe(data => {
        this.appImages = data;
        this.appImages.sort( (a,b) => (a.id < b.id ? -1 : 1));
        data.forEach(value => this.deleted.set(value.id, false));
      }, error => {
        console.log(error);
      });
    });
    this.dialog.open(UploadImageComponent, {data: {action: 'edit', imageId: selectedImage.id}});
  }

  createAppLocation(appId: number) {
    this.dialog.afterAllClosed.subscribe(data => {
      this.appService.getAppLocations(this.id).subscribe(data => {
        this.appLocations = data;
      }, error => {
        console.log(error);
      });
    });
    this.dialog.open(CreateAppLocationComponent, {data: {appId}});
  }

  deleteAppLocation(id: number) {
    this.appService.deleteAppLocation(id).subscribe(data => {
      console.log(data);
      this.appLocations = this.appLocations.filter(item => item.id !== id);
    }, error => {console.log(error); });

  }

  editAppLocation(id: number) {
    this.dialog.afterAllClosed.subscribe(data => {
      this.appService.getAppLocations(this.id).subscribe(data => {
        this.appLocations = data;
        this.appLocations.sort( (a,b) => (a.id < b.id ? -1 : 1));
      }, error => {
        console.log(error);
      });
    });
    this.dialog.open(EditAppLocationComponent, {data: {id}});
  }
}
