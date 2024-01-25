import { Socion } from ".";

import ResolvedDichotomy from "./ResolvedDichotomy";
import Sociotype from "./Sociotype";

import dichotomyDefinitions from "./definitions/dichotomies.json";

interface DichotomyDefintion {
  num: number;
  name: string;
  evenName: string;
  oddName: string;
  reininNumber: number;
}

export default class Dichotomy {
  readonly _id: number;
  readonly num: number;
  readonly name: string;
  readonly evenName: string;
  readonly oddName: string;
  readonly reininNumber: number;

  static readonly dichotomies: ReadonlyArray<Dichotomy> = dichotomyDefinitions
    .map((defintion) => new Dichotomy(defintion))
    .sort((a, b) => a.num - b.num);

  constructor({
    num,
    name,
    evenName,
    oddName,
    reininNumber,
  }: DichotomyDefintion) {
    this._id = num;
    this.num = num;
    this.name = name;
    this.evenName = evenName;
    this.oddName = oddName;
    this.reininNumber = reininNumber;
  }

  resolveFor(sociotype: Sociotype): ResolvedDichotomy {
    return Socion.resolveDichotomy(this, sociotype);
  }

  toString(): string {
    return "Dichotomy {" + `num: ${this.num}` + `, name: "${this.name}"` + "}";
  }

  equals(dichotomy: Dichotomy): boolean {
    return this._id === dichotomy._id;
  }
}
