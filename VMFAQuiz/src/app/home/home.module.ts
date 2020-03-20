import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { LoginRoutingModule } from "../login/login-routing.module";
import { HomeComponent } from "./home.component";
// import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        LoginRoutingModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
