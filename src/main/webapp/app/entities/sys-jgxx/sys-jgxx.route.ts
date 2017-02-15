import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { Sys_jgxxComponent } from './sys-jgxx.component';
import { Sys_jgxxDetailComponent } from './sys-jgxx-detail.component';
import { Sys_jgxxPopupComponent } from './sys-jgxx-dialog.component';
import { Sys_jgxxDeletePopupComponent } from './sys-jgxx-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class Sys_jgxxResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const sys_jgxxRoute: Routes = [
  {
    path: 'sys-jgxx',
    component: Sys_jgxxComponent,
    resolve: {
      'pagingParams': Sys_jgxxResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'meepoApp.sys_jgxx.home.title'
    }
  }, {
    path: 'sys-jgxx/:id',
    component: Sys_jgxxDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'meepoApp.sys_jgxx.home.title'
    }
  }
];

export const sys_jgxxPopupRoute: Routes = [
  {
    path: 'sys-jgxx-new',
    component: Sys_jgxxPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'meepoApp.sys_jgxx.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'sys-jgxx/:id/edit',
    component: Sys_jgxxPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'meepoApp.sys_jgxx.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'sys-jgxx/:id/delete',
    component: Sys_jgxxDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'meepoApp.sys_jgxx.home.title'
    },
    outlet: 'popup'
  }
];
