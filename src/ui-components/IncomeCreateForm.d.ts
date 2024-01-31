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
export declare type IncomeCreateFormInputValues = {
    ownerId?: string;
    props?: string;
};
export declare type IncomeCreateFormValidationValues = {
    ownerId?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncomeCreateFormOverridesProps = {
    IncomeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerId?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type IncomeCreateFormProps = React.PropsWithChildren<{
    overrides?: IncomeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: IncomeCreateFormInputValues) => IncomeCreateFormInputValues;
    onSuccess?: (fields: IncomeCreateFormInputValues) => void;
    onError?: (fields: IncomeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncomeCreateFormInputValues) => IncomeCreateFormInputValues;
    onValidate?: IncomeCreateFormValidationValues;
} & React.CSSProperties>;
export default function IncomeCreateForm(props: IncomeCreateFormProps): React.ReactElement;
