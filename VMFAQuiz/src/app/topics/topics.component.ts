import { Component, OnInit } from '@angular/core';
var Sqlite = require("nativescript-sqlite");


@Component({
  selector: 'ns-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  private database: any;
  public topics: Array<any>;

  // FUTURE SET ALL TABLE NAMES TO GENERIC VARIABLE AND VAR IN EACH PAGE
  public constructor() {
    this.topics = [];
    (new Sqlite("quiz.db")).then(db => {
      db.execSQL("PRAGMA foreign_keys = ON;")
        .then(id => {
          console.log("FK ON")!
        });
      db.execSQL(
        "CREATE TABLE IF NOT EXISTS topics ( id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_name TEXT, quiz_desc TEXT, question_count INTEGER, completed INTEGER, user_fk INTEGER, FOREIGN KEY(user_fk) REFERENCES users(id));")
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
    this.database.execSQL("INSERT INTO topics (quiz_name, quiz_desc, question_count, completed) VALUES (?, ?, ?, ?);",
      ["Butt Cheese", 69, 1]).then(id => {

        this.fetch();
        console.log("topic Inserted!");
      }, error => {
        console.log("INSERT ERROR: ", error);
      });
  }

  public make() {

    this.database.execSQL(
      "CREATE TABLE IF NOT EXISTS topics ( id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_name TEXT, quiz_desc TEXT, question_count INTEGER, completed INTEGER, user_fk INTEGER, FOREIGN KEY(user_fk) REFERENCES users(id));")
      .then(id => {
        this.fetch();
        console.log("remade and fetched!")
      }, error => {
        console.log("RECREATE ERROR: ", error);
      });
  }

  public fetch() {
    this.database.all("SELECT * FROM topics").then(rows => {
      this.topics = [];
      for (let row in rows) {
        this.topics.push({
          "id": rows[row][0],
          "quiz_name": rows[row][1],
          "quiz_desc": rows[row][2],
          "quiz_count": rows[row][3],
          "completed": rows[row][4],
          "user_fk": rows[row][5],
        })
      }
      console.log(this.topics);
    }, error => {
      console.log("FETCH ERROR: ", error);

    });
  }

  public reset() {
    this.database.execSQL("DROP TABLE topics;").then(id => {

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
