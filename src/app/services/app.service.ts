import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {App} from '../app/app';
import {AppLocation} from '../app-location/app-location';
import {AppImageData} from '../app-image-data/app-image-data';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:8080/api/apps';

  constructor(private httpClient: HttpClient) {
  }

  getAppsList(): Observable<App[]> {
    return this.httpClient.get<App[]>(`${this.baseUrl}`);
  }

  getAppsImageStats(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.baseUrl}/images/stats`);
  }

  createApp(app: App): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, app);
  }

  getAppById(id: number): Observable<App> {
    return this.httpClient.get<App>(`${this.baseUrl}/${id}`);
  }

  updateApp(id: number, app: App): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, app);
  }

  deleteApp(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getAppLocations(id: number): Observable<AppLocation[]> {
    return this.httpClient.get<AppLocation[]>(`${this.baseUrl}/${id}/location`);
  }

  getAppLocation(id: number, locId: number): Observable<AppLocation> {
    return this.httpClient.get<AppLocation>(`${this.baseUrl}/location/${locId}`);
  }

// /apps/{appId}/location/{locId}")
  updateAppLocation(appLocation: AppLocation): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/location/${appLocation.id}`, appLocation);
  }

  deleteAppLocation(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/location/${id}`);
  }

  createAppLocation(id: number, appLocation: AppLocation): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${id}/location`, appLocation);
  }

  getAppsByUserId(userId: number): Observable<App[]> {
    return this.httpClient.get<App[]>(`${this.baseUrl}/users/${userId}`);
  }

  getAppImagesById(id: number): Observable<AppImageData[]> {
    return this.httpClient.get<AppImageData[]>(`${this.baseUrl}/${id}/images`);
  }


}
