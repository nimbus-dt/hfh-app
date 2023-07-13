/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ContactFormCreateFormInputValues = {
    name?: string;
    affiliate?: string;
    contactEmail?: string;
};
export declare type ContactFormCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    affiliate?: ValidationFunction<string>;
    contactEmail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactFormCreateFormOverridesProps = {
    ContactFormCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    affiliate?: PrimitiveOverrideProps<TextFieldProps>;
    contactEmail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContactFormCreateFormProps = React.PropsWithChildren<{
    overrides?: ContactFormCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ContactFormCreateFormInputValues) => ContactFormCreateFormInputValues;
    onSuccess?: (fields: ContactFormCreateFormInputValues) => void;
    onError?: (fields: ContactFormCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContactFormCreateFormInputValues) => ContactFormCreateFormInputValues;
    onValidate?: ContactFormCreateFormValidationValues;
} & React.CSSProperties>;
export default function ContactFormCreateForm(props: ContactFormCreateFormProps): React.ReactElement;
