import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  formEmployee: Employee = this.getEmptyEmployee();

  ngOnInit(): void {
    if (this.employee) {
      this.formEmployee = { ...this.employee };
    }
  }

  ngOnChanges(): void {
    if (this.employee) {
      this.formEmployee = { ...this.employee };
    } else {
      this.formEmployee = this.getEmptyEmployee();
    }
  }

  submitForm(): void {
    this.save.emit(this.formEmployee);
  }

  cancelForm(): void {
    this.cancel.emit();
  }

  private getEmptyEmployee(): Employee {
    return {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      salary: ''
    };
  }
}
