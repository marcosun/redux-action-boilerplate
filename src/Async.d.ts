import {option} from "./ActionCreator";

export interface action {
    (): string;
    TYPE: string
    SUCCESS: string
    success: () => string
    FAILURE: string
    failure: () => string
}

export default class Async {
    constructor(options: option);
    [prop: string]: action
}
