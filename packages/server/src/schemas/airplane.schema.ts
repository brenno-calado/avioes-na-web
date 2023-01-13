import { Schema } from "mongoose";
import { Airplanes } from "../models/airplanes";

const airplaneSchema = new Schema<Airplanes>({
  _id: String,
  "Cruise Speed": String,
  "Empty Weight": String,
  "First Flight": String,
  Crew: String,
  Height: String,
  Image: String,
  Length: String,
  Role: String,
  Wingspan: String,
  Source: String,
  Title: String,
  "Maximum speed": String,
});

export default airplaneSchema;
