/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Income } from "../models";
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
export declare type IncomeUpdateFormInputValues = {
    ownerId?: string;
    props?: string;
};
export declare type IncomeUpdateFormValidationValues = {
    ownerId?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncomeUpdateFormOverridesProps = {
    IncomeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerId?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type IncomeUpdateFormProps = React.PropsWithChildren<{
    overrides?: IncomeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    income?: Income;
    onSubmit?: (fields: IncomeUpdateFormInputValues) => IncomeUpdateFormInputValues;
    onSuccess?: (fields: IncomeUpdateFormInputValues) => void;
    onError?: (fields: IncomeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncomeUpdateFormInputValues) => IncomeUpdateFormInputValues;
    onValidate?: IncomeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IncomeUpdateForm(props: IncomeUpdateFormProps): React.ReactElement;
