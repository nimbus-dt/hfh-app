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
export declare type ApplicantOptionalCreateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type ApplicantOptionalCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicantOptionalCreateFormOverridesProps = {
    ApplicantOptionalCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ApplicantOptionalCreateFormProps = React.PropsWithChildren<{
    overrides?: ApplicantOptionalCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ApplicantOptionalCreateFormInputValues) => ApplicantOptionalCreateFormInputValues;
    onSuccess?: (fields: ApplicantOptionalCreateFormInputValues) => void;
    onError?: (fields: ApplicantOptionalCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicantOptionalCreateFormInputValues) => ApplicantOptionalCreateFormInputValues;
    onValidate?: ApplicantOptionalCreateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicantOptionalCreateForm(props: ApplicantOptionalCreateFormProps): React.ReactElement;
