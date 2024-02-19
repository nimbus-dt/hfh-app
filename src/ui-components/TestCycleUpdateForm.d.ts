/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { TestCycle } from "../models";
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
export declare type TestCycleUpdateFormInputValues = {
    startDate?: string;
    endDate?: string;
    isOpen?: boolean;
    props?: string;
};
export declare type TestCycleUpdateFormValidationValues = {
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    isOpen?: ValidationFunction<boolean>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestCycleUpdateFormOverridesProps = {
    TestCycleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    isOpen?: PrimitiveOverrideProps<SwitchFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type TestCycleUpdateFormProps = React.PropsWithChildren<{
    overrides?: TestCycleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    testCycle?: TestCycle;
    onSubmit?: (fields: TestCycleUpdateFormInputValues) => TestCycleUpdateFormInputValues;
    onSuccess?: (fields: TestCycleUpdateFormInputValues) => void;
    onError?: (fields: TestCycleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestCycleUpdateFormInputValues) => TestCycleUpdateFormInputValues;
    onValidate?: TestCycleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TestCycleUpdateForm(props: TestCycleUpdateFormProps): React.ReactElement;
