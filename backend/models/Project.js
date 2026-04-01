import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    count: { type: Number, default: 1, min: 1 },
    filled: { type: Number, default: 0 },
  },
  { _id: false }
);

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    role: String,
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    role: String,
    message: String,
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    tags: { type: [String], default: [] },

    community: { type: String, default: null },

    status: {
      type: String,
      enum: ["Recruiting", "In Progress", "Completed"],
      default: "Recruiting",
    },

    roles: { type: [roleSchema], default: [] },

    members: { type: [memberSchema], default: [] },

    applications: { type: [applicationSchema], default: [] },

    links: {
      github: { type: String, trim: true, default: "" },
      live: { type: String, trim: true, default: "" },
      docs: { type: String, trim: true, default: "" },
    },

    applicantsCount: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("Project", projectSchema);

export default projectModel;