import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";



// import { QuizRoutingModule } from "./quiz-routing.module";
import { QuizComponent } from "./quiz.component";
import { QuizformComponent } from "../quizform/quizform.component";
// import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        // QuizRoutingModule
    ],
    declarations: [
        QuizComponent,
        QuizformComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class QuizModule { }
