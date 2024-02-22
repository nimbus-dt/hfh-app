/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CyclesCreateFormInputValues = {
    cycleStartDate?: string;
    cycleEndDate?: string;
    cycleStatus?: boolean;
    cycleSeason?: string;
};
export declare type CyclesCreateFormValidationValues = {
    cycleStartDate?: ValidationFunction<string>;
    cycleEndDate?: ValidationFunction<string>;
    cycleStatus?: ValidationFunction<boolean>;
    cycleSeason?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CyclesCreateFormOverridesProps = {
    CyclesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cycleStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    cycleEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    cycleStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    cycleSeason?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CyclesCreateFormProps = React.PropsWithChildren<{
    overrides?: CyclesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CyclesCreateFormInputValues) => CyclesCreateFormInputValues;
    onSuccess?: (fields: CyclesCreateFormInputValues) => void;
    onError?: (fields: CyclesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CyclesCreateFormInputValues) => CyclesCreateFormInputValues;
    onValidate?: CyclesCreateFormValidationValues;
} & React.CSSProperties>;
export default function CyclesCreateForm(props: CyclesCreateFormProps): React.ReactElement;
