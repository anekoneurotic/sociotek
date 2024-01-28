import { Socion } from ".";

import ResolvedRelation from "./ResolvedRelation";
import Parity from "./Parity";
import Sociotype from "./Sociotype";

import relationDefinitions from "./definitions/relations.json";

interface RelationDefintion {
  num: number;
  name: string;
  roleName: string;
  foreignRoleName?: string;
}

export default class Relation {
  readonly _id: number;
  readonly num: number;
  readonly name: string;
  readonly roleName: string;
  readonly foreignRoleName?: string;

  static readonly DISPLAY_OFFSET = 1;
  static readonly relations: ReadonlyArray<Relation> = relationDefinitions
    .map((definition) => new Relation(definition))
    .sort((a, b) => a.num - b.num);

  constructor({ num, name, roleName, foreignRoleName }: RelationDefintion) {
    this._id = num - Relation.DISPLAY_OFFSET;
    this.num = num;
    this.name = name;
    this.roleName = roleName;
    this.foreignRoleName = foreignRoleName;
  }

  resolveFor(
    sociotype: Sociotype,
    foreignSociotype: Sociotype,
  ): ResolvedRelation {
    return new ResolvedRelation(this, sociotype, foreignSociotype);
  }
}
