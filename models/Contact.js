import mongoose from "mongoose"

export const Contact = mongoose.models.Contact || mongoose.model("Contact", { name: String, email: String, phone: String })

export const User = mongoose.models.User || mongoose.model("User", { email: String, password: String })