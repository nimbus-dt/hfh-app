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
export declare type DebtCreateFormInputValues = {
    ownerId?: string;
    props?: string;
};
export declare type DebtCreateFormValidationValues = {
    ownerId?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DebtCreateFormOverridesProps = {
    DebtCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerId?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type DebtCreateFormProps = React.PropsWithChildren<{
    overrides?: DebtCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DebtCreateFormInputValues) => DebtCreateFormInputValues;
    onSuccess?: (fields: DebtCreateFormInputValues) => void;
    onError?: (fields: DebtCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DebtCreateFormInputValues) => DebtCreateFormInputValues;
    onValidate?: DebtCreateFormValidationValues;
} & React.CSSProperties>;
export default function DebtCreateForm(props: DebtCreateFormProps): React.ReactElement;
