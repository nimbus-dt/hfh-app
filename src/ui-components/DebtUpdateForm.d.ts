/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Debt } from "../models";
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
export declare type DebtUpdateFormInputValues = {
    ownerId?: string;
    props?: string;
};
export declare type DebtUpdateFormValidationValues = {
    ownerId?: ValidationFunction<string>;
    props?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DebtUpdateFormOverridesProps = {
    DebtUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ownerId?: PrimitiveOverrideProps<TextFieldProps>;
    props?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type DebtUpdateFormProps = React.PropsWithChildren<{
    overrides?: DebtUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    debt?: Debt;
    onSubmit?: (fields: DebtUpdateFormInputValues) => DebtUpdateFormInputValues;
    onSuccess?: (fields: DebtUpdateFormInputValues) => void;
    onError?: (fields: DebtUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DebtUpdateFormInputValues) => DebtUpdateFormInputValues;
    onValidate?: DebtUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DebtUpdateForm(props: DebtUpdateFormProps): React.ReactElement;
