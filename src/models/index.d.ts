import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum ApplicationSubmittedStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED"
}

export enum DebtTypes {
  MEDICAL = "MEDICAL",
  STUDENT_LOANS = "STUDENT_LOANS",
  COLLECTIONS = "COLLECTIONS",
  CAR = "CAR",
  PERSONAL_LOANS = "PERSONAL_LOANS",
  INSTALLMENT_LOANS = "INSTALLMENT_LOANS",
  CREDIT_CARD = "CREDIT_CARD",
  CHILD_SUPPORT = "CHILD_SUPPORT",
  ALIMONY = "ALIMONY",
  OTHER = "OTHER"
}

export enum IncomeTypes {
  SALARIED_EMPLOYMENT = "SALARIED_EMPLOYMENT",
  HOURLY_EMPLOYMENT = "HOURLY_EMPLOYMENT",
  SELF_EMPLOYMENT = "SELF_EMPLOYMENT",
  SOCIAL_SECURITY_DISABILITY_INSURANCE = "SOCIAL_SECURITY_DISABILITY_INSURANCE",
  SOCIAL_SECURITY_BENEFITS = "SOCIAL_SECURITY_BENEFITS",
  SUPPLEMENTAL_SECURITY_INCOME = "SUPPLEMENTAL_SECURITY_INCOME",
  HOUSING_VOUCHER = "HOUSING_VOUCHER",
  CHILD_SUPPORT = "CHILD_SUPPORT",
  ALIMONY_SUPPORT = "ALIMONY_SUPPORT",
  VETERANS_AFFAIR_COMPENSATION = "VETERANS_AFFAIR_COMPENSATION",
  PENSION_PAYMENTS = "PENSION_PAYMENTS",
  MILITARY_ENTITLEMENTS = "MILITARY_ENTITLEMENTS",
  OTHER = "OTHER"
}

export enum SexTypes {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export enum RelationshipTypes {
  SPOUSE = "SPOUSE",
  SON = "SON",
  DAUGHTER = "DAUGHTER",
  NEPHEW = "NEPHEW",
  NIECE = "NIECE",
  PARENT = "PARENT",
  SIBLING = "SIBLING",
  OTHER = "OTHER"
}



type EagerContactForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly affiliate?: string | null;
  readonly contactEmail?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContactForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly affiliate?: string | null;
  readonly contactEmail?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ContactForm = LazyLoading extends LazyLoadingDisabled ? EagerContactForm : LazyContactForm

export declare const ContactForm: (new (init: ModelInit<ContactForm>) => ContactForm) & {
  copyOf(source: ContactForm, mutator: (draft: MutableModel<ContactForm>) => MutableModel<ContactForm> | void): ContactForm;
}

type EagerUserProps = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProps, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly name?: string | null;
  readonly dob?: string | null;
  readonly sex?: SexTypes | keyof typeof SexTypes | null;
  readonly phone?: string | null;
  readonly props?: string | null;
  readonly address?: string | null;
  readonly zip?: number | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserProps = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProps, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly name?: string | null;
  readonly dob?: string | null;
  readonly sex?: SexTypes | keyof typeof SexTypes | null;
  readonly phone?: string | null;
  readonly props?: string | null;
  readonly address?: string | null;
  readonly zip?: number | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserProps = LazyLoading extends LazyLoadingDisabled ? EagerUserProps : LazyUserProps

export declare const UserProps: (new (init: ModelInit<UserProps>) => UserProps) & {
  copyOf(source: UserProps, mutator: (draft: MutableModel<UserProps>) => MutableModel<UserProps> | void): UserProps;
}

type EagerDebtRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DebtRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly monthlyRecurrence?: number | null;
  readonly typeOfDebt?: DebtTypes | keyof typeof DebtTypes | null;
  readonly estimatedAmount?: number | null;
  readonly applicationID?: string | null;
  readonly ownerApplicant?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDebtRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DebtRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly monthlyRecurrence?: number | null;
  readonly typeOfDebt?: DebtTypes | keyof typeof DebtTypes | null;
  readonly estimatedAmount?: number | null;
  readonly applicationID?: string | null;
  readonly ownerApplicant?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DebtRecord = LazyLoading extends LazyLoadingDisabled ? EagerDebtRecord : LazyDebtRecord

export declare const DebtRecord: (new (init: ModelInit<DebtRecord>) => DebtRecord) & {
  copyOf(source: DebtRecord, mutator: (draft: MutableModel<DebtRecord>) => MutableModel<DebtRecord> | void): DebtRecord;
}

type EagerSavingRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavingRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly institution?: string | null;
  readonly estimatedAmount?: number | null;
  readonly applicationID?: string | null;
  readonly ownerApplicant?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySavingRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavingRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly institution?: string | null;
  readonly estimatedAmount?: number | null;
  readonly applicationID?: string | null;
  readonly ownerApplicant?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SavingRecord = LazyLoading extends LazyLoadingDisabled ? EagerSavingRecord : LazySavingRecord

export declare const SavingRecord: (new (init: ModelInit<SavingRecord>) => SavingRecord) & {
  copyOf(source: SavingRecord, mutator: (draft: MutableModel<SavingRecord>) => MutableModel<SavingRecord> | void): SavingRecord;
}

type EagerIncomeRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IncomeRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly typeOfIncome?: IncomeTypes | keyof typeof IncomeTypes | null;
  readonly employer?: string | null;
  readonly estimatedMonthlyIncome?: number | null;
  readonly proofOfIncome?: (string | null)[] | null;
  readonly applicationID?: string | null;
  readonly ownerApplicant?: boolean | null;
  readonly totalIncome?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIncomeRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IncomeRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly typeOfIncome?: IncomeTypes | keyof typeof IncomeTypes | null;
  readonly employer?: string | null;
  readonly estimatedMonthlyIncome?: number | null;
  readonly proofOfIncome?: (string | null)[] | null;
  readonly applicationID?: string | null;
  readonly ownerApplicant?: boolean | null;
  readonly totalIncome?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type IncomeRecord = LazyLoading extends LazyLoadingDisabled ? EagerIncomeRecord : LazyIncomeRecord

export declare const IncomeRecord: (new (init: ModelInit<IncomeRecord>) => IncomeRecord) & {
  copyOf(source: IncomeRecord, mutator: (draft: MutableModel<IncomeRecord>) => MutableModel<IncomeRecord> | void): IncomeRecord;
}

type EagerHouseholdMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HouseholdMember, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly dateOfBirth?: string | null;
  readonly sex?: SexTypes | keyof typeof SexTypes | null;
  readonly relationship?: RelationshipTypes | keyof typeof RelationshipTypes | null;
  readonly isCoapplicant?: boolean | null;
  readonly applicationID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHouseholdMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HouseholdMember, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly dateOfBirth?: string | null;
  readonly sex?: SexTypes | keyof typeof SexTypes | null;
  readonly relationship?: RelationshipTypes | keyof typeof RelationshipTypes | null;
  readonly isCoapplicant?: boolean | null;
  readonly applicationID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HouseholdMember = LazyLoading extends LazyLoadingDisabled ? EagerHouseholdMember : LazyHouseholdMember

export declare const HouseholdMember: (new (init: ModelInit<HouseholdMember>) => HouseholdMember) & {
  copyOf(source: HouseholdMember, mutator: (draft: MutableModel<HouseholdMember>) => MutableModel<HouseholdMember> | void): HouseholdMember;
}

type EagerApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly habitatID: string;
  readonly HouseholdMembers?: (HouseholdMember | null)[] | null;
  readonly IncomeRecords?: (IncomeRecord | null)[] | null;
  readonly SavingRecords?: (SavingRecord | null)[] | null;
  readonly DebtRecords?: (DebtRecord | null)[] | null;
  readonly submitted?: boolean | null;
  readonly dateSubmitted?: string | null;
  readonly submittedStatus?: ApplicationSubmittedStatus | keyof typeof ApplicationSubmittedStatus | null;
  readonly habitatRevisor?: string | null;
  readonly dateRevised?: string | null;
  readonly ownerName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Application, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly habitatID: string;
  readonly HouseholdMembers: AsyncCollection<HouseholdMember>;
  readonly IncomeRecords: AsyncCollection<IncomeRecord>;
  readonly SavingRecords: AsyncCollection<SavingRecord>;
  readonly DebtRecords: AsyncCollection<DebtRecord>;
  readonly submitted?: boolean | null;
  readonly dateSubmitted?: string | null;
  readonly submittedStatus?: ApplicationSubmittedStatus | keyof typeof ApplicationSubmittedStatus | null;
  readonly habitatRevisor?: string | null;
  readonly dateRevised?: string | null;
  readonly ownerName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Application = LazyLoading extends LazyLoadingDisabled ? EagerApplication : LazyApplication

export declare const Application: (new (init: ModelInit<Application>) => Application) & {
  copyOf(source: Application, mutator: (draft: MutableModel<Application>) => MutableModel<Application> | void): Application;
}

type EagerHabitat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Habitat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly urlName?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly county?: string | null;
  readonly countiesServed?: (string | null)[] | null;
  readonly props?: string | null;
  readonly Applications?: (Application | null)[] | null;
  readonly users?: (string | null)[] | null;
  readonly AMI?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHabitat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Habitat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly urlName?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly county?: string | null;
  readonly countiesServed?: (string | null)[] | null;
  readonly props?: string | null;
  readonly Applications: AsyncCollection<Application>;
  readonly users?: (string | null)[] | null;
  readonly AMI?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Habitat = LazyLoading extends LazyLoadingDisabled ? EagerHabitat : LazyHabitat

export declare const Habitat: (new (init: ModelInit<Habitat>) => Habitat) & {
  copyOf(source: Habitat, mutator: (draft: MutableModel<Habitat>) => MutableModel<Habitat> | void): Habitat;
}