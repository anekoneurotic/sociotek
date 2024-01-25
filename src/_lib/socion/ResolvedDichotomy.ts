import Dichotomy from "./Dichotomy";
import Parity from "./Parity";

export default class ResolvedDichotomy {
  readonly dichotomy: Dichotomy;
  readonly num: number;
  readonly name: string;
  readonly label: string;
  readonly parity: Parity;

  constructor(dichotomy: Dichotomy, parity: Parity) {
    this.dichotomy = dichotomy;
    this.num = dichotomy.num;
    this.name = dichotomy.name;
    this.label =
      parity === Parity.EVEN ? dichotomy.evenName : dichotomy.oddName;
    this.parity = parity;
  }

  toString(): string {
    return (
      "ResolvedDichotomy {" +
      `num: ${this.num}` +
      `, parity: ${this.parity}` +
      `, name: "${this.name}"` +
      "}"
    );
  }

  equals(resolvedDichotomy: ResolvedDichotomy): boolean {
    return (
      this.dichotomy._id === resolvedDichotomy.dichotomy._id &&
      this.parity === resolvedDichotomy.parity
    );
  }
}
