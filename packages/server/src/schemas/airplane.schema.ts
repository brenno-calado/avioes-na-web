import { Schema } from "mongoose";
import { Airplanes } from "../models/airplanes";

const airplaneSchema = new Schema<Airplanes>({
  title: String,
  "Maximum speed": String,
});

export default airplaneSchema;
