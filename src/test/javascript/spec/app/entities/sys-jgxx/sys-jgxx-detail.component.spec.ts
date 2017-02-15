import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { Sys_jgxxDetailComponent } from '../../../../../../main/webapp/app/entities/sys-jgxx/sys-jgxx-detail.component';
import { Sys_jgxxService } from '../../../../../../main/webapp/app/entities/sys-jgxx/sys-jgxx.service';
import { Sys_jgxx } from '../../../../../../main/webapp/app/entities/sys-jgxx/sys-jgxx.model';

describe('Component Tests', () => {

    describe('Sys_jgxx Management Detail Component', () => {
        let comp: Sys_jgxxDetailComponent;
        let fixture: ComponentFixture<Sys_jgxxDetailComponent>;
        let service: Sys_jgxxService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [Sys_jgxxDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    Sys_jgxxService
                ]
            }).overrideComponent(Sys_jgxxDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Sys_jgxxDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Sys_jgxxService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Sys_jgxx(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sys_jgxx).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
