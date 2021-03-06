import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from "./home/home.component";
import { QuizComponent } from './quiz/quiz.component';
import { TopicsComponent } from './topics/topics.component';
import { QuestionsComponent } from './questions/questions.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent},
    { path: "login", component: LoginComponent},
    { path: "quiz", component: QuizComponent},
    { path: "topics", component: TopicsComponent},
    { path: "quiz/:id", component: QuizComponent},
    { path: "questions", component: QuestionsComponent},
    { path: "questions/:id", component: QuestionsComponent},
    { path: "adminPage", component: AdminPageComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
