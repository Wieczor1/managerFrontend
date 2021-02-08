import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserFiles} from '../user-files/user-files';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080/api/files';

  constructor(private httpClient: HttpClient) {
  }

  uploadFile(fileToUpload: File, userId: number, appId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(`${this.baseUrl}/user/${userId}/app/${appId}`, formData);
  }

  uploadImage(imageToUpload: File, appId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', imageToUpload, imageToUpload.name);
    return this.httpClient.post(`${this.baseUrl}/images/app/${appId}`, formData);
  }
  uploadCsv(csvToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', csvToUpload, csvToUpload.name);
    return this.httpClient.post(`${this.baseUrl}/import`, formData);
  }
  deleteImageById(imageId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/images/${imageId}`);
  }

  editImageById(imageToUpload: File, imageId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', imageToUpload, imageToUpload.name);
    return this.httpClient.put(`${this.baseUrl}/images/${imageId}`, formData);
  }

  deleteFileByUserIdAndAppId(userId: number, app, fileId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/user/${userId}/app/${app.id}/file/${fileId}`);
  }

  getFileExtensionsStats(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/stats`);
  }

  exportDataUrl(): string {
    return this.baseUrl + '/export';
  }

  getFiles(): Observable<UserFiles[]>{
    return this.httpClient.get<UserFiles[]>(`${this.baseUrl}`);
  }
}
