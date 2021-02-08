import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  appId: number;
  imageToUpload: any;
  action: string;
  imageId: number;

  constructor(private dialogRef: MatDialogRef<UploadImageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.appId = this.data.appId;
    this.action = this.data.action;
    this.imageId = this.data.imageId;
  }

  handleImageInput(files: FileList) {
      this.imageToUpload = files.item(0);
    }

  onSubmit() {
    if (this.action === 'add'){
      this.fileService.uploadImage(this.imageToUpload, this.appId).subscribe(data => {
        console.log(data);
        this.close();
      }, error => {
        console.log(error);
      });
    } else if (this.action === 'edit'){
      this.fileService.editImageById(this.imageToUpload, this.imageId).subscribe(data => {
        console.log(data);
        this.close();
      }, error => {
        console.log(error);
      });
    }
  }

   close() {
    this.dialogRef.close();
  }
}
