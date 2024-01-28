import Dichotomy from "./Dichotomy";
import ResolvedRelation from "./ResolvedRelation";
import Relation from "./Relation";
import Parity from "./Parity";
import ResolvedDichotomy from "./ResolvedDichotomy";
import Sociotype from "./Sociotype";

export {
  Dichotomy,
  ResolvedRelation as DirectedIntertypeRelation,
  Relation as IntertypeRelation,
  Parity,
  ResolvedDichotomy,
  Sociotype,
};

export abstract class Socion {
  static readonly sociotypes = Sociotype.sociotypes;
  static readonly intertypeRelations = Relation.relations;
  static readonly dichotomies = Dichotomy.dichotomies;

  static getSociotypeByNum(num: number): Sociotype {
    return unsafeSearch<Sociotype>(
      Socion.sociotypes,
      (sociotype) => sociotype.num === num,
      `Invalid Sociotype number ${num}`,
    );
  }

  static getSociotypeByName(name: string): Sociotype {
    return unsafeSearch<Sociotype>(
      Socion.sociotypes,
      (sociotype) => sociotype.name === name,
      `Invalid Sociotype name ${name}`,
    );
  }

  static getRelationByNum(num: number): Relation {
    return unsafeSearch<Relation>(
      Socion.intertypeRelations,
      (relation) => relation.num === num,
      `Invalid IntertypeRelation number ${num}`,
    );
  }

  static getDichotomyByNum(num: number): Dichotomy {
    return unsafeSearch<Dichotomy>(
      Socion.dichotomies,
      (dichotomy) => dichotomy.num === num,
      `Invalid Dichotomy number ${num}`,
    );
  }

  static resolveRelation(
    sociotype: Sociotype,
    foreignSociotype: Sociotype,
  ): ResolvedRelation {
    const relationId = computeRelationId(sociotype._id, foreignSociotype._id);
    const relation = Socion.#getRelationById(relationId);
    return relation.resolveFor(sociotype, foreignSociotype);
  }

  static resolveDichotomy(
    dichotomy: Dichotomy,
    sociotype: Sociotype,
  ): ResolvedDichotomy {
    const parity = computeDichotomyParity(dichotomy._id, sociotype._id);
    return new ResolvedDichotomy(dichotomy, parity);
  }

  static #getSociotypeById(id: number): Sociotype {
    return unsafeSearch<Sociotype>(
      Socion.sociotypes,
      (sociotype) => sociotype._id === id,
      `Invalid Sociotype id ${id}`,
    );
  }

  static #getRelationById(id: number): Relation {
    return unsafeSearch<Relation>(
      Socion.intertypeRelations,
      (relation) => relation._id === id,
      `Invalid IntertypeRelation id ${id}`,
    );
  }

  static #getDichotomyById(id: number): Dichotomy {
    return unsafeSearch<Dichotomy>(
      Socion.dichotomies,
      (dichotomy) => dichotomy._id === id,
      `Invalid Dichotomy id ${id}`,
    );
  }
}

function unsafeSearch<T>(
  collection: ReadonlyArray<T>,
  predicate: (item: T) => boolean,
  message: string,
): T {
  const item = collection.find(predicate);

  if (!item) throw message;

  return item;
}

function computeRelationId(
  sociotypeId: number,
  foreignSociotypeId: number,
): number {
  const comparison = sociotypeId ^ foreignSociotypeId;
  if (comparison & 0b0100 && sociotypeId & 0b0001) {
    return comparison ^ 0b1000;
  } else {
    return comparison;
  }
}

function computeDichotomyParity(
  dichotomyId: number,
  sociotypeId: number,
): Parity {
  const bits = Array.from((sociotypeId & dichotomyId).toString(2)).map((bit) =>
    Number(bit),
  );

  const parity = bits.reduce((a, b) => a ^ b);

  return parity;
}
