import * as mongoose from "mongoose";
import { Role } from "../interface/role.interface";

export const roleSchema = new mongoose.Schema<Role>(
  {
    name: String,
    code: String,
    description: String,
  },
  { timestamps: true }
);

roleSchema.index({ name: 1 }, { unique: true });

export const RoleModel: mongoose.Model<Role> = mongoose.model<Role>(
  "role",
  roleSchema,
  "role"
);
