import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  csvToImport;
  success = true;

  constructor(private dialogRef: MatDialogRef<ImportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private fileService: FileService) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  handleCsvInput(files: FileList) {
      this.csvToImport = files.item(0);
      this.success = true;
  }

  onSubmit() {
    this.fileService.uploadCsv(this.csvToImport).subscribe(data => {
      this.success = true;
      this.close();
      window.location.reload();
    }, error => {
      this.success = false;
      console.log(error);
    });
  }
}
