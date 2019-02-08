import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeoscapeComponent} from './geoscape/geoscape.component';

const routes: Routes = [
    {
        path: '',
        component: GeoscapeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
