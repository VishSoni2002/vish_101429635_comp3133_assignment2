import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  filteredEmployees: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'email', 'designation', 'actions'];
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.errorMessage = "";
    this.filteredEmployees = new MatTableDataSource();
    this.employeeService.getEmployees().subscribe(
      (employees: any[]) => {
        this.filteredEmployees = new MatTableDataSource(employees);
        if (employees.length == 0) {
          this.errorMessage = "No Data Found";
        }
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  applyFilter(event: Event): void {
    this.errorMessage = "";
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredEmployees.filter = filterValue;
    if (this.filteredEmployees.data.length == 0) {
      this.errorMessage = "No Data Found";
    }

  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employees/details', id]);
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe((res: any) => {
      this.toast.showToast(res);
      this.loadEmployees();
    }, (err: any) => {
      this.toast.showToast(err.message, 'danger');
    });
  }


}
