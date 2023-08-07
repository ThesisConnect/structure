import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {validateEmail, validateEnglish} from "../../utils/validator";
import {v4} from "uuid";

@modelOptions({schemaOptions: {autoCreate: true, timestamps: true}})
export class User{
    @prop({ required: true, default: () => v4().toString() })
    public _id!: string;

    @prop({required: true, validate: [validateEnglish, "Only English letters are allowed"]})
    public name!: string;

    @prop({required: true, validate: [validateEnglish, "Only English letters are allowed"]})
    public surname!: string;

    @prop({required: true, unique: true, validate: [validateEnglish, "Only English letters are allowed"]})
    public username!: string;

    @prop({required: true, unique: true, validate: [validateEmail, "Invalid email address"]})
    public email!: string;

    @prop({required: true})
    public password!: string;

    @prop({required: true})
    public avatar!: string;

    @prop({required: true, enum: ["advisor", "advisee"]})
    public role!: string;
}

const UserModel = getModelForClass(User);