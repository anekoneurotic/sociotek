import { Socion } from ".";

import DirectedRelation from "./DirectedIntertypeRelation";
import Parity from "./Parity";
import Sociotype from "./Sociotype";

import intertypeRelationDefinitions from "./definitions/intertypeRelations.json";

interface IntertypeRelationDefintion {
  num: number;
  name: string;
  roleName: string;
  foreignRoleName?: string;
  rationalityParity?: Parity;
}

export default class IntertypeRelation {
  readonly _id: number;
  readonly num: number;
  readonly name: string;
  readonly roleName: string;
  readonly foreignRoleName?: string;
  readonly rationalityParity?: Parity;

  static readonly DISPLAY_OFFSET = 1;
  static readonly intertypeRelations: ReadonlyArray<IntertypeRelation> =
    intertypeRelationDefinitions
      .map((definition) => new IntertypeRelation(definition))
      .sort((a, b) => a.num - b.num);

  constructor({
    num,
    name,
    roleName,
    foreignRoleName,
    rationalityParity,
  }: IntertypeRelationDefintion) {
    this._id = num - IntertypeRelation.DISPLAY_OFFSET;
    this.num = num;
    this.name = name;
    this.roleName = roleName;
    this.foreignRoleName = foreignRoleName;
    this.rationalityParity = rationalityParity;
  }

  getPartnerFor(sociotype: Sociotype): Sociotype {
    return Socion.getRelationPartner(this, sociotype);
  }

  getDirectedRelation(
    sociotype: Sociotype,
    foreignSociotype: Sociotype,
  ): DirectedRelation {
    return new DirectedRelation(this, sociotype, foreignSociotype);
  }
}
