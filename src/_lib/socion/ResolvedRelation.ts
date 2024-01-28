import Relation from "./Relation";
import Sociotype from "./Sociotype";

export default class ResolvedRelation {
  readonly relation: Relation;
  readonly num: number;
  readonly name: string;
  readonly sociotype: Sociotype;
  readonly foreignSociotype: Sociotype;
  readonly role: string;
  readonly foreignRole: string;

  constructor(
    relation: Relation,
    sociotype: Sociotype,
    foreignSociotype: Sociotype,
  ) {
    this.relation = relation;
    this.num = relation.num;
    this.name = relation.name;

    this.sociotype = sociotype;
    this.foreignSociotype = foreignSociotype;

    if (relation.foreignRoleName) {
      this.role = relation.roleName;
      this.foreignRole = relation.foreignRoleName;
    } else {
      this.role = relation.roleName;
      this.foreignRole = relation.roleName;
    }
  }

  toString(): string {
    return (
      "ResolvedRelation {" +
      `num: ${this.num}` +
      `, name: "${this.name}"` +
      `, sociotype: "${this.sociotype.name}"` +
      `, foreignSociotype: "${this.foreignSociotype.name}"` +
      "}"
    );
  }
}
