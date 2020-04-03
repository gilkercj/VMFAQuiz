import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { QuestionModalComponent } from "../question-modal/question-modal.component";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
  selector: 'ns-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.css']
})
export class QuizModalComponent{

  public frameworks: Array<string>;

  public constructor(private params: ModalDialogParams, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
      this.frameworks = [
          "NativeScript",
          "Xamarin",
          "Onsen UI",
          "Ionic Framework",
          "React Native"
      ];
  }

  public close(res: string) {
      this.params.closeCallback(res);
  }

  public showQuestionModal() {

    let options = {
        context: {},
        fullscreen: true,
        viewContainerRef: this.vcRef
    };
    this.modal.showModal(QuestionModalComponent, options).then(res => {
        console.log(res);
        res;
    });
}

}
