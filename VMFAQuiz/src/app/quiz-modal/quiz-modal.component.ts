import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { QuestionModalComponent } from "../question-modal/question-modal.component";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: 'ns-quiz-modal',
    templateUrl: './quiz-modal.component.html',
    styleUrls: ['./quiz-modal.component.css']
})
export class QuizModalComponent {

    public quiz: Array<any>;
    public input: any;
    private database: any;


    public constructor(private modalDialogParams: ModalDialogParams, private params: ModalDialogParams, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
        this.input =
        {
            "name": "",
            "description": ""
        };

        (new Sqlite("quiz.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS quiz ( id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_name TEXT, quiz_description TEXT);")
                .then(id => {
                    this.database = db;
                }, error => {
                    console.log("TABLE CREATE ERROR: ", error);
                });
        }, error => {
            console.log("DB Error: ", error);
        });
        console.log("CONST ID")
    }

    public insert() {
        this.database.execSQL("INSERT INTO quiz (quiz_name, quiz_description) VALUES (?, ?);", [this.input.name, this.input.description]).then(id => {

            // this.fetch();
            console.log("quiz Inserted!");
        }, error => {
            console.log("INSERT ERROR: ", error);
        });

        this.onCloseButtonTap();
    }
    public make() {

        this.database.execSQL("CREATE TABLE IF NOT EXISTS quiz ( id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_name TEXT, quiz_description TEXT);")
            .then(id => {
                // this.fetch();
                console.log("remade and fetched!")
            }, error => {
                console.log("RECREATE ERROR: ", error);
            });
    }

    public quizFetch() {
        this.quiz = [];
        this.database.all("SELECT * FROM quiz").then(rows => {
            this.quiz = [];
            for (let row in rows) {
                this.quiz.push({
                    "id": rows[row][0],
                    "quiz_name": rows[row][1],
                    "quiz_description": rows[row][2],

                })
            }
            console.log(this.quiz);
        }, error => {
            console.log("FETCH ERROR: ", error);

        });
    }

    public reset() {
        this.database.execSQL("DROP TABLE quiz;").then(id => {

            console.log("table dropped!");
            // this.fetch();
        }, error => {
            console.log("DROP ERROR: ", error);

        })

        this.make()
    }

    public showQuestionModal() {

        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(QuestionModalComponent, options).then(res => {
            console.log(res);
            res;
        });

    }



    public onCloseButtonTap() {
        this.modalDialogParams.closeCallback();
    }

}
