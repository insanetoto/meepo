import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MeepoSharedModule } from '../../shared';

import {
    Sys_jgxxService,
    Sys_jgxxPopupService,
    Sys_jgxxComponent,
    Sys_jgxxDetailComponent,
    Sys_jgxxDialogComponent,
    Sys_jgxxPopupComponent,
    Sys_jgxxDeletePopupComponent,
    Sys_jgxxDeleteDialogComponent,
    sys_jgxxRoute,
    sys_jgxxPopupRoute,
    Sys_jgxxResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...sys_jgxxRoute,
    ...sys_jgxxPopupRoute,
];

@NgModule({
    imports: [
        MeepoSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        Sys_jgxxComponent,
        Sys_jgxxDetailComponent,
        Sys_jgxxDialogComponent,
        Sys_jgxxDeleteDialogComponent,
        Sys_jgxxPopupComponent,
        Sys_jgxxDeletePopupComponent,
    ],
    entryComponents: [
        Sys_jgxxComponent,
        Sys_jgxxDialogComponent,
        Sys_jgxxPopupComponent,
        Sys_jgxxDeleteDialogComponent,
        Sys_jgxxDeletePopupComponent,
    ],
    providers: [
        Sys_jgxxService,
        Sys_jgxxPopupService,
        Sys_jgxxResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeepoSys_jgxxModule {}
