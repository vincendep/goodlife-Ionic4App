import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PreferitiPage} from './preferiti.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: PreferitiPage,
        children: [
            {
                path: 'alimenti',
                children: [
                    {
                        path: '',
                        loadChildren: '../alimenti/alimenti.module#AlimentiPageModule'
                    }
                ]
            },
            {
                path: 'ricette',
                children: [
                    {
                        path: '',
                        loadChildren: '../ricette/ricette.module#RicettePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/preferiti/alimenti',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild()
    ],
    declarations: [PreferitiPage]
})
export class PreferitiPageModule {
}
