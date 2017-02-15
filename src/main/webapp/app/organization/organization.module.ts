import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MeepoSharedModule } from '../shared';

// import {
//     Register,
//     Activate,
//     Password,
//     PasswordResetInit,
//     PasswordResetFinish,
//     SessionsService,
//     SessionsComponent,
//     PasswordStrengthBarComponent,
//     RegisterComponent,
//     ActivateComponent,
//     PasswordComponent,
//     PasswordResetInitComponent,
//     PasswordResetFinishComponent,
//     SettingsComponent,
//     accountState
// } from './';

let orgState = [

];

@NgModule({
    imports: [
        MeepoSharedModule,
        RouterModule.forRoot(orgState, { useHash: true })
    ],
    declarations: [
        // ActivateComponent,
        // RegisterComponent,
        // PasswordComponent,
        // PasswordStrengthBarComponent,
        // PasswordResetInitComponent,
        // PasswordResetFinishComponent,
        // SessionsComponent,
        // SettingsComponent
    ],
    providers: [
        // SessionsService,
        // Register,
        // Activate,
        // Password,
        // PasswordResetInit,
        // PasswordResetFinish
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeepoOrganizationModule {}
