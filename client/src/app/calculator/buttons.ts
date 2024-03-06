export type functionsType = {
  addNumber: (number: string) => void,
  clearFunction: () => void,
  backspaceFunction: () => void,
  addOperation: (specialCharacter: string) => void,
  calculateFunction: () => void,
  addFloatingPoint: () => void;
  toggleHistorySidebar: () => void;
}
export type Button = {
  buttonText: string;
  icon?: string;
  action: (buttonText: string) => void;
  class: string;
  style?: any;
};

export function populateButtons({
                                  addNumber,
                                  addOperation,
                                  clearFunction,
                                  backspaceFunction,
                                  calculateFunction,
                                  addFloatingPoint,
                                  toggleHistorySidebar
                                }: functionsType): Button[] {
  const numberButtons: Button[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => ({
    buttonText: num.toString(),
    class: 'basic-btn',
    action: addNumber
  }));

  const operationButtons: Button[] = [
    {buttonText: "+", action: addOperation, class: 'operation-btn'},
    {buttonText: "-", action: addOperation, class: 'operation-btn'},
    {buttonText: "*", action: addOperation, class: 'operation-btn'},
    {buttonText: "/", action: addOperation, class: 'operation-btn'},
  ]

  const tailButtons: Button[] = [
    {buttonText: "=", action: calculateFunction, class: 'equals-btn'},
    {buttonText: "0", action: addNumber, class: 'basic-btn'},
    {buttonText: ".", action: addFloatingPoint, class: 'basic-btn'},
    {buttonText: "C", action: clearFunction, class: 'clear-button'},
  ];

  return [
    ...operationButtons,
    ...numberButtons.slice(0, 3),
    {buttonText: "", icon: 'fa fa-backspace', action: backspaceFunction, class: 'special-function-btn'},
    ...numberButtons.slice(3, 6),
    {buttonText: "", icon: 'fa fa-history', action: toggleHistorySidebar, class: 'special-function-btn'},
    ...numberButtons.slice(6, 9),
    ...tailButtons
  ]
}
