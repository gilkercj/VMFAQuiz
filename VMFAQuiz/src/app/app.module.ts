import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
// import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuizformComponent } from './quizform/quizform.component';
import { QuizComponent } from './quiz/quiz.component';
import { TopicsComponent } from './topics/topics.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { QuestionsComponent } from './questions/questions.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import { QuizModalComponent } from './quiz-modal/quiz-modal.component';
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { QuestionModalComponent } from './question-modal/question-modal.component';


@NgModule({
    bootstrap: [
        AppComponent

    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        QuizformComponent,
        QuizComponent,
        TopicsComponent,
        QuestionsComponent,
        AdminPageComponent,
        AnswerFormComponent,
        QuizModalComponent,
        QuestionModalComponent,
        
    ],
    providers: [ModalDialogService],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        QuizModalComponent,
        QuestionModalComponent
    ],
    exports: [
        QuizModalComponent,
        QuestionModalComponent
    ],
})
export class AppModule { }
