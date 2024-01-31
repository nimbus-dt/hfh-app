/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmploymentInfo } from "../models";
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
export declare type EmploymentInfoUpdateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type EmploymentInfoUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmploymentInfoUpdateFormOverridesProps = {
    EmploymentInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type EmploymentInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmploymentInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    employmentInfo?: EmploymentInfo;
    onSubmit?: (fields: EmploymentInfoUpdateFormInputValues) => EmploymentInfoUpdateFormInputValues;
    onSuccess?: (fields: EmploymentInfoUpdateFormInputValues) => void;
    onError?: (fields: EmploymentInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmploymentInfoUpdateFormInputValues) => EmploymentInfoUpdateFormInputValues;
    onValidate?: EmploymentInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmploymentInfoUpdateForm(props: EmploymentInfoUpdateFormProps): React.ReactElement;
