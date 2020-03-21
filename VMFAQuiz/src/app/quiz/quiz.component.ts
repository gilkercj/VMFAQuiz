import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log(this.router.url);
  }

}
