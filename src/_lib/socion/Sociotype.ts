import { Socion } from ".";

import DirectedIntertypeRelation from "./DirectedIntertypeRelation";

import sociotypeDefinitions from "./definitions/sociotypes.json";

interface SociotypeDefinition {
  readonly num: number;
  readonly name: string;
  readonly nickname: string;
}

export default class Sociotype {
  readonly _id: number;
  readonly num: number;
  readonly name: string;
  readonly nickname: string;

  static readonly DISPLAY_OFFSET: number = 1;
  static readonly sociotypes: ReadonlyArray<Sociotype> = sociotypeDefinitions
    .map((defintion) => new Sociotype(defintion))
    .sort((a, b) => a.num - b.num);

  constructor({ num, name, nickname }: SociotypeDefinition) {
    this._id = num - Sociotype.DISPLAY_OFFSET;
    this.num = num;
    this.name = name;
    this.nickname = nickname;
  }

  toString(): string {
    return `Sociotype {num: ${this.num}, name: "${this.name}"}`;
  }

  getDirectedRelationWith(
    foreignSociotype: Sociotype,
  ): DirectedIntertypeRelation {
    return Socion.getDirectedRelation(this, foreignSociotype);
  }
}
