/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SavingRecord } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SavingRecordUpdateFormInputValues = {
    ownerID?: string;
    institution?: string;
    estimatedAmount?: number;
    ownerApplicant?: boolean;
};
export declare type SavingRecordUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    institution?: ValidationFunction<string>;
    estimatedAmount?: ValidationFunction<number>;
    ownerApplicant?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SavingRecordUpdateFormOverridesProps = {
    SavingRecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    institution?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedAmount?: PrimitiveOverrideProps<TextFieldProps>;
    ownerApplicant?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SavingRecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: SavingRecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    savingRecord?: SavingRecord;
    onSubmit?: (fields: SavingRecordUpdateFormInputValues) => SavingRecordUpdateFormInputValues;
    onSuccess?: (fields: SavingRecordUpdateFormInputValues) => void;
    onError?: (fields: SavingRecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SavingRecordUpdateFormInputValues) => SavingRecordUpdateFormInputValues;
    onValidate?: SavingRecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SavingRecordUpdateForm(props: SavingRecordUpdateFormProps): React.ReactElement;
