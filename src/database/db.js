import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGODB_URI);
} catch (e) {
    console.log(e);
}
