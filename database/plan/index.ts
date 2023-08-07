import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {Project} from "../project";
import {Folder} from "../files";
import {Chat} from "../chat";

class Task {
    @prop({required: true, ref: () => Chat, type: () => String})
    public chat_id!: string;

    @prop({required: true, ref: () => Folder, type: () => String})
    public folder_id!: string;
}

@modelOptions({schemaOptions: {autoCreate: true, timestamps: true}})
export class Plan {
    @prop({required: true, ref: () => Project})
    public project_id!: string;

    @prop({required: true})
    public name!: string;

    @prop({default: 0, min: 0, max: 100})
    public progress!: number;

    @prop({required: true})
    public start_date!: Date;

    @prop({required: true})
    public end_date!: Date;

    @prop({default: null})
    public task?: Task
}

const PlanModel = getModelForClass(Plan);
