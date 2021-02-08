import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user/user';
import {UserFiles} from '../user-files/user-files';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';
  private userNameUrl = 'http://localhost:8080/api/username';
  private registerUrl = 'http://localhost:8080/api/register';

  constructor(private httpClient: HttpClient) {
  }

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`);
  }

  getUsersFileStats(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.baseUrl}/files/stats`);
  }

  getUsersAppStats(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.baseUrl}/apps/stats`);
  }

  getUsersFileListById(id: number): Observable<UserFiles[]> {
    return this.httpClient.get<UserFiles[]>(`${this.baseUrl}/${id}/files`);
  }

  checkIfUsernameExists(username: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.userNameUrl}/${username}`, {});
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.registerUrl}`, user);
  }
  createAppUser(appId: number, userId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/app/${appId}`, {});
  }

  deleteAppUser(appId: number, userId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${userId}/app/${appId}`);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getUsersListByAppId(appId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/apps/${appId}`);
  }
}
