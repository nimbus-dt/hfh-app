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
export declare type ApplicantInfoCreateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type ApplicantInfoCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicantInfoCreateFormOverridesProps = {
    ApplicantInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ApplicantInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: ApplicantInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ApplicantInfoCreateFormInputValues) => ApplicantInfoCreateFormInputValues;
    onSuccess?: (fields: ApplicantInfoCreateFormInputValues) => void;
    onError?: (fields: ApplicantInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicantInfoCreateFormInputValues) => ApplicantInfoCreateFormInputValues;
    onValidate?: ApplicantInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicantInfoCreateForm(props: ApplicantInfoCreateFormProps): React.ReactElement;
