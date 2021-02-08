import {Component, OnInit} from '@angular/core';
import {FileService} from '../../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../user/user';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  fileToUpload: File = null;
  appId: number;
  userId: number;
  userList: User[] = [];

  constructor(private fileService: FileService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  ngOnInit(): void {
    this.appId = this.route.snapshot.params.appId;
    this.userId = this.route.snapshot.params.userId;
    console.log(this.appId, this.userId);
  }

  onSubmit() {
    if (this.userId == undefined){
      this.uploadToAllUsers();
    }
    else {
      this.uploadToUserById(this.userId);
    }
  }

  private goToUsersList() {
    this.router.navigate(['users']);
  }

  private uploadToAllUsers() {
    this.userService.getUsersListByAppId(this.appId).subscribe(data => {
      this.userList = data;
    }, error => {
      console.log(error);
    });

    for (const user of this.userList) {
      this.fileService.uploadFile(this.fileToUpload, user.id, this.appId).subscribe(data => {
          this.goToUsersList();
        },
        error => {
          console.log(error);
        });
    }
  }

  private uploadToUserById(userId: number) {
    this.fileService.uploadFile(this.fileToUpload, userId, this.appId).subscribe(data => {
        this.goToUsersList();
      },
      error => {
        console.log(error);
      });
  }

}
