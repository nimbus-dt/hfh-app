/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type IncomeRecordCreateFormInputValues = {
    ownerID?: string;
    typeOfIncome?: string;
    employer?: string;
    estimatedMonthlyIncome?: number;
    proofOfIncome?: string[];
    ownerApplicant?: boolean;
    totalIncome?: number;
};
export declare type IncomeRecordCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    typeOfIncome?: ValidationFunction<string>;
    employer?: ValidationFunction<string>;
    estimatedMonthlyIncome?: ValidationFunction<number>;
    proofOfIncome?: ValidationFunction<string>;
    ownerApplicant?: ValidationFunction<boolean>;
    totalIncome?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncomeRecordCreateFormOverridesProps = {
    IncomeRecordCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    typeOfIncome?: PrimitiveOverrideProps<SelectFieldProps>;
    employer?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedMonthlyIncome?: PrimitiveOverrideProps<TextFieldProps>;
    proofOfIncome?: PrimitiveOverrideProps<TextFieldProps>;
    ownerApplicant?: PrimitiveOverrideProps<SwitchFieldProps>;
    totalIncome?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IncomeRecordCreateFormProps = React.PropsWithChildren<{
    overrides?: IncomeRecordCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: IncomeRecordCreateFormInputValues) => IncomeRecordCreateFormInputValues;
    onSuccess?: (fields: IncomeRecordCreateFormInputValues) => void;
    onError?: (fields: IncomeRecordCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncomeRecordCreateFormInputValues) => IncomeRecordCreateFormInputValues;
    onValidate?: IncomeRecordCreateFormValidationValues;
} & React.CSSProperties>;
export default function IncomeRecordCreateForm(props: IncomeRecordCreateFormProps): React.ReactElement;
