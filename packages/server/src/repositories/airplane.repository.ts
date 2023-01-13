import { Airplanes } from "../models/airplanes";
import airplaneSchema from "../schemas/airplane.schema";
import BaseRepository from "./base/base.repository";

class AirplaneRepository extends BaseRepository<Airplanes> {
  private static instance: AirplaneRepository;

  constructor() {
    super("Airplanes", airplaneSchema);
  }

  static getInstance() {
    if (!AirplaneRepository.instance) {
      AirplaneRepository.instance = new AirplaneRepository();
    }

    return AirplaneRepository.instance;
  }
}

export default AirplaneRepository;
