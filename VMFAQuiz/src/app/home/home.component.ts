import { Component, OnInit } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    private database: any;
    public users: Array<any>;

    public constructor() {
        this.users = [];
        (new Sqlite("quiz.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT, score INTEGER );")
                .then(id => {
                    this.database = db;
                    this.fetch();
                }, error => {
                    console.log("table create error", error);
                });
        }, error => {
            console.log("DB Error: ", error);
        });
    }

    public make() {

        this.database.execSQL("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT, score INTEGER );")
            .then(id => {
                this.fetch();
            }, error => {
                console.log("table create error", error);
            });
    }

    // INSERT INTO users (username, password, score) VALUES (?,?, ?); "gilkercj", "chickydoo", 69      INSERT INTO users (username, password, score) VALUES (?, ?, ?);", ["gilkercj", "chickydoo", 69]
    public insert() {
        this.database.execSQL("INSERT INTO users (username, password, score) VALUES (?, ?, ?);", ["gilkercj", "chickydoo", 69]).then(id => {

            this.fetch();
            console.log("user Inserted!");
        }, error => {
            console.log("Insert error: ", error);
        });
    }

    public fetch() {
        this.database.all("SELECT * FROM users").then(rows => {
            this.users = [];
            for (let row in rows) {
                this.users.push({
                    "id": rows[row][0],
                    "username": rows[row][1],
                    "password": rows[row][2],
                    "score": rows[row][3],
                })
            }
            console.log(this.users);
        }, error => {
            console.log("FETCH ERROR: ", error);

        });
    }

    public reset() {
        this.database.execSQL("DROP TABLE users;").then(id => {

            console.log("table dropped!");
            this.fetch();
        }, error => {
            console.log("DROP ERROR: ", error);

        })

        this.make()
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
