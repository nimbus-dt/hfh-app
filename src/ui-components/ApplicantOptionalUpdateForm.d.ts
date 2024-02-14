/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ApplicantOptional } from "../models";
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
export declare type ApplicantOptionalUpdateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type ApplicantOptionalUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicantOptionalUpdateFormOverridesProps = {
    ApplicantOptionalUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ApplicantOptionalUpdateFormProps = React.PropsWithChildren<{
    overrides?: ApplicantOptionalUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    applicantOptional?: ApplicantOptional;
    onSubmit?: (fields: ApplicantOptionalUpdateFormInputValues) => ApplicantOptionalUpdateFormInputValues;
    onSuccess?: (fields: ApplicantOptionalUpdateFormInputValues) => void;
    onError?: (fields: ApplicantOptionalUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicantOptionalUpdateFormInputValues) => ApplicantOptionalUpdateFormInputValues;
    onValidate?: ApplicantOptionalUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicantOptionalUpdateForm(props: ApplicantOptionalUpdateFormProps): React.ReactElement;
