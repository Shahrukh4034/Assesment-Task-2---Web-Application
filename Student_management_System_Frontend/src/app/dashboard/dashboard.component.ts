import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { StudentService } from '../student.service'; 
import { Student } from '../student.model';
import { map, startWith } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private service = inject(StudentService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  userName: string = 'Admin User';
  currentTab: string = 'dashboard'; 
  isModalOpen = false;
  isEditMode = false;
  selectedStudentId: number | null = null;
  
  currentPage = 1;
  pageSize = 5;
  searchTerm$ = new BehaviorSubject<string>('');
  courses: string[] = ['MCA', 'B.Tech', 'BCA', 'M.Tech', 'BCS'];

  // KEY FIX: Using 'createdDate' to match your Student model exactly
  studentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    course: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
    createdDate: [new Date().toISOString().split('T')[0], Validators.required]
  });

  paginatedStudents$ = combineLatest([
    this.service.students$, 
    this.searchTerm$.pipe(startWith(''))
  ]).pipe(
    map(([students, term]) => {
      const filtered = students.filter(s => 
        s.name.toLowerCase().includes(term.toLowerCase()) || 
        s.email.toLowerCase().includes(term.toLowerCase()) ||
        s.course.toLowerCase().includes(term.toLowerCase())
      );
      const start = (this.currentPage - 1) * this.pageSize;
      return filtered.slice(start, start + this.pageSize);
    })
  );

  ngOnInit() {
    const storedName = localStorage.getItem('userName');
    if (storedName) this.userName = storedName;
    this.service.refreshStudents();
  }

  changeTab(tab: string) { this.currentTab = tab; }

  onLogout() {
    if(confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.router.navigate(['/login']);
    }
  }

  saveStudent() {
    if (this.studentForm.valid) {
      const data = this.studentForm.value;
      const request$ = (this.isEditMode && this.selectedStudentId)
        ? this.service.updateStudent(this.selectedStudentId, data)
        : this.service.addStudent(data);

      request$.subscribe({
        next: () => this.closeModal(),
        error: (err) => alert(err.error?.message || 'Operation failed')
      });
    }
  }
  updateProfile() {
    if (this.userName.trim()) {
      localStorage.setItem('userName', this.userName);
      alert('Profile Updated Successfully!');
    }
  }

  removeStudent(id: number) { 
    if(confirm('Delete this record?')) {
      this.service.deleteStudent(id).subscribe({
        next: () => console.log('Deleted'),
        error: () => alert('Delete failed')
      }); 
    }
  }

  viewStudent(student: Student) {
    alert(`Details:\nName: ${student.name}\nAge: ${student.age}\nEmail: ${student.email}`);
  }

  openCreateModal() { this.openModal(); }
  editStudent(student: Student) { this.openModal(student); }

  openModal(student?: Student) {
    this.isModalOpen = true;
    if (student) {
      this.isEditMode = true;
      this.selectedStudentId = student.id;

      // FIX: Format date to YYYY-MM-DD so the <input type="date"> can read it
      const formattedDate = student.createdDate ? new Date(student.createdDate).toISOString().split('T')[0] : '';
      
      this.studentForm.patchValue({
        ...student,
        createdDate: formattedDate
      });
    } else {
      this.isEditMode = false;
      this.selectedStudentId = null;
      this.studentForm.reset({ 
        createdDate: new Date().toISOString().split('T')[0],
        course: '',
        age: ''
      });
    }
  }

  closeModal() { 
    this.isModalOpen = false; 
    this.studentForm.reset(); 
  }

  onSearch(event: any) { 
    this.searchTerm$.next(event.target.value); 
    this.currentPage = 1; 
  }

  changePage(delta: number) { this.currentPage += delta; }
}