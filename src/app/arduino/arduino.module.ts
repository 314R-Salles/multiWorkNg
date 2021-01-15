import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ArduinoSetupComponent} from './arduino-setup/arduino-setup.component';
import {ArduinoInteractComponent} from './arduino-interact/arduino-interact.component';
import {StoreModule} from '@ngrx/store';
import {arduinoReducer} from './arduino-store/arduino.reducer';
import {ArduinoStoreService} from './arduino-store/arduino-store.service';


const appRoutes: Routes = [
  {path: 'setup', component: ArduinoSetupComponent},
  {path: 'interact', component: ArduinoInteractComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
    StoreModule.forFeature('arduino', arduinoReducer)
  ],
  declarations: [
    ArduinoSetupComponent,
    ArduinoInteractComponent,
  ],
  providers: [
    ArduinoStoreService,
  ]
})
export class ArduinoModule {
}
