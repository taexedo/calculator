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

  addNumber = (number: string) => {

    this.cleanError()
    this.resetExpressionResult()
    if(!this.isSafeToInput()){
      return;
    }
    if(this.expression === '0'){
      this.expression = number
      return;
    }

    this.expression += number
  }

  addOperation = (specialCharacter: string) => {

    const isOperationAdded = CALCULATOR_OPERATIONS_REGEX.test(this.expression)
    if(isOperationAdded){
      const lastTreeChars = this.expression.slice(-3)
      if(CALCULATOR_OPERATIONS_REGEX.test(lastTreeChars) && lastTreeChars !== ` ${specialCharacter} `){
        this.expression = this.expression.slice(0, -3) + ` ${specialCharacter} `
      }
      return;
    }
    this.expression += ` ${specialCharacter} `

  }

  addFloatingPoint = () => {
    if(!this.isSafeToInput() || this.expressionResult || this.isError){
      return;
    }
    const isLastCharNumber = /\d$/.test(this.expression);
    if(isLastCharNumber) {
      const expressionArray = this.expression.split(" ")
      if(!expressionArray[expressionArray.length - 1].includes(".")){
        this.expression += '.'
      }
    }
  }

  isSafeToInput (){
    const expressionArray = this.expression.split(" ")
    console.log("expressionArray", expressionArray)
    console.log("expressionArray[expressionArray.length - 1].length", expressionArray[expressionArray.length - 1].length)
    return expressionArray[expressionArray.length - 1].length !== 12;
  }

  backspaceFunction = () => {
    if(this.expressionResult || this.isError){
      return;
    }
    if(this.expression.length === 1){
      if(this.expression !== '0'){
        this.expression = '0'
        return;
      }
      return;
    }
    this.expression = this.expression.slice(0, -1);
  }

  calculateFunction = () =>  {
    if(this.expressionResult || this.isError){
      return;
    }
    const isValidExpression = EXPRESSION_VALIDATOR.test(this.expression)
    if(isValidExpression) {
      this.calculateExpression()
    }
  }

  calculateExpression = () => {
    this.isLoading = true;
    this.CalculatorService.createCalculation({expression: this.expression}).subscribe((result: {result: string}) => {
      this.isLoading = false;
      this.expressionResult = result.result
      this.historyComponent.getHistoryData()
    }, () => {
      this.isLoading = false;
      this.triggerError()
    })
  }

  clearFunction = () =>  {
    this.cleanError()
    if(this.expression !== '0') {
      if(this.expressionResult){
        this.expressionResult = '';
      }
      this.expression = '0'
      return;
    }
  }
  resetExpressionResult = () => {
    if(this.expressionResult){
      this.clearFunction();
      this.expressionResult = '';
    }
  }

  toggleHistorySidebar = () => {
    this.isOpenHistorySidebar = !this.isOpenHistorySidebar
  }

  triggerError = () => {
    this.triggerToastMessage()
    this.expression = '0';
    this.expressionResult = '';
    this.isError = true;
  }

  triggerToastMessage = () => {
    this.triggerToastMessageFlag = true;
    setTimeout(() => this.triggerToastMessageFlag = false, ERROR_DURATION);
  }

  cleanError = () => {
    if(!this.isError){
      return;
    }
    this.isError = false;
  }
}
