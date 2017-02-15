import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sys_jgxx } from './sys-jgxx.model';
import { Sys_jgxxService } from './sys-jgxx.service';
@Injectable()
export class Sys_jgxxPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private sys_jgxxService: Sys_jgxxService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.sys_jgxxService.find(id).subscribe(sys_jgxx => {
                this.sys_jgxxModalRef(component, sys_jgxx);
            });
        } else {
            return this.sys_jgxxModalRef(component, new Sys_jgxx());
        }
    }

    sys_jgxxModalRef(component: Component, sys_jgxx: Sys_jgxx): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sys_jgxx = sys_jgxx;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
