import { Component, OnInit } from '@angular/core';
var Sqlite = require("nativescript-sqlite");
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'ns-quizform',
  templateUrl: './quizform.component.html',
  styleUrls: ['./quizform.component.css']
})
export class QuizformComponent implements OnInit {

  private database: any;

  public quizName: String;
  public quizCompleted: String;

  id: any;
  private sub: any;

  public constructor(private route: ActivatedRoute) {

    (new Sqlite("quiz.db")).then(db => {
      db.execSQL("CREATE TABLE IF NOT EXISTS topics ( id INTEGER PRIMARY KEY AUTOINCREMENT, topic_name TEXT, quiz_count TEXT, completed INTEGER );")
        .then(id => {
          this.database = db;

          this.get();
        }, error => {
          console.log("TABLE CREATE ERROR: ", error);
        });
    }, error => {
      console.log("DB Error: ", error);
    });
    console.log("CONST ID")
  }


  public get() {
    this.database.all("SELECT * FROM topics WHERE id = ?", [this.id], (err, row) => { 
      this.quizName = row[0][1];
      this.quizCompleted = row[0][2];
      // for (let row in rows) {
      //   this.topics.push({
      //     "id": rows[row][0],
      //     "topic_name": rows[row][1],
      //     "quiz_count": rows[row][2],
      //     "completed": rows[row][3],
      //   })
      
      console.log(row);
      console.log("QUIZZY TEST: " + row[0][1])
      console.log("ID: " + this.id);
      // this.quiz = row.topic_name;
    }, error => {
      console.log("FETCH ERROR: ", error);

    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.get()
  }

}
