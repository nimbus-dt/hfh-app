/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Record } from "../models";
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
export declare type RecordUpdateFormInputValues = {
    ownerID?: string;
    props?: string;
};
export declare type RecordUpdateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecordUpdateFormOverridesProps = {
    RecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type RecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: RecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    record?: Record;
    onSubmit?: (fields: RecordUpdateFormInputValues) => RecordUpdateFormInputValues;
    onSuccess?: (fields: RecordUpdateFormInputValues) => void;
    onError?: (fields: RecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecordUpdateFormInputValues) => RecordUpdateFormInputValues;
    onValidate?: RecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RecordUpdateForm(props: RecordUpdateFormProps): React.ReactElement;
