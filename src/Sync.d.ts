import {option} from "./ActionCreator";

export interface action {
    (): string;
    TYPE: string
}

export default class Sync {
    constructor(options: option);
    [prop: string]: action
}
