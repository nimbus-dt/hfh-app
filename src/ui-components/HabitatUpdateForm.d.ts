/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Habitat } from "../models";
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
export declare type HabitatUpdateFormInputValues = {
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
export declare type HabitatUpdateFormValidationValues = {
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
export declare type HabitatUpdateFormOverridesProps = {
    HabitatUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type HabitatUpdateFormProps = React.PropsWithChildren<{
    overrides?: HabitatUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    habitat?: Habitat;
    onSubmit?: (fields: HabitatUpdateFormInputValues) => HabitatUpdateFormInputValues;
    onSuccess?: (fields: HabitatUpdateFormInputValues) => void;
    onError?: (fields: HabitatUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HabitatUpdateFormInputValues) => HabitatUpdateFormInputValues;
    onValidate?: HabitatUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HabitatUpdateForm(props: HabitatUpdateFormProps): React.ReactElement;
