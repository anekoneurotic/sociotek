import { Socion } from ".";

import IntertypeRelation from "./IntertypeRelation";
import Sociotype from "./Sociotype";

export default class DirectedIntertypeRelation {
  readonly relation: IntertypeRelation;
  readonly num: number;
  readonly name: string;
  readonly sociotype: Sociotype;
  readonly foreignSociotype: Sociotype;
  readonly role: string;
  readonly foreignRole: string;

  constructor(
    relation: IntertypeRelation,
    sociotype: Sociotype,
    foreignSociotype: Sociotype,
  ) {
    this.relation = relation;
    this.num = relation.num;
    this.name = relation.name;

    this.sociotype = sociotype;
    this.foreignSociotype = foreignSociotype;

    if (relation.rationalityParity !== undefined && relation.foreignRoleName) {
      const rationality = Socion.getDichotomyByNum(1);

      if (
        rationality.resolveFor(sociotype).parity === relation.rationalityParity
      ) {
        this.role = relation.roleName;
        this.foreignRole = relation.foreignRoleName;
      } else {
        this.role = relation.foreignRoleName;
        this.foreignRole = relation.roleName;
      }
    } else {
      this.role = relation.roleName;
      this.foreignRole = relation.roleName;
    }
  }

  toString(): string {
    return (
      "DirectedIntertypeRelation {" +
      `num: ${this.num}` +
      `, name: "${this.name}"` +
      `, sociotype: "${this.sociotype.name}"` +
      `, foreignSociotype: "${this.foreignSociotype.name}"` +
      "}"
    );
  }
}
