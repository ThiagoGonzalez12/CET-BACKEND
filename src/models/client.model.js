import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const clientSchema = new mongoose.Schema(
    {
        client_name: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
        },
        pdfs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Gallery",
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

clientSchema.plugin(paginate);

export default mongoose.model("Client", clientSchema);
