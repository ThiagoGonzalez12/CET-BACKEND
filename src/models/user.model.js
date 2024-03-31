import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: Array,
        required: true,
    },
});

userSchema.plugin(paginate);

export default mongoose.model("User", userSchema);
