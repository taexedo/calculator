import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HistoryService} from '../services/history.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {HistoryModel} from "../models/history.model";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  historyList: HistoryModel[] = []
  isLoading: boolean = false;
  isError: boolean = false;

  @Input() isOpenHistorySidebar: Boolean = false;
  @Output() toggleHistorySidebar = new EventEmitter();

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
        this.isLoading = false;
        this.isError = true;
      },
    );
  }

  onClose = () => {
    this.toggleHistorySidebar.emit()
  }
}
