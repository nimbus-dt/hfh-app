/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserPropsCreateFormInputValues = {
    ownerID?: string;
    name?: string;
    dob?: string;
    sex?: string;
    phone?: string;
    props?: string;
    address?: string;
    zip?: number;
    email?: string;
};
export declare type UserPropsCreateFormValidationValues = {
    ownerID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    dob?: ValidationFunction<string>;
    sex?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    zip?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPropsCreateFormOverridesProps = {
    UserPropsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    dob?: PrimitiveOverrideProps<TextFieldProps>;
    sex?: PrimitiveOverrideProps<SelectFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    zip?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserPropsCreateFormProps = React.PropsWithChildren<{
    overrides?: UserPropsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserPropsCreateFormInputValues) => UserPropsCreateFormInputValues;
    onSuccess?: (fields: UserPropsCreateFormInputValues) => void;
    onError?: (fields: UserPropsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPropsCreateFormInputValues) => UserPropsCreateFormInputValues;
    onValidate?: UserPropsCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserPropsCreateForm(props: UserPropsCreateFormProps): React.ReactElement;
