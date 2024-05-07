/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TestCycleCreateFormInputValues = {
    startDate?: string;
    endDate?: string;
    isOpen?: boolean;
    props?: string;
    name?: string;
    closedCycleMessage?: string;
    formUrl?: string;
};
export declare type TestCycleCreateFormValidationValues = {
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    isOpen?: ValidationFunction<boolean>;
    props?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    closedCycleMessage?: ValidationFunction<string>;
    formUrl?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestCycleCreateFormOverridesProps = {
    TestCycleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    isOpen?: PrimitiveOverrideProps<SwitchFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    closedCycleMessage?: PrimitiveOverrideProps<TextFieldProps>;
    formUrl?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TestCycleCreateFormProps = React.PropsWithChildren<{
    overrides?: TestCycleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestCycleCreateFormInputValues) => TestCycleCreateFormInputValues;
    onSuccess?: (fields: TestCycleCreateFormInputValues) => void;
    onError?: (fields: TestCycleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestCycleCreateFormInputValues) => TestCycleCreateFormInputValues;
    onValidate?: TestCycleCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestCycleCreateForm(props: TestCycleCreateFormProps): React.ReactElement;
