import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MeepoSys_jgxxModule } from './sys-jgxx/sys-jgxx.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MeepoSys_jgxxModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeepoEntityModule {}
