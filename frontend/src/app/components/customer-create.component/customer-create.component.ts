import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../services/customer';
import { CommonModule } from '@angular/common'; // <-- IMPORT THIS

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [
    CommonModule,            // <-- add this for *ngIf, *ngFor, etc.
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'], // <-- fix typo (styleUrls instead of styleUrl)
})
export class CustomerCreateComponent implements OnInit {
  private customerService = inject(CustomerService);

  form!: FormGroup;
  router = inject(Router);

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.customerService.post(this.form.value).subscribe(
        (data) => {
          console.log('data posted');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('error:', error);
        }
      );
    }
  }
}

