import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-impostazioni',
    templateUrl: './impostazioni.page.html',
    styleUrls: ['./impostazioni.page.scss'],
})
export class ImpostazioniPage implements OnInit {

    private profiloFormModel: FormGroup;
    private lingue: Lingua[];


    constructor(private linguaService: LinguaService,
                private translateService: TranslateService,
                private formBuilder: FormBuilder,
                private navController: NavController) {
    }

    ngOnInit() {
        this.lingue = this.linguaService.getLingue();
        this.profiloFormModel = this.formBuilder.group({
            linguaPreferita: ['', Validators.compose([
                Validators.required
            ])]
        });

        this.linguaService.getLinguaAttuale().subscribe((lingua) => {
            this.profiloFormModel.patchValue({linguaPreferita: lingua});
        });
    }

    cambioLingua(): void {
        if (this.profiloFormModel.value.linguaPreferita !== '') {
            this.linguaService.updateLingua(this.profiloFormModel.value.linguaPreferita);
            this.translateService.use(this.profiloFormModel.value.linguaPreferita);
        }
    }

    indietro() {
        this.navController.navigateRoot('tabs/profilo');
    }
}
