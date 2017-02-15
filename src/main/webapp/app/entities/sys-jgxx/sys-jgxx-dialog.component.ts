import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Sys_jgxx } from './sys-jgxx.model';
import { Sys_jgxxPopupService } from './sys-jgxx-popup.service';
import { Sys_jgxxService } from './sys-jgxx.service';
@Component({
    selector: 'jhi-sys-jgxx-dialog',
    templateUrl: './sys-jgxx-dialog.component.html'
})
export class Sys_jgxxDialogComponent implements OnInit {

    sys_jgxx: Sys_jgxx;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private sys_jgxxService: Sys_jgxxService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['sys_jgxx']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.sys_jgxx.id !== undefined) {
            this.sys_jgxxService.update(this.sys_jgxx)
                .subscribe((res: Sys_jgxx) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.sys_jgxxService.create(this.sys_jgxx)
                .subscribe((res: Sys_jgxx) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Sys_jgxx) {
        this.eventManager.broadcast({ name: 'sys_jgxxListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-sys-jgxx-popup',
    template: ''
})
export class Sys_jgxxPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private sys_jgxxPopupService: Sys_jgxxPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.sys_jgxxPopupService
                    .open(Sys_jgxxDialogComponent, params['id']);
            } else {
                this.modalRef = this.sys_jgxxPopupService
                    .open(Sys_jgxxDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
