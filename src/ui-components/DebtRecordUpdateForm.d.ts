/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { DebtRecord } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DebtRecordUpdateFormInputValues = {
    ownerID?: string;
    monthlyRecurrence?: number;
    typeOfDebt?: string;
    estimatedAmount?: number;
    ownerApplicant?: boolean;
};
export declare type DebtRecordUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    monthlyRecurrence?: ValidationFunction<number>;
    typeOfDebt?: ValidationFunction<string>;
    estimatedAmount?: ValidationFunction<number>;
    ownerApplicant?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DebtRecordUpdateFormOverridesProps = {
    DebtRecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    monthlyRecurrence?: PrimitiveOverrideProps<TextFieldProps>;
    typeOfDebt?: PrimitiveOverrideProps<SelectFieldProps>;
    estimatedAmount?: PrimitiveOverrideProps<TextFieldProps>;
    ownerApplicant?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type DebtRecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: DebtRecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    debtRecord?: DebtRecord;
    onSubmit?: (fields: DebtRecordUpdateFormInputValues) => DebtRecordUpdateFormInputValues;
    onSuccess?: (fields: DebtRecordUpdateFormInputValues) => void;
    onError?: (fields: DebtRecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DebtRecordUpdateFormInputValues) => DebtRecordUpdateFormInputValues;
    onValidate?: DebtRecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DebtRecordUpdateForm(props: DebtRecordUpdateFormProps): React.ReactElement;
