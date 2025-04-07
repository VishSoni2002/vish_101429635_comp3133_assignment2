
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;
  genders: string[] = ['Male', 'Female', 'Other'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private toast: ToastService
  ) {
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


  onSubmit(): void {
    if (this.employeeForm.valid) {

      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        (res) => {
          this.toast.showToast("Employee added successfully!")
          this.router.navigate(['/employees']);
        },
        (error) => this.toast.showToast(error.message, "danger")
      );
    }
  }
}