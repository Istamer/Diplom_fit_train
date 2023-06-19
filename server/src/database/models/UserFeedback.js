const { Schema, SchemaTypes, model } = require('mongoose');

const UserFeedback = Schema({
    userId: {
        type: SchemaTypes.String,
        required: true,
        ref: "users",
    },
    text: {
        type: SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
    like: {
        type: SchemaTypes.Array,
        default: [],
    },
});

module.exports = model('userFeedback', UserFeedback);