import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Sys_jgxx } from './sys-jgxx.model';
import { Sys_jgxxService } from './sys-jgxx.service';

@Component({
    selector: 'jhi-sys-jgxx-detail',
    templateUrl: './sys-jgxx-detail.component.html'
})
export class Sys_jgxxDetailComponent implements OnInit, OnDestroy {

    sys_jgxx: Sys_jgxx;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private sys_jgxxService: Sys_jgxxService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['sys_jgxx']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.sys_jgxxService.find(id).subscribe(sys_jgxx => {
            this.sys_jgxx = sys_jgxx;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
