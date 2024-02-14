import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum SubmissionStatus {
  SUBMITTED = "SUBMITTED",
  UNSUBMITTED = "UNSUBMITTED",
  RETURNED = "RETURNED"
}

export enum ApplicationTimeStatus {
  CURRENT = "CURRENT",
  PAST = "PAST"
}

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



type EagerApplicantOptional = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ApplicantOptional, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyApplicantOptional = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ApplicantOptional, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ApplicantOptional = LazyLoading extends LazyLoadingDisabled ? EagerApplicantOptional : LazyApplicantOptional

export declare const ApplicantOptional: (new (init: ModelInit<ApplicantOptional>) => ApplicantOptional) & {
  copyOf(source: ApplicantOptional, mutator: (draft: MutableModel<ApplicantOptional>) => MutableModel<ApplicantOptional> | void): ApplicantOptional;
}

type EagerAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Asset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerId?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Asset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerId?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Asset = LazyLoading extends LazyLoadingDisabled ? EagerAsset : LazyAsset

export declare const Asset: (new (init: ModelInit<Asset>) => Asset) & {
  copyOf(source: Asset, mutator: (draft: MutableModel<Asset>) => MutableModel<Asset> | void): Asset;
}

type EagerDebt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Debt, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerId?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDebt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Debt, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerId?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Debt = LazyLoading extends LazyLoadingDisabled ? EagerDebt : LazyDebt

export declare const Debt: (new (init: ModelInit<Debt>) => Debt) & {
  copyOf(source: Debt, mutator: (draft: MutableModel<Debt>) => MutableModel<Debt> | void): Debt;
}

type EagerIncome = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Income, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerId?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIncome = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Income, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerId?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Income = LazyLoading extends LazyLoadingDisabled ? EagerIncome : LazyIncome

export declare const Income: (new (init: ModelInit<Income>) => Income) & {
  copyOf(source: Income, mutator: (draft: MutableModel<Income>) => MutableModel<Income> | void): Income;
}

type EagerTestApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TestApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly lastSection?: string | null;
  readonly members?: (Member | null)[] | null;
  readonly submittedDate?: string | null;
  readonly affiliate: Habitat;
  readonly reviewStatus?: string | null;
  readonly submissionStatus: SubmissionStatus | keyof typeof SubmissionStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly testApplicationAffiliateId: string;
}

type LazyTestApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TestApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly lastSection?: string | null;
  readonly members: AsyncCollection<Member>;
  readonly submittedDate?: string | null;
  readonly affiliate: AsyncItem<Habitat>;
  readonly reviewStatus?: string | null;
  readonly submissionStatus: SubmissionStatus | keyof typeof SubmissionStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly testApplicationAffiliateId: string;
}

export declare type TestApplication = LazyLoading extends LazyLoadingDisabled ? EagerTestApplication : LazyTestApplication

export declare const TestApplication: (new (init: ModelInit<TestApplication>) => TestApplication) & {
  copyOf(source: TestApplication, mutator: (draft: MutableModel<TestApplication>) => MutableModel<TestApplication> | void): TestApplication;
}

type EagerEmploymentInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmploymentInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmploymentInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmploymentInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmploymentInfo = LazyLoading extends LazyLoadingDisabled ? EagerEmploymentInfo : LazyEmploymentInfo

export declare const EmploymentInfo: (new (init: ModelInit<EmploymentInfo>) => EmploymentInfo) & {
  copyOf(source: EmploymentInfo, mutator: (draft: MutableModel<EmploymentInfo>) => MutableModel<EmploymentInfo> | void): EmploymentInfo;
}

type EagerMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Member, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly props?: string | null;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Member, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly props?: string | null;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Member = LazyLoading extends LazyLoadingDisabled ? EagerMember : LazyMember

export declare const Member: (new (init: ModelInit<Member>) => Member) & {
  copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
}

type EagerRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Record, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Record, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Record = LazyLoading extends LazyLoadingDisabled ? EagerRecord : LazyRecord

export declare const Record: (new (init: ModelInit<Record>) => Record) & {
  copyOf(source: Record, mutator: (draft: MutableModel<Record>) => MutableModel<Record> | void): Record;
}

type EagerWritten = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Written, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWritten = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Written, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Written = LazyLoading extends LazyLoadingDisabled ? EagerWritten : LazyWritten

export declare const Written: (new (init: ModelInit<Written>) => Written) & {
  copyOf(source: Written, mutator: (draft: MutableModel<Written>) => MutableModel<Written> | void): Written;
}

type EagerChecklist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checklist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChecklist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checklist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Checklist = LazyLoading extends LazyLoadingDisabled ? EagerChecklist : LazyChecklist

export declare const Checklist: (new (init: ModelInit<Checklist>) => Checklist) & {
  copyOf(source: Checklist, mutator: (draft: MutableModel<Checklist>) => MutableModel<Checklist> | void): Checklist;
}

type EagerApplicantInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ApplicantInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyApplicantInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ApplicantInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly props?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ApplicantInfo = LazyLoading extends LazyLoadingDisabled ? EagerApplicantInfo : LazyApplicantInfo

export declare const ApplicantInfo: (new (init: ModelInit<ApplicantInfo>) => ApplicantInfo) & {
  copyOf(source: ApplicantInfo, mutator: (draft: MutableModel<ApplicantInfo>) => MutableModel<ApplicantInfo> | void): ApplicantInfo;
}

type EagerCycles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cycles, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cycleStartDate?: string | null;
  readonly cycleEndDate?: string | null;
  readonly cycleStatus?: boolean | null;
  readonly Applications?: (Application | null)[] | null;
  readonly habitatID: string;
  readonly cycleSeason?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCycles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cycles, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cycleStartDate?: string | null;
  readonly cycleEndDate?: string | null;
  readonly cycleStatus?: boolean | null;
  readonly Applications: AsyncCollection<Application>;
  readonly habitatID: string;
  readonly cycleSeason?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Cycles = LazyLoading extends LazyLoadingDisabled ? EagerCycles : LazyCycles

export declare const Cycles: (new (init: ModelInit<Cycles>) => Cycles) & {
  copyOf(source: Cycles, mutator: (draft: MutableModel<Cycles>) => MutableModel<Cycles> | void): Cycles;
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
  readonly identityID?: string | null;
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
  readonly identityID?: string | null;
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
  readonly employmentTime?: number | null;
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
  readonly employmentTime?: number | null;
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
  readonly isUnemployed?: boolean | null;
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
  readonly isUnemployed?: boolean | null;
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
  readonly IncomeRecords?: (HouseholdMember | null)[] | null;
  readonly SavingRecords?: (HouseholdMember | null)[] | null;
  readonly DebtRecords?: (HouseholdMember | null)[] | null;
  readonly submitted?: boolean | null;
  readonly dateSubmitted?: string | null;
  readonly submittedStatus?: ApplicationSubmittedStatus | keyof typeof ApplicationSubmittedStatus | null;
  readonly habitatRevisor?: string | null;
  readonly dateRevised?: string | null;
  readonly ownerName?: string | null;
  readonly timeStatus?: ApplicationTimeStatus | keyof typeof ApplicationTimeStatus | null;
  readonly cyclesID?: string | null;
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
  readonly IncomeRecords: AsyncCollection<HouseholdMember>;
  readonly SavingRecords: AsyncCollection<HouseholdMember>;
  readonly DebtRecords: AsyncCollection<HouseholdMember>;
  readonly submitted?: boolean | null;
  readonly dateSubmitted?: string | null;
  readonly submittedStatus?: ApplicationSubmittedStatus | keyof typeof ApplicationSubmittedStatus | null;
  readonly habitatRevisor?: string | null;
  readonly dateRevised?: string | null;
  readonly ownerName?: string | null;
  readonly timeStatus?: ApplicationTimeStatus | keyof typeof ApplicationTimeStatus | null;
  readonly cyclesID?: string | null;
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
  readonly Applications?: (Cycles | null)[] | null;
  readonly users?: (string | null)[] | null;
  readonly AMI?: (string | null)[] | null;
  readonly Cycles?: (Cycles | null)[] | null;
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
  readonly Applications: AsyncCollection<Cycles>;
  readonly users?: (string | null)[] | null;
  readonly AMI?: (string | null)[] | null;
  readonly Cycles: AsyncCollection<Cycles>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Habitat = LazyLoading extends LazyLoadingDisabled ? EagerHabitat : LazyHabitat

export declare const Habitat: (new (init: ModelInit<Habitat>) => Habitat) & {
  copyOf(source: Habitat, mutator: (draft: MutableModel<Habitat>) => MutableModel<Habitat> | void): Habitat;
}