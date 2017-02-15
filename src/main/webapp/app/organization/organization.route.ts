import { Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../shared';

// import {
//     activateRoute,
//     passwordRoute,
//     passwordResetFinishRoute,
//     passwordResetInitRoute,
//     registerRoute,
//     sessionsRoute,
//     settingsRoute
// } from './';

let ORG_ROUTES = [
   // activateRoute,
   // passwordRoute,
   // passwordResetFinishRoute,
   // passwordResetInitRoute,
   // registerRoute,
   // sessionsRoute,
   // settingsRoute
];

export const orgState: Routes = [{
    path: '',
    children: ORG_ROUTES
}];
