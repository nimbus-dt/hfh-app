/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { UserProps } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserPropsUpdateFormInputValues = {
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
export declare type UserPropsUpdateFormValidationValues = {
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
export declare type UserPropsUpdateFormOverridesProps = {
    UserPropsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type UserPropsUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserPropsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userProps?: UserProps;
    onSubmit?: (fields: UserPropsUpdateFormInputValues) => UserPropsUpdateFormInputValues;
    onSuccess?: (fields: UserPropsUpdateFormInputValues) => void;
    onError?: (fields: UserPropsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPropsUpdateFormInputValues) => UserPropsUpdateFormInputValues;
    onValidate?: UserPropsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserPropsUpdateForm(props: UserPropsUpdateFormProps): React.ReactElement;
