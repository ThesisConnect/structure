import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "../user";

@modelOptions({schemaOptions: {autoCreate: true, timestamps: true}})
export class Folder {
    @prop({required: true})
    public name!: string;

    @prop({ref: () => Folder, type: () => String, default: []})
    public folders?: Ref<Folder, string>[];

    @prop({ref: () => File, type: () => String, default: []})
    public files?: Ref<File, string>[];

    @prop({ref: () => User, type: () => String, default: []})
    public share!: Ref<User, string>[];
}

const FolderModel = getModelForClass(Folder);

@modelOptions({schemaOptions: {autoCreate: true, timestamps: true}})
export class File {
    @prop({required: true})
    public name!: string;

    @prop({required: true})
    public url!: string;

    @prop({required: true})
    public size!: number;

    @prop({required: true})
    public type!: string;
}

const FileModel = getModelForClass(File);
