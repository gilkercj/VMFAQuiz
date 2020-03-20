import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
// import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuizformComponent } from './quizform/quizform.component';
import { QuizComponent } from './quiz/quiz.component';



@NgModule({
    bootstrap: [
        AppComponent

    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        QuizformComponent,
        QuizComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
