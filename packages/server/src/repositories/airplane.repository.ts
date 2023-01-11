import * as mongoose from "mongoose";
import { Airplanes } from "../models/airplanes";
import { Query } from "../models/query";
import airplaneSchema from "../schemas/airplane.schema";

class AirplaneRepository {
  private static instance: AirplaneRepository;

  static getInstance() {
    if (!AirplaneRepository.instance) {
      AirplaneRepository.instance = new AirplaneRepository();
    }

    return AirplaneRepository.instance;
  }

  private async connect(): Promise<mongoose.Model<Airplanes>> {
    await mongoose.connect(String(process.env.DB_URI));
    return mongoose.model("Airplanes", airplaneSchema);
  }

  private async disconnect(): Promise<void> {
    return mongoose.disconnect();
  }

  async findAll(
    filter: mongoose.FilterQuery<Airplanes>,
    sort: { [key: string]: mongoose.SortOrder | { $meta: "textScore" } },
    query: Query
  ) {
    const skipAmount = (query.page - 1) * query.take;
    const repository = await this.connect();
    const documents = await repository.find(filter).sort(sort).skip(skipAmount).limit(10);
    await this.disconnect();
    return documents;
  }
}

export default AirplaneRepository;
