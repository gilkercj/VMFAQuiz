import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { QuizModalComponent } from "../quiz-modal/quiz-modal.component";


var Sqlite = require("nativescript-sqlite");

@Component({
  selector: 'ns-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  private database: any;
  public users: Array<any>;
    public topics: Array<any>;
  public data: String;

  public constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef) {

      this.users = [];

      (new Sqlite("quiz.db")).then(db => {
        db.execSQL("PRAGMA foreign_keys = ON;")
        .then(id => {
            console.log("FK ON")!
        });
          db.execSQL("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT, score INTEGER );")
              .then(id => {
                  this.database = db;
                  this.fetch();
                  this.topicsFetch();
              }, error => {
                  console.log("table create error", error);
              });
      }, error => {
          console.log("DB Error: ", error);
      });
  }

  public showQuizModal() {

        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(QuizModalComponent, options).then(res => {
            console.log(res);
            res;
        });
    }

    

  public fetch() {
    this.database.all(`SELECT * FROM users ;`).then(rows => {
        this.users = [];
        for (let row in rows) {
            this.users.push({
                "id": rows[row][0],
                "username": rows[row][1],
                "password": rows[row][2],
                "score": rows[row][3],
            })
        }
        console.log(this.data);
    }, error => {
        console.log("FETCH ERROR: ", error);

    });
}
public topicsFetch() {
    this.topics = [];
    this.database.all("SELECT * FROM topics").then(rows => {
        this.topics = [];
        for (let row in rows) {
            this.topics.push({
                "id": rows[row][0],
                "topic_name": rows[row][1],
                "quiz_count": rows[row][2],
                "completed": rows[row][3],
            })
        }
        console.log(this.topics);
    }, error => {
        console.log("FETCH ERROR: ", error);
  
    });
  }


  ngOnInit(): void {
  }

}
