import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {User} from '../../user/user';
import {App} from '../../app/app';
import {UserService} from '../../services/user.service';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserFiles} from '../../user-files/user-files';
import {FileService} from '../../services/file.service';
import {FilenameExistsPipe} from '../../pipes/filename-exists.pipe';

@Component({
  selector: 'app-files-table',
  templateUrl: './files-table.component.html',
  styleUrls: ['./files-table.component.scss']
})
export class FilesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UserFiles>;
  dataSource = new MatTableDataSource<UserFiles>();
  data: UserFiles[];



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['filename', 'actions'];
  isLoading = true;
  filenameExists: boolean = false;
  constructor(private fileService: FileService,
              private router: Router,
              private dialog: MatDialog,
              private pipe: FilenameExistsPipe) {
  }


  ngOnInit(): void {

    this.getUserFiles();
  }

  private getUserFiles() {
    this.fileService.getFiles().subscribe(data => {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.data = data;
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  check(file, event) {
     this.filenameExists = this.pipe.transform(file.filename);
     console.log(file.filename + ' ' + this.filenameExists);
     if (!this.filenameExists) {
       event.preventDefault();
     }
  }
}
