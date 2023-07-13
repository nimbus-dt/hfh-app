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
export declare type HouseholdMemberCreateFormInputValues = {
    name?: string;
    dateOfBirth?: string;
    sex?: string;
    relationship?: string;
    isCoapplicant?: boolean;
};
export declare type HouseholdMemberCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    dateOfBirth?: ValidationFunction<string>;
    sex?: ValidationFunction<string>;
    relationship?: ValidationFunction<string>;
    isCoapplicant?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HouseholdMemberCreateFormOverridesProps = {
    HouseholdMemberCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    sex?: PrimitiveOverrideProps<SelectFieldProps>;
    relationship?: PrimitiveOverrideProps<SelectFieldProps>;
    isCoapplicant?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type HouseholdMemberCreateFormProps = React.PropsWithChildren<{
    overrides?: HouseholdMemberCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HouseholdMemberCreateFormInputValues) => HouseholdMemberCreateFormInputValues;
    onSuccess?: (fields: HouseholdMemberCreateFormInputValues) => void;
    onError?: (fields: HouseholdMemberCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HouseholdMemberCreateFormInputValues) => HouseholdMemberCreateFormInputValues;
    onValidate?: HouseholdMemberCreateFormValidationValues;
} & React.CSSProperties>;
export default function HouseholdMemberCreateForm(props: HouseholdMemberCreateFormProps): React.ReactElement;
