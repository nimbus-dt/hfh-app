/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { HouseholdMember } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HouseholdMemberUpdateFormInputValues = {
    name?: string;
    dateOfBirth?: string;
    sex?: string;
    relationship?: string;
    isCoapplicant?: boolean;
};
export declare type HouseholdMemberUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    dateOfBirth?: ValidationFunction<string>;
    sex?: ValidationFunction<string>;
    relationship?: ValidationFunction<string>;
    isCoapplicant?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HouseholdMemberUpdateFormOverridesProps = {
    HouseholdMemberUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    sex?: PrimitiveOverrideProps<SelectFieldProps>;
    relationship?: PrimitiveOverrideProps<SelectFieldProps>;
    isCoapplicant?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type HouseholdMemberUpdateFormProps = React.PropsWithChildren<{
    overrides?: HouseholdMemberUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    householdMember?: HouseholdMember;
    onSubmit?: (fields: HouseholdMemberUpdateFormInputValues) => HouseholdMemberUpdateFormInputValues;
    onSuccess?: (fields: HouseholdMemberUpdateFormInputValues) => void;
    onError?: (fields: HouseholdMemberUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HouseholdMemberUpdateFormInputValues) => HouseholdMemberUpdateFormInputValues;
    onValidate?: HouseholdMemberUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HouseholdMemberUpdateForm(props: HouseholdMemberUpdateFormProps): React.ReactElement;
