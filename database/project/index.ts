import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "../user";
import {Plan} from "../plan";
import {Summary} from "../summary";
import {v4} from "uuid";

class Status {
    public constructor(id: number, name: string, order: number) {
        this.id = id;
        this.name = name;
        this.order = order;
    }

    @prop({required: true})
    public id!: number;

    @prop({required: true})
    public name!: string;

    @prop({required: true})
    public order!: number;
}

const Proposal = new Status(1, "Proposal", 1)
const Research = new Status(2, "Research", 2)
const Finish = new Status(3, "Finish", 3)

function validateStatus(s: Status) {
    return s == Proposal || s == Research || s == Finish;
}

@modelOptions({schemaOptions: {autoCreate: true, timestamps: true}})
export class Project {
    @prop({required: true})
    public name!: string;

    @prop({default: 0, min: 0, max: 100})
    public progress!: number;

    @prop({type: Status, default: Proposal, validate: [validateStatus, "Invalid status"]})
    public status!: Status;

    @prop({ref: () => User, type: () => String, default: []})
    public advisors!: Ref<User, string>[];

    @prop({ref: () => User, type: () => String, default: []})
    public advisee!: Ref<User, string>[];

    @prop({
        ref: () => Summary,
        foreignField: 'project_id',
        localField: '_id',
    })
    public summary_id!: Ref<Summary, string>[];

    @prop({
        ref: () => Plan,
        foreignField: 'project_id',
        localField: '_id',
    })
    public plan_id!: Ref<Plan, string>[];
}

const ProjectModel = getModelForClass(Project);