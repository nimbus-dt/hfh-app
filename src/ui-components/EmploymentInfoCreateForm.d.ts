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
export declare type EmploymentInfoCreateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type EmploymentInfoCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmploymentInfoCreateFormOverridesProps = {
    EmploymentInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type EmploymentInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: EmploymentInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmploymentInfoCreateFormInputValues) => EmploymentInfoCreateFormInputValues;
    onSuccess?: (fields: EmploymentInfoCreateFormInputValues) => void;
    onError?: (fields: EmploymentInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmploymentInfoCreateFormInputValues) => EmploymentInfoCreateFormInputValues;
    onValidate?: EmploymentInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmploymentInfoCreateForm(props: EmploymentInfoCreateFormProps): React.ReactElement;
