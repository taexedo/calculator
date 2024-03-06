import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ERROR_DURATION} from "../../constants";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  @Input() isError: boolean = false;
  @Input() errorText: string = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.isError = false;
    }, ERROR_DURATION);
  }
}
