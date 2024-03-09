import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HistoryService} from '../services/history.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {HistoryModel} from "../models/history.model";
import {ERROR_DURATION} from "../../constants";
import {ToastComponent} from "../toast/toast.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    ToastComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  historyList: HistoryModel[] = []
  isLoading: boolean = false;
  isError: boolean = false;
  triggerToastMessageFlag: boolean = false;
  errorText: string = '';

  @Input() isOpenHistorySidebar: Boolean = false;
  @Output() toggleHistorySidebar = new EventEmitter();
  @Input() onHistoryClick !: (expression: string, result: string) => void;

  constructor(private HistoryService: HistoryService) {
  }

  ngOnInit() {
    this.getHistoryData();
  }

  getHistoryData() {
    this.isLoading = true;
    this.HistoryService.getHistory().subscribe(
      (historyList: HistoryModel[]) => {
        this.historyList = historyList
        this.isLoading = false;
      },
      () => {
        this.triggerToastMessage("Error occurred while getting history data.")
        this.isLoading = false;
        this.isError = true;
      },
    );
  }

  deleteHistory() {
    this.isLoading = true;
    this.HistoryService.deleteAllHistory().subscribe(
      () => {
        this.getHistoryData()
      },
      () => {
        this.triggerToastMessage("Error occurred while deleting the history.")
        this.isLoading = false;
        this.isError = true;
      },
    )
  }

  onClose = () => {
    this.toggleHistorySidebar.emit()
  }

  triggerToastMessage = (errorText: string) => {
    this.errorText = errorText;
    this.triggerToastMessageFlag = true;
    setTimeout(() => this.triggerToastMessageFlag = false, ERROR_DURATION);
  }
}
