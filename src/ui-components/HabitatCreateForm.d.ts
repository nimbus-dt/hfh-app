/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HabitatCreateFormInputValues = {};
export declare type HabitatCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HabitatCreateFormOverridesProps = {
    HabitatCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
