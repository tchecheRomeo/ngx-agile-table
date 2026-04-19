import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly API_URL = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  searchRepos(page: number, size: number, query?: string): Observable<any> {
    const searchTerm = query && query.trim() !== '' ? query.trim() : 'angular';

    const params = new HttpParams()
      .set('q', searchTerm)
      .set('page', page.toString())
      .set('per_page', size.toString());

    return this.http.get<any>(this.API_URL, { params }).pipe(
      map(res => ({
        data: res.items,
        total: res.total_count
      }))
    );
  }
}
