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
        db.execSQL("CREATE TABLE IF NOT EXISTS topics ( id INTEGER PRIMARY KEY AUTOINCREMENT, topic_name TEXT, quiz_count TEXT, completed INTEGER );")
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
  this.database.execSQL("INSERT INTO topics (topic_name, quiz_count, completed) VALUES (?, ?, ?);", ["Butt Cheese", 69, 1]).then(id => {

      this.fetch();
      console.log("topic Inserted!");
  }, error => {
      console.log("INSERT ERROR: ", error);
  });
}

public make() {

  this.database.execSQL("CREATE TABLE IF NOT EXISTS topics ( id INTEGER PRIMARY KEY AUTOINCREMENT, topic_name TEXT, quiz_count TEXT, completed INTEGER );")
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
