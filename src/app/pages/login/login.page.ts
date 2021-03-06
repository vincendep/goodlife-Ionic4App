import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Account, UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    private loginFormModel: FormGroup;
    private loginTitle: string;
    private loginSubTitle: string;

    constructor(private formBuilder: FormBuilder,
                private alertController: AlertController,
                private translateService: TranslateService,
                private navController: NavController,
                private utenteService: UtenteService) {
    }

    ngOnInit() {
        this.loginFormModel = this.formBuilder.group({
            username: ['andrea@pagliarini.com', Validators.compose([
                Validators.required
            ])],
            password: ['andrea', Validators.compose([
                Validators.required
            ])]
        });
        this.iniziaTraduzione();
    }

    onLogin() {
        const account: Account = this.loginFormModel.value;
        this.utenteService.login(account).subscribe(() => {
                this.loginFormModel.reset();
                this.navController.navigateRoot('tabs');
            },
            (err: HttpErrorResponse) => {
                if (err.status === 401) {
                    console.error('login request error: ' + err.status);
                    this.mostraErroreLogin();
                }
            });
    }

    async mostraErroreLogin() {
        const alert = await this.alertController.create({
            header: this.loginTitle,
            message: this.loginSubTitle,
            buttons: ['OK']
        });

        await alert.present();
    }


    private iniziaTraduzione() {
        this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
            this.loginSubTitle = data;
        });
        this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
            this.loginTitle = data;
        });
    }
}
