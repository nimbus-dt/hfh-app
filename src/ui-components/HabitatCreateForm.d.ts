/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type HabitatCreateFormInputValues = {
    name?: string;
    urlName?: string;
    state?: string;
    city?: string;
    county?: string;
    countiesServed?: string[];
    props?: string;
    users?: string[];
    AMI?: string[];
};
export declare type HabitatCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    urlName?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    county?: ValidationFunction<string>;
    countiesServed?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
    users?: ValidationFunction<string>;
    AMI?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HabitatCreateFormOverridesProps = {
    HabitatCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    urlName?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    county?: PrimitiveOverrideProps<TextFieldProps>;
    countiesServed?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
    users?: PrimitiveOverrideProps<TextFieldProps>;
    AMI?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HabitatCreateFormProps = React.PropsWithChildren<{
    overrides?: HabitatCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HabitatCreateFormInputValues) => HabitatCreateFormInputValues;
    onSuccess?: (fields: HabitatCreateFormInputValues) => void;
    onError?: (fields: HabitatCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HabitatCreateFormInputValues) => HabitatCreateFormInputValues;
    onValidate?: HabitatCreateFormValidationValues;
} & React.CSSProperties>;
export default function HabitatCreateForm(props: HabitatCreateFormProps): React.ReactElement;
