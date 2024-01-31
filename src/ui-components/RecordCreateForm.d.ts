/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Record } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RecordCreateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type RecordCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecordCreateFormOverridesProps = {
    RecordCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type RecordCreateFormProps = React.PropsWithChildren<{
    overrides?: RecordCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RecordCreateFormInputValues) => RecordCreateFormInputValues;
    onSuccess?: (fields: RecordCreateFormInputValues) => void;
    onError?: (fields: RecordCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecordCreateFormInputValues) => RecordCreateFormInputValues;
    onValidate?: RecordCreateFormValidationValues;
} & React.CSSProperties>;
export default function RecordCreateForm(props: RecordCreateFormProps): React.ReactElement;
