import { Query } from "../../models/query";
import BaseRepository from "../../repositories/base/base.repository";

abstract class BaseController<T> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async findAndRank(query: Query, property: string, ascending: boolean = false) {
    const normalQuery: Query = {
      page: query.page ? query.page : 1,
      take: query.take ? query.take : 10,
    };

    return this.repository.findAndRank(
      {
        [`${property}`]: { $ne: null },
        Role: { $not: /helicopter|glider|car|parachute|paramotor|rotor|airship|Extraterrestrial/i },
      },
      { [`${property}`]: ascending ? 1 : -1 },
      normalQuery
    );
  }

  async findAllUnique(property: string) {
    return this.repository.findAllUnique(property);
  }
}

export default BaseController;
