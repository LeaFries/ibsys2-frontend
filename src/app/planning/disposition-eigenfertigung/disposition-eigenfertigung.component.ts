import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { first, tap } from 'rxjs';
import { DialogOverviewComponent } from "../shared/dialog-overview/dialog-overview.component";
import { DispositionEigenfertigungArticleInput, DispositionEigenfertigungArticleResult, DispositionEigenfertigungResult } from "./disposition-eigenfertigung.model";
import { DispositionEigenfertigungService } from "./disposition-eigenfertigung.service";
import {DialogData} from "../shared/dialog-overview/dialog-overview.model";


@Component({
    selector: 'disposition-eigenfertigung',
    standalone: true,
    providers: [DispositionEigenfertigungService],
    imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MatTableModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule
    ],
    templateUrl: './disposition-eigenfertigung.component.html',
    styleUrls: ['disposition-eigenfertigung.component.scss']
})
export class DispositionEigenfertigungComponent {

    dispositionEigenfertigungResult: DispositionEigenfertigungResult[] = [];
    dispositionEigenfertigungArticlesP1: DispositionEigenfertigungArticleResult[] = []
    dispositionEigenfertigungArticlesP2: DispositionEigenfertigungArticleResult[] = [];
    dispositionEigenfertigungArticlesP3: DispositionEigenfertigungArticleResult[] = [];
    geplanterSicherheitsbestand: Map<number, number> = new Map<number, number>;
    zusaetzlicheProduktionauftraege: Map<number, number> = new Map<number, number>;

    displayedColumns = [
        'articleNumber',
        'vertriebswunsch',
        'warteschlange',
        'geplanterSicherheitsbestand',
        'lagerbestandEndeVorperiode',
        'auftraegeInWarteschlange',
        'auftraegeInBearbeitung',
        'zusaetzlicheProduktionsauftraege',
        'produktionFuerKommendePeriode'
    ]

    constructor(
        private readonly dispositionEigenfertigungService: DispositionEigenfertigungService,
        private readonly dialog: MatDialog
    ) { }

    // ngOnInit(): void {
    //     this.search();
    // }

    openDialog(header: string, body: string): void {
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            data: new DialogData(header, body)
        })
    }

    search() {
        this.dispositionEigenfertigungService.findAll()
            .pipe(
                first(),
                tap(result => {
                    this.dispositionEigenfertigungResult = result;
                    this.dispositionEigenfertigungArticlesP1 = this.dispositionEigenfertigungResult[0].articles;
                    this.dispositionEigenfertigungArticlesP2 = this.dispositionEigenfertigungResult[1].articles;
                    this.dispositionEigenfertigungArticlesP3 = this.dispositionEigenfertigungResult[2].articles;

                    if (
                        this.dispositionEigenfertigungArticlesP1.length == 0 ||
                        this.dispositionEigenfertigungArticlesP2.length == 0 ||
                        this.dispositionEigenfertigungArticlesP3.length == 0) {
                          this.openDialog("Disposition Eigenfertigung","Bitte erst das Planungstool mit der Result.xml befüllen");
                    }

                })
            )
            .subscribe()
    }

    setProperties(input: DispositionEigenfertigungArticleResult[]) {
        input.forEach(element => {
            if (
                element.geplanterSicherheitsbestand === null ||
                element.zusaetzlicheProduktionsauftraege === null
            ) {
                this.openDialog("Disposition Eigenfertigung","Bitte erst alle Felder ausfüllen!")
                throw new Error("Bitte erst alle Felder ausfüllen!");
            }
            if (this.geplanterSicherheitsbestand.has(element.articleNumber)) {
                let currentGelanterSicherheitsbestand: number = this.geplanterSicherheitsbestand.get(element.articleNumber)!
                this.geplanterSicherheitsbestand.set(element.articleNumber, element.geplanterSicherheitsbestand + currentGelanterSicherheitsbestand)
            } else {
                this.geplanterSicherheitsbestand.set(element.articleNumber, element.geplanterSicherheitsbestand)
            }

            if (this.zusaetzlicheProduktionauftraege.has(element.articleNumber)) {
                let currentZusaetzlicheProduktionsauftraege: number = this.zusaetzlicheProduktionauftraege.get(element.articleNumber)!
                this.zusaetzlicheProduktionauftraege.set(element.articleNumber, element.zusaetzlicheProduktionsauftraege + currentZusaetzlicheProduktionsauftraege)
            } else {
                this.zusaetzlicheProduktionauftraege.set(element.articleNumber, element.zusaetzlicheProduktionsauftraege);
            }

        })
    }

    create() {

        if (
            this.dispositionEigenfertigungArticlesP1.length == 0 ||
            this.dispositionEigenfertigungArticlesP2.length == 0 ||
            this.dispositionEigenfertigungArticlesP3.length == 0) {
            this.openDialog("Disposition Eigenfertigung","Bitte erst das Planungstool mit der Result.xml befüllen");
        }

        this.setProperties(this.dispositionEigenfertigungArticlesP1);
        this.setProperties(this.dispositionEigenfertigungArticlesP2);
        this.setProperties(this.dispositionEigenfertigungArticlesP3);

        let geplanterSicherheitsbestand = Object.fromEntries(this.geplanterSicherheitsbestand);
        let zuesaetzlicheProduktionsauftraege = Object.fromEntries(this.zusaetzlicheProduktionauftraege)

        let dispositionEigenfertigungArticleResult: DispositionEigenfertigungArticleInput = new DispositionEigenfertigungArticleInput(geplanterSicherheitsbestand, zuesaetzlicheProduktionsauftraege);
        console.log(dispositionEigenfertigungArticleResult)

        this.dispositionEigenfertigungService.plan(dispositionEigenfertigungArticleResult).subscribe(result => this.search());

        this.geplanterSicherheitsbestand.clear();
        this.zusaetzlicheProduktionauftraege.clear();

    }

}
