/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps } from "@aws-amplify/ui-react";
import { Maintenance } from "../models";
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
export declare type MaintenanceUpdateFormInputValues = {
    maintenance?: boolean;
};
export declare type MaintenanceUpdateFormValidationValues = {
    maintenance?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MaintenanceUpdateFormOverridesProps = {
    MaintenanceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    maintenance?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MaintenanceUpdateFormProps = React.PropsWithChildren<{
    overrides?: MaintenanceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    maintenance?: Maintenance;
    onSubmit?: (fields: MaintenanceUpdateFormInputValues) => MaintenanceUpdateFormInputValues;
    onSuccess?: (fields: MaintenanceUpdateFormInputValues) => void;
    onError?: (fields: MaintenanceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MaintenanceUpdateFormInputValues) => MaintenanceUpdateFormInputValues;
    onValidate?: MaintenanceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MaintenanceUpdateForm(props: MaintenanceUpdateFormProps): React.ReactElement;
