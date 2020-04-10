import { PromptObject } from "prompts";
declare const _default: {
    path: string;
    questions: PromptObject<string>[];
    get: () => Promise<string>;
    write: (data: any) => Promise<void>;
    prompt: () => Promise<any>;
    messages: {
        success: string;
        fail: string;
    };
};
export default _default;
export declare interface UserConfig {
    typescript: boolean;
    srcDirectory: boolean;
}
