import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "../user";

class Message {
    @prop({required: true, ref: () => User, type: () => String})
    public user_id!: Ref<User, string>;

    @prop({required: true})
    public content!: string;

    @prop({required: true, enum: ["text", "file"]})
    public type!: string;
}

@modelOptions({schemaOptions: {autoCreate: true, timestamps: true}})
export class Chat {
    @prop({required: true, ref: () => Chat, type: () => String, default: []})
    public messages!: Ref<Message, string>[];
}

const ChatModel = getModelForClass(Chat);
