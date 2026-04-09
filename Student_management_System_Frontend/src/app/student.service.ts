import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);
private apiUrl = 'https://localhost:7050/api/students';
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  refreshStudents(): void {
    this.http.get<Student[]>(this.apiUrl, { headers: this.getHeaders() })
      .subscribe(data => this.studentsSubject.next(data));
  }

  addStudent(student: Student): Observable<any> {
    return this.http.post(this.apiUrl, student, { headers: this.getHeaders() })
      .pipe(tap(() => this.refreshStudents()));
  }

  updateStudent(id: number, student: Student): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student, { headers: this.getHeaders() })
      .pipe(tap(() => this.refreshStudents()));
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(tap(() => this.refreshStudents()));
  }
}