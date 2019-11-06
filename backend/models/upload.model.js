const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// library for handling autoincrement in mongoose
// https://github.com/ramiel/mongoose-sequence
const AutoIncrement = require("mongoose-sequence")(mongoose);

let documentSchema = new Schema(
{
    document_id: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    fileLink: {
        type: String
    },
    path: {
        type: String
    }
}, {
    timestamps: true
}, {
    collection: 'documents'
}
);

documentSchema.plugin(AutoIncrement, { inc_field: "document_id" });

const Document = mongoose.model('Document', documentSchema)

module.exports = Document;
