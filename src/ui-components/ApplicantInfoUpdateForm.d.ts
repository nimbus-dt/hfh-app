/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ApplicantInfo } from "../models";
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
export declare type ApplicantInfoUpdateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type ApplicantInfoUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicantInfoUpdateFormOverridesProps = {
    ApplicantInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ApplicantInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: ApplicantInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    applicantInfo?: ApplicantInfo;
    onSubmit?: (fields: ApplicantInfoUpdateFormInputValues) => ApplicantInfoUpdateFormInputValues;
    onSuccess?: (fields: ApplicantInfoUpdateFormInputValues) => void;
    onError?: (fields: ApplicantInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicantInfoUpdateFormInputValues) => ApplicantInfoUpdateFormInputValues;
    onValidate?: ApplicantInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicantInfoUpdateForm(props: ApplicantInfoUpdateFormProps): React.ReactElement;
