import mongoose from "mongoose"

export const Contact = mongoose.models.Contact || mongoose.model("Contact", { name: String })