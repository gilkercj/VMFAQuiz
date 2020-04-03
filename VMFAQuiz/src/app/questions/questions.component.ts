import { Component, OnInit } from '@angular/core';
var Sqlite = require("nativescript-sqlite");

@Component({
  selector: 'ns-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  private database: any;
  public questions: Array<any>;

// FUTURE SET ALL TABLE NAMES TO GENERIC VARIABLE AND VAR IN EACH PAGE
  public constructor() {
    this.questions = [];
    
    (new Sqlite("quiz.db")).then(db => {
      db.execSQL("PRAGMA foreign_keys = ON;")
      .then(id => {
          console.log("FK ON")!
      });
        db.execSQL("CREATE TABLE IF NOT EXISTS questions ( id INTEGER PRIMARY KEY AUTOINCREMENT, question_content TEXT, quiz_id TEXT, score_value INTEGER );")
            .then(id => {
                this.database = db;
                this.fetch();
            }, error => {
                console.log("TABLE CREATE ERROR: ", error);
            });
    }, error => {
        console.log("DB Error: ", error);
    });
}

public insert() {
  this.database.execSQL("INSERT INTO questions (question_content, quiz_id, score_value) VALUES (?, ?, ?);", ["What is the squareroot of i?", 3, 96]).then(id => {

      this.fetch();
      console.log("question Inserted!");
  }, error => {
      console.log("INSERT ERROR: ", error);
  });
}

public make() {

  this.database.execSQL("CREATE TABLE IF NOT EXISTS questions ( id INTEGER PRIMARY KEY AUTOINCREMENT, question_content TEXT, quiz_id TEXT, score_value INTEGER );")
      .then(id => {
          this.fetch();
          console.log("remade and fetched!")
      }, error => {
          console.log("RECREATE ERROR: ", error);
      });
}

public fetch() {
  this.database.all("SELECT * FROM questions").then(rows => {
      this.questions = [];
      for (let row in rows) {
          this.questions.push({
              "id": rows[row][0],
              "question_content": rows[row][1],
              "quiz_id": rows[row][2],
              "score_value": rows[row][3],
          })
      }
      console.log(this.questions);
  }, error => {
      console.log("FETCH ERROR: ", error);

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

  ngOnInit(): void {
  }

}
