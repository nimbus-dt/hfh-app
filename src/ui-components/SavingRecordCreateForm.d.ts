/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SavingRecordCreateFormInputValues = {
    ownerID?: string;
    institution?: string;
    estimatedAmount?: number;
    applicationID?: string;
    ownerApplicant?: boolean;
};
export declare type SavingRecordCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    institution?: ValidationFunction<string>;
    estimatedAmount?: ValidationFunction<number>;
    applicationID?: ValidationFunction<string>;
    ownerApplicant?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SavingRecordCreateFormOverridesProps = {
    SavingRecordCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    institution?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedAmount?: PrimitiveOverrideProps<TextFieldProps>;
    applicationID?: PrimitiveOverrideProps<TextFieldProps>;
    ownerApplicant?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SavingRecordCreateFormProps = React.PropsWithChildren<{
    overrides?: SavingRecordCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SavingRecordCreateFormInputValues) => SavingRecordCreateFormInputValues;
    onSuccess?: (fields: SavingRecordCreateFormInputValues) => void;
    onError?: (fields: SavingRecordCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SavingRecordCreateFormInputValues) => SavingRecordCreateFormInputValues;
    onValidate?: SavingRecordCreateFormValidationValues;
} & React.CSSProperties>;
export default function SavingRecordCreateForm(props: SavingRecordCreateFormProps): React.ReactElement;
