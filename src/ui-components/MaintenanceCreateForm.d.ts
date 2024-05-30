/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps } from "@aws-amplify/ui-react";
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
export declare type MaintenanceCreateFormInputValues = {
    maintenance?: boolean;
};
export declare type MaintenanceCreateFormValidationValues = {
    maintenance?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MaintenanceCreateFormOverridesProps = {
    MaintenanceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    maintenance?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MaintenanceCreateFormProps = React.PropsWithChildren<{
    overrides?: MaintenanceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MaintenanceCreateFormInputValues) => MaintenanceCreateFormInputValues;
    onSuccess?: (fields: MaintenanceCreateFormInputValues) => void;
    onError?: (fields: MaintenanceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MaintenanceCreateFormInputValues) => MaintenanceCreateFormInputValues;
    onValidate?: MaintenanceCreateFormValidationValues;
} & React.CSSProperties>;
export default function MaintenanceCreateForm(props: MaintenanceCreateFormProps): React.ReactElement;
