import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Sys_jgxx } from './sys-jgxx.model';
import { Sys_jgxxPopupService } from './sys-jgxx-popup.service';
import { Sys_jgxxService } from './sys-jgxx.service';

@Component({
    selector: 'jhi-sys-jgxx-delete-dialog',
    templateUrl: './sys-jgxx-delete-dialog.component.html'
})
export class Sys_jgxxDeleteDialogComponent {

    sys_jgxx: Sys_jgxx;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private sys_jgxxService: Sys_jgxxService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['sys_jgxx']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.sys_jgxxService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sys_jgxxListModification',
                content: 'Deleted an sys_jgxx'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sys-jgxx-delete-popup',
    template: ''
})
export class Sys_jgxxDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private sys_jgxxPopupService: Sys_jgxxPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.sys_jgxxPopupService
                .open(Sys_jgxxDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
