export interface IValueAttrs<T> {
    readonly value: T;
    readonly default: T;
    readonly name: string;
    readonly disabled: boolean;
    readonly visible: boolean;
    readonly required: boolean;
    readonly enum: Array<T>;
    readonly const: T;
    readonly options: Array<{ label: string; value: T }>;
}

export interface IValueConfig<T> extends Partial<IValueAttrs<T>> {
    readonly type: string;
    readonly title: string;
}

export interface IValue<T> extends IValueAttrs<T> {
    readonly type: string;
    readonly title: string;
    readonly modified: boolean;
    readonly validating: boolean;
    readonly syncing: boolean;
    readonly valid: boolean;
    readonly errors: Array<string>;
    readonly initial: T;
    setValue(value: T): void;
    setName(name: string): void;
    setTitle(title: string): void;
    setRequired(required: boolean): void;
    setDisabled(disabled: boolean): void;
    setVisible(visible: boolean): void;
    addError(error: string): void;
    addErrors(errors: Array<string>): void;
    clearErrors(): void;
    reset(): void;
    validate(): Promise<void>;

    asyncValidate(): Promise<Array<string>>;
    syncValidate(): Array<string>;
    asyncValidateBase(): Promise<Array<string>>;
    syncValidateBase(): Array<string>;
}
