/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { IncomeRecord } from "../models";
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
export declare type IncomeRecordUpdateFormInputValues = {
    ownerID?: string;
    typeOfIncome?: string;
    employer?: string;
    estimatedMonthlyIncome?: number;
    proofOfIncome?: string[];
    ownerApplicant?: boolean;
    employmentTime?: number;
};
export declare type IncomeRecordUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    typeOfIncome?: ValidationFunction<string>;
    employer?: ValidationFunction<string>;
    estimatedMonthlyIncome?: ValidationFunction<number>;
    proofOfIncome?: ValidationFunction<string>;
    ownerApplicant?: ValidationFunction<boolean>;
    employmentTime?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncomeRecordUpdateFormOverridesProps = {
    IncomeRecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    typeOfIncome?: PrimitiveOverrideProps<SelectFieldProps>;
    employer?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedMonthlyIncome?: PrimitiveOverrideProps<TextFieldProps>;
    proofOfIncome?: PrimitiveOverrideProps<TextFieldProps>;
    ownerApplicant?: PrimitiveOverrideProps<SwitchFieldProps>;
    employmentTime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IncomeRecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: IncomeRecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    incomeRecord?: IncomeRecord;
    onSubmit?: (fields: IncomeRecordUpdateFormInputValues) => IncomeRecordUpdateFormInputValues;
    onSuccess?: (fields: IncomeRecordUpdateFormInputValues) => void;
    onError?: (fields: IncomeRecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncomeRecordUpdateFormInputValues) => IncomeRecordUpdateFormInputValues;
    onValidate?: IncomeRecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IncomeRecordUpdateForm(props: IncomeRecordUpdateFormProps): React.ReactElement;
