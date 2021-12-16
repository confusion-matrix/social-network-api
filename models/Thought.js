const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeCreated) => moment(timeCreated).format("MMM DD, YYYY [at] hh:mm a")
        },
        userName: {
            type: String,
            required: true,
            ref: "User"
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 280
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeCreated => moment(timeCreated).format("MMM DD YYYY [at] hh:mm a")
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Thought = model("Thought", ThoughtSchema);

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

module.exports = Thought;