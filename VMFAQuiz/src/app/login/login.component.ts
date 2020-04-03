import { Component, OnInit } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from "nativescript-angular/router";


const AS = require("tns-core-modules/application-settings");
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {


    private database: any;
    public users: Array<any>;

    public input: any;


    public constructor(private router: RouterExtensions) {
        this.users = [];
        this.input = {
            "user": "",
            "password": ""
        };


        (new Sqlite("quiz.db")).then(db => {
            db.execSQL("PRAGMA foreign_keys = ON;")
                .then(id => {
                    console.log("FK ON")!
                });
            db.execSQL("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT, score INTEGER );")
                .then(id => {
                    this.database = db;
                    // this.fetch();
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
                // this.fetch();
            }, error => {
                console.log("table create error", error);
            });
    }

    public insert(username, password) {
        if (this.input.user && this.input.password) {
            this.database.execSQL("INSERT INTO users (username, password, score) VALUES (?, ?, ?);", [this.input.user, this.input.password, 69]).then(id => {
                console.log("USERTEXT TEST: " + this.input.user)
                this.fetch();
                console.log("user Inserted!");
                // console.log(this.users)
            }, error => {
                console.log("Insert error: ", error);

            });
        } else {
            console.log("IF FAILED")
        }
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
            // console.log(this.users);
        }, error => {
            console.log("FETCH ERROR: ", error);

        });
    }

    public userLogin() {

        if (this.input.user && this.input.password) {
            this.database.all(`SELECT * FROM users WHERE username = ? AND password = ?;}`, [this.input.user, this.input.password]).then(rows => {
                AS.clear();
                AS.setNumber("userID", rows[0][0]);
                AS.setString("username", rows[0][1]);
                AS.setString("password", rows[0][2]);
                AS.setNumber("count", rows[0][3]);
            })
        }
    }


    public reset() {
        this.database.execSQL("DROP TABLE users;").then(id => {

            console.log("table dropped!");
            // this.fetch();
        }, error => {
            console.log("DROP ERROR: ", error);

        })

        this.make()
    }


    ngOnInit(): void {
    }

}
