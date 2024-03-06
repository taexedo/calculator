import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import {HomeComponent} from "./home/home.component";
import {TaskInformationComponent} from "./task-information/task-information.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'information', component: TaskInformationComponent },
];
