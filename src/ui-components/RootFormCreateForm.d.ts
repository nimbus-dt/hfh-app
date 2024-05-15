/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type RootFormCreateFormInputValues = {
    name?: string;
    status?: string;
    description?: string;
    files?: string[];
    formUrls?: string[];
};
export declare type RootFormCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    files?: ValidationFunction<string>;
    formUrls?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RootFormCreateFormOverridesProps = {
    RootFormCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    files?: PrimitiveOverrideProps<TextFieldProps>;
    formUrls?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RootFormCreateFormProps = React.PropsWithChildren<{
    overrides?: RootFormCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RootFormCreateFormInputValues) => RootFormCreateFormInputValues;
    onSuccess?: (fields: RootFormCreateFormInputValues) => void;
    onError?: (fields: RootFormCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RootFormCreateFormInputValues) => RootFormCreateFormInputValues;
    onValidate?: RootFormCreateFormValidationValues;
} & React.CSSProperties>;
export default function RootFormCreateForm(props: RootFormCreateFormProps): React.ReactElement;
