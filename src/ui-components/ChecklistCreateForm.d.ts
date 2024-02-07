/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ChecklistCreateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type ChecklistCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChecklistCreateFormOverridesProps = {
    ChecklistCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ChecklistCreateFormProps = React.PropsWithChildren<{
    overrides?: ChecklistCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ChecklistCreateFormInputValues) => ChecklistCreateFormInputValues;
    onSuccess?: (fields: ChecklistCreateFormInputValues) => void;
    onError?: (fields: ChecklistCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChecklistCreateFormInputValues) => ChecklistCreateFormInputValues;
    onValidate?: ChecklistCreateFormValidationValues;
} & React.CSSProperties>;
export default function ChecklistCreateForm(props: ChecklistCreateFormProps): React.ReactElement;
