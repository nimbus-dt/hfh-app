/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TestApplicationCreateFormInputValues = {
    ownerID?: string;
    lastSection?: string;
    submittedDate?: string;
    reviewStatus?: string;
    submissionStatus?: string;
    props?: string;
    type?: string;
};
export declare type TestApplicationCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    lastSection?: ValidationFunction<string>;
    submittedDate?: ValidationFunction<string>;
    reviewStatus?: ValidationFunction<string>;
    submissionStatus?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestApplicationCreateFormOverridesProps = {
    TestApplicationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    lastSection?: PrimitiveOverrideProps<TextFieldProps>;
    submittedDate?: PrimitiveOverrideProps<TextFieldProps>;
    reviewStatus?: PrimitiveOverrideProps<TextFieldProps>;
    submissionStatus?: PrimitiveOverrideProps<SelectFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TestApplicationCreateFormProps = React.PropsWithChildren<{
    overrides?: TestApplicationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestApplicationCreateFormInputValues) => TestApplicationCreateFormInputValues;
    onSuccess?: (fields: TestApplicationCreateFormInputValues) => void;
    onError?: (fields: TestApplicationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestApplicationCreateFormInputValues) => TestApplicationCreateFormInputValues;
    onValidate?: TestApplicationCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestApplicationCreateForm(props: TestApplicationCreateFormProps): React.ReactElement;
