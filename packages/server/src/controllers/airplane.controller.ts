import { Airplanes } from "../models/airplanes";
import AirplaneRepository from "../repositories/airplane.repository";
import BaseController from "./base/base.controller";

class AirplaneController extends BaseController<Airplanes> {
  private static instance: AirplaneController;

  constructor() {
    super(AirplaneRepository.getInstance());
  }

  static getInstance(): AirplaneController {
    if (!AirplaneController.instance) {
      AirplaneController.instance = new AirplaneController();
    }

    return AirplaneController.instance;
  }
}

export default AirplaneController;
