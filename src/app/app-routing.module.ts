import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClothingsComponent } from './components/clothings/clothings.component';

const routes: Routes = [
{path:'', redirectTo:'clothings', pathMatch:'full'},
{path:'clothings', component:ClothingsComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
