import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

var Sqlite = require("nativescript-sqlite");
const AS = require("tns-core-modules/application-settings");

@Component({
  selector: 'ns-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent implements OnInit {

  public qForm: Array<any>;
  public questions: Array<any>;
  public qCount: Array<any>;;
  public input: any;
  private database: any;

  constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef) {
    this.qCount = [];
    this.questions = [];

    this.input = {
      "question": "",
      "answer1": "",
      "answer2": "",
      "answer3": "",
      "answer4": "",
      "switch1": false,
      "switch2": false,
      "switch3": false,
      "switch4": false,
    };

    (new Sqlite("quiz.db")).then(db => {
      db.execSQL("PRAGMA foreign_keys = ON;")
      .then(id => {
          console.log("FK ON")!
      });
        db.execSQL("CREATE TABLE IF NOT EXISTS questions ( id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer1 TEXT, answer2 TEXT, answer3 TEXT, answer4 TEXT);")
            .then(id => {
                this.database = db;
                this.fetch();
                console.log("QUESTIONS TABLE ON")
            }, error => {
                console.log("TABLE CREATE ERROR: ", error);
            });
    }, error => {
        console.log("DB Error: ", error);
    });
  }

  



  ngOnInit(): void {
  }


  public insert() {
    console.log("INSERT START")
    this.database.execSQL("INSERT INTO questions (question, answer1, answer2, answer3, answer4) VALUES (?, ?, ?, ?, ?);", [this.input.question, this.input.answer1, this.input.answer2, this.input.answer3, this.input.answer4]).then(id => {
  
        this.fetch();
        console.log("question Inserted!");
    }, error => {
        console.log("INSERT ERROR: ", error);
        console.log( this.questions)
    });
  }

  public fetch() {
    this.database.all("SELECT * FROM questions").then(rows => {
        this.questions = [];
        for (let row in rows) {
            this.questions.push({
                "id": rows[row][0],
                "question": rows[row][1],
                "answer1": rows[row][2],
                "answer2": rows[row][3],
                "answer3": rows[row][4],
                "answer4": rows[row][5],
            })
        }
        console.log(this.questions);
    }, error => {
        console.log("FETCH ERROR: ", error);
  
    });
  }


  public make() {

    this.database.execSQL("CREATE TABLE IF NOT EXISTS questions ( id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer1 TEXT, answer2 TEXT, answer3 TEXT, answer4 TEXT);")
        .then(id => {
            this.fetch();
            console.log("remade and fetched!")
        }, error => {
            console.log("RECREATE ERROR: ", error);
        });
  }

  public reset() {
    this.database.execSQL("DROP TABLE questions;").then(id => {
  
        console.log("table dropped!");
        this.fetch();
    }, error => {
        console.log("DROP ERROR: ", error);
  
    })
  
    this.make()
  }





  public saveQuestion() {

      AS.setString("question", this.input.question);
      AS.setString("answer1", this.input.answer1);
      AS.setString("answer2", this.input.answer2);
      AS.setString("answer3", this.input.answer3);
      AS.setString("answer4", this.input.answer4);


    this.addQuestion()
  }

  public addQuestion() {

    this.questions.push(
      {
        "question": AS.getString("question"),
        "answer1": AS.getString("answer1"),
        "answer2": AS.getString("answer2"),
        "answer3": AS.getString("answer3"),
        "answer4": AS.getString("answer4"),
      });

    // console.log(this.questions)
  }

}
