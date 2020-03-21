import { Component } from "@angular/core";
// var Sqlite = require("nativescript-sqlite");


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    // private database: any;
    // public users: Array<any>;

    // public constructor() {
    //     this.users = [];
    //     (new Sqlite("quiz.db")).then(db => {
    //         db.execSQL("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, score INTEGER );")
    //             .then(id => {
    //                 this.database = db;
    //                 this.fetch();
    //             }, error => {
    //                 console.log("table create error", error);
    //             });
    //     }, error => {
    //         console.log("DB Error: ", error);
    //     });
    // }

    // public insert() {
    //     this.database.execSQL("INSERT INTO users (username, password, score) VALUES (?,?, ?)", ["gilkercj", "chickydoo", 69]).then(id => {

    //     this.fetch();

    //     }, error => {
    //         console.log("Insert error: ", error);
    //     });
    // }

    // public fetch() {
    //     this.database.execSQL("SELECT * FROM users").then(rows => {
    //         this.users = [];
    //         for(let row in rows) {
    //             this.users.push({
    //                 "id": rows[row][0],
    //                 "username": rows[row][1],
    //                 "password": rows[row][2],
    //                 "score": rows[row][3],
    //             })
    //         }
    //     }, error => {
    //         console.log("FETCH ERROR: ", error);
        
    //     });
    // }

}
