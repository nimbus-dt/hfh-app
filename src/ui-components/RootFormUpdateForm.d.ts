/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { RootForm } from "../models";
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
export declare type RootFormUpdateFormInputValues = {
    name?: string;
    status?: string;
    description?: string;
    files?: string[];
};
export declare type RootFormUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    files?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RootFormUpdateFormOverridesProps = {
    RootFormUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    files?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RootFormUpdateFormProps = React.PropsWithChildren<{
    overrides?: RootFormUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    rootForm?: RootForm;
    onSubmit?: (fields: RootFormUpdateFormInputValues) => RootFormUpdateFormInputValues;
    onSuccess?: (fields: RootFormUpdateFormInputValues) => void;
    onError?: (fields: RootFormUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RootFormUpdateFormInputValues) => RootFormUpdateFormInputValues;
    onValidate?: RootFormUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RootFormUpdateForm(props: RootFormUpdateFormProps): React.ReactElement;
