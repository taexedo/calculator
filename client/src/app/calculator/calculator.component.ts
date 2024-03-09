import {Component, ViewChild} from '@angular/core';
import {Button, populateButtons} from "./buttons";
import {CommonModule} from "@angular/common";
import {CALCULATOR_OPERATIONS_REGEX, ERROR_DURATION, EXPRESSION_VALIDATOR} from "../../constants";
import {CalculatorService} from "@services/calculator.service";
import {HistoryComponent} from "../history/history.component";
import {ToastComponent} from "../toast/toast.component";

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, HistoryComponent, ToastComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})

export class CalculatorComponent {
  expression: string = '0';
  expressionResult: string = '';
  buttons: Button[];
  isOpenHistorySidebar: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  triggerToastMessageFlag: boolean = false;

  currentNumber: string = '0';
  chosenOperation: string = '';
  builtExpression: string = '';
  justAddedToExpression: boolean = false;

  @ViewChild(HistoryComponent) historyComponent!: HistoryComponent

  constructor(private CalculatorService: CalculatorService) {
    this.buttons = populateButtons({
      addNumber: this.addNumber,
      addOperation: this.addOperation,
      clearFunction: this.clearFunction,
      backspaceFunction: this.backspaceFunction,
      calculateFunction: this.calculateFunction,
      addFloatingPoint: this.addFloatingPoint,
      toggleHistorySidebar: this.toggleHistorySidebar
    })
  }

  toggleHistorySidebar = () => {
    this.isOpenHistorySidebar = !this.isOpenHistorySidebar
  }

  addNumber = (number: string) => {
    if (this.expressionResult) {
      this.resetResultsVars()
    }
    if (this.currentNumber === '0' || this.justAddedToExpression) {
      this.currentNumber = number
      this.justAddedToExpression = false;
      return;
    }
    if (!this.isSafeToInput()) {
      return;
    }
    this.currentNumber += number
  }

  addOperation = (operator: string) => {
    if (this.isError) {
      return;
    }

    if (!this.chosenOperation) {
      this.justAddedToExpression = true;
    }
    if (!this.builtExpression) {
      if (this.expressionResult) {
        this.currentNumber = this.expressionResult;
        this.builtExpression = this.expressionResult;
        this.resetResultsVars()
      } else {
        this.builtExpression = this.currentNumber;
      }
    }
    this.chosenOperation = operator
  }

  addFloatingPoint = () => {
    if (this.currentNumber.length > 15 || this.isError) {
      return;
    }
    if (this.expressionResult) {
      this.currentNumber = '0'
      this.resetResultsVars()
    }

    if (!this.currentNumber.includes(".")) {
      this.currentNumber += '.'
    }
  }

  backspaceFunction = () => {
    if (this.justAddedToExpression || this.expressionResult || this.isError) {
      return;
    }
    if (this.currentNumber.length === 1) {
      if (this.currentNumber !== '0') {
        this.currentNumber = '0'
        return;
      }
      return;
    }
    this.currentNumber = this.currentNumber.slice(0, -1);
  }

  isSafeToInput() {
    return this.currentNumber.length <= 16;
  }


  calculateFunction = () => {
    if (this.expressionResult || this.isError) {
      return;
    }
    this.expression = `${this.builtExpression} ${this.chosenOperation} ${this.currentNumber}`
    const isValidExpression = EXPRESSION_VALIDATOR.test(this.expression)
    if (isValidExpression) {
      this.calculateExpression()
    }
  }

  calculateExpression = () => {
    this.isLoading = true;
    this.CalculatorService.createCalculation({expression: this.expression}).subscribe((result: {
      result: string
    }) => {
      this.resetFunction();
      this.isLoading = false;
      this.expressionResult = result.result
      this.historyComponent.getHistoryData()
    }, () => {
      this.isLoading = false;
      this.triggerError()
    })
  }

  triggerError = () => {
    this.triggerToastMessage()
    this.resetFunction()
    this.isError = true;
  }

  triggerToastMessage = () => {
    this.triggerToastMessageFlag = true;
    setTimeout(() => this.triggerToastMessageFlag = false, ERROR_DURATION);
  }

  onHistoryClick = (historyExpression: string, historyResult: string) => {
    this.cleanError();
    this.resetFunction();
    this.expression = historyExpression;
    this.expressionResult = historyResult;

  }

  cleanError = () => {
    if (!this.isError) {
      return;
    }
    this.isError = false;
  }
  clearFunction = () => {
    this.cleanError()
    this.resetFunction()
    this.resetResultsVars()
  }

  resetFunction = () => {
    this.currentNumber = '0';
    this.justAddedToExpression = false;
    this.builtExpression = ''
    this.chosenOperation = '';
  }
  resetResultsVars = () => {
    this.expressionResult = '';
    this.expression = ''
  }

}
