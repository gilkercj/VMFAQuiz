import { Component, OnInit } from "@angular/core";
var Sqlite = require("nativescript-sqlite");
const AS = require("tns-core-modules/application-settings");

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    

    private database: any;
    public users: Array<any>;
    public currentUser: string = AS.getString("username");
    public input: any;

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

    public userTest() {
        const curUser: string = AS.getString("username");
        console.log("HOMEPAGE USER TEST: " + curUser);
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

    public make() {

        this.database.execSQL("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT, score INTEGER );")
            .then(id => {
                this.fetch();
            }, error => {
                console.log("table create error", error);
            });
    }

    public reset() {
        let data = "users"
        this.database.execSQL(`DROP TABLE ${data};`).then(id => {

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
