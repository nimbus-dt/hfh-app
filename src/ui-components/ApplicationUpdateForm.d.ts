/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Application } from "../models";
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
export declare type ApplicationUpdateFormInputValues = {
    ownerID?: string;
    habitatID?: string;
    submitted?: boolean;
    dateSubmitted?: string;
    submittedStatus?: string;
    habitatRevisor?: string;
    dateRevised?: string;
    ownerName?: string;
    timeStatus?: string;
};
export declare type ApplicationUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    habitatID?: ValidationFunction<string>;
    submitted?: ValidationFunction<boolean>;
    dateSubmitted?: ValidationFunction<string>;
    submittedStatus?: ValidationFunction<string>;
    habitatRevisor?: ValidationFunction<string>;
    dateRevised?: ValidationFunction<string>;
    ownerName?: ValidationFunction<string>;
    timeStatus?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationUpdateFormOverridesProps = {
    ApplicationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    habitatID?: PrimitiveOverrideProps<TextFieldProps>;
    submitted?: PrimitiveOverrideProps<SwitchFieldProps>;
    dateSubmitted?: PrimitiveOverrideProps<TextFieldProps>;
    submittedStatus?: PrimitiveOverrideProps<SelectFieldProps>;
    habitatRevisor?: PrimitiveOverrideProps<TextFieldProps>;
    dateRevised?: PrimitiveOverrideProps<TextFieldProps>;
    ownerName?: PrimitiveOverrideProps<TextFieldProps>;
    timeStatus?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ApplicationUpdateFormProps = React.PropsWithChildren<{
    overrides?: ApplicationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    application?: Application;
    onSubmit?: (fields: ApplicationUpdateFormInputValues) => ApplicationUpdateFormInputValues;
    onSuccess?: (fields: ApplicationUpdateFormInputValues) => void;
    onError?: (fields: ApplicationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicationUpdateFormInputValues) => ApplicationUpdateFormInputValues;
    onValidate?: ApplicationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicationUpdateForm(props: ApplicationUpdateFormProps): React.ReactElement;
