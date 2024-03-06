import {EXPRESSION_VALIDATOR} from "../constants";

export function isValidExpression(string: string) {
  return EXPRESSION_VALIDATOR.test(string);
}
