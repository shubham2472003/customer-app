import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list.component/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create.component/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit.component/customer-edit.component';
import { CustomerDetailsComponent } from './components/customer-details.component/customer-details.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
  },
  {
    path: 'create',
    component: CustomerCreateComponent,
  },
  {
    path: 'edit/:id',
    component: CustomerEditComponent,
    data: { renderMode: 'dynamic' }, // Correct way to disable prerendering
  },
  {
    path: 'details/:id',
    component: CustomerDetailsComponent,
    data: { renderMode: 'dynamic' }, // Correct way to disable prerendering
  },
];
