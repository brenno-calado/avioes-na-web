import * as mongoose from "mongoose";
import { Airplanes } from "../../models/airplanes";
import { Query } from "../../models/query";

abstract class BaseRepository<T> {
  constructor(private readonly collection: string, private readonly schema: mongoose.Schema<T>) {}

  protected async connect(name: string, schema: mongoose.Schema<T>): Promise<mongoose.Model<T>> {
    await mongoose.connect(String(process.env.DB_URI));
    return mongoose.model<T>(name, schema);
  }

  protected async disconnect(): Promise<void> {
    return mongoose.disconnect();
  }

  async findAll(
    filter: mongoose.FilterQuery<Airplanes>,
    sort: { [key: string]: mongoose.SortOrder | { $meta: "textScore" } },
    query: Query
  ) {
    const skipAmount = (query.page - 1) * query.take;
    const repository = await this.connect(this.collection, this.schema);
    const documents = await repository.find(filter).sort(sort).skip(skipAmount).limit(query.take);
    await this.disconnect();
    return documents;
  }
}

export default BaseRepository;
