/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Cycles } from "../models";
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
export declare type CyclesUpdateFormInputValues = {
    cycleStartDate?: string;
    cycleEndDate?: string;
    cycleStatus?: boolean;
    cycleSeason?: string;
};
export declare type CyclesUpdateFormValidationValues = {
    cycleStartDate?: ValidationFunction<string>;
    cycleEndDate?: ValidationFunction<string>;
    cycleStatus?: ValidationFunction<boolean>;
    cycleSeason?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CyclesUpdateFormOverridesProps = {
    CyclesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cycleStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    cycleEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    cycleStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    cycleSeason?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CyclesUpdateFormProps = React.PropsWithChildren<{
    overrides?: CyclesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    cycles?: Cycles;
    onSubmit?: (fields: CyclesUpdateFormInputValues) => CyclesUpdateFormInputValues;
    onSuccess?: (fields: CyclesUpdateFormInputValues) => void;
    onError?: (fields: CyclesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CyclesUpdateFormInputValues) => CyclesUpdateFormInputValues;
    onValidate?: CyclesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CyclesUpdateForm(props: CyclesUpdateFormProps): React.ReactElement;
