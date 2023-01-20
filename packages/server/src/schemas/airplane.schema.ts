import { Schema } from "mongoose";
import { Airplanes } from "../models/airplanes";

const airplaneSchema = new Schema<Airplanes>({
  _id: String,
  cruiseSpeed: String,
  emptyWeight: String,
  firstFlight: String,
  crew: String,
  height: String,
  image: String,
  length: String,
  role: String,
  wingspan: String,
  source: String,
  title: String,
  maximumSpeed: String,
});

export default airplaneSchema;
