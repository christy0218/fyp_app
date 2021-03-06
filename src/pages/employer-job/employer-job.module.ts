import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { EmployerJobPage } from './employer-job';

@NgModule({
  declarations: [
    EmployerJobPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployerJobPage),
    TranslateModule.forChild()
  ]
})
export class EmployerJobPageModule {}