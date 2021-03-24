import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chem } from '../shared/models/chem.model';

@Injectable()
export class ChemService {

  constructor(private http: HttpClient) { }

  getChems(): Observable<Chem[]> {
    return this.http.get<Chem[]>('/api/chems');
  }

  countChems(): Observable<number> {
    return this.http.get<number>('/api/chems/count');
  }

  addChem(chem: Chem): Observable<Chem> {
    return this.http.post<Chem>('/api/chem', chem);
  }

  getChem(chem: Chem): Observable<Chem> {
    return this.http.get<Chem>(`/api/chem/${chem._id}`);
  }

  editChem(chem: Chem): Observable<any> {
    return this.http.put(`/api/chem/${chem._id}`, chem, { responseType: 'text' });
  }

  deleteChem(chem: Chem): Observable<any> {
    return this.http.delete(`/api/chem/${chem._id}`, { responseType: 'text' });
  }

}
