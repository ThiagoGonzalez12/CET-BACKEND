import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const gallerySchema = new mongoose.Schema(
    {
        pdf: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

gallerySchema.plugin(paginate);

export default mongoose.model("Gallery", gallerySchema);
