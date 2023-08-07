import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "../user";
import {Project} from "../project";
import {Plan} from "../plan";
import {File} from "../files";

@modelOptions({schemaOptions: {autoCreate: true, timestamps: true}})
export class Summary {
    @prop({required: true, ref: () => Project})
    public project_id!: string;

    @prop({required: true, ref: () => Plan, type: () => String})
    public plan_id!: Ref<Plan, string>;

    @prop({required: true, ref: () => User, type: () => String})
    public receiver_id!: Ref<User, string>;

    @prop({required: true, ref: () => User, type: () => String})
    public sender_id!: Ref<User, string>;

    @prop({default: ""})
    public comment!: string;

    @prop({default: 0})
    public progress!: number;

    @prop({ref: () => File, type: () => String, default: []})
    public files!: Ref<File, string>[];
}

const SummaryModel = getModelForClass(Summary);