/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Written } from "../models";
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
export declare type WrittenUpdateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type WrittenUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WrittenUpdateFormOverridesProps = {
    WrittenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type WrittenUpdateFormProps = React.PropsWithChildren<{
    overrides?: WrittenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    written?: Written;
    onSubmit?: (fields: WrittenUpdateFormInputValues) => WrittenUpdateFormInputValues;
    onSuccess?: (fields: WrittenUpdateFormInputValues) => void;
    onError?: (fields: WrittenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WrittenUpdateFormInputValues) => WrittenUpdateFormInputValues;
    onValidate?: WrittenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WrittenUpdateForm(props: WrittenUpdateFormProps): React.ReactElement;
