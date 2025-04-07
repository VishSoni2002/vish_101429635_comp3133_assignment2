import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  genders: string[] = ['Male', 'Female', 'Other'];
  employeeId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private toast: ToastService,
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id') || ''; // Get the employee ID from the URL
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe((employee: any) => {
      this.employeeForm.patchValue({ ...employee, date_of_joining: new Date(Number(employee.date_of_joining)) });
    }, (err: any) => {
      this.toast.showToast(err.message, 'danger');
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(
        () => {
          this.toast.showToast('Employee data updated successfully!')
          this.router.navigate(['/employees']);
        },
        (err: any) => {
          this.toast.showToast(err.message, 'danger');
        }
      );
    }
  }
}
