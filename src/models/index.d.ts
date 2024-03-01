import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum ApplicationTypes {
  ONLINE = "ONLINE",
  PAPER = "PAPER"
}

export enum SubmissionStatus {
  SUBMITTED = "SUBMITTED",
  UNSUBMITTED = "UNSUBMITTED",
  RETURNED = "RETURNED"
}

type EagerWrittenQuestion = {
  readonly name: string;
  readonly label: string;
  readonly placeholder: string;
}

type LazyWrittenQuestion = {
  readonly name: string;
  readonly label: string;
  readonly placeholder: string;
}

export declare type WrittenQuestion = LazyLoading extends LazyLoadingDisabled ? EagerWrittenQuestion : LazyWrittenQuestion

export declare const WrittenQuestion: (new (init: ModelInit<WrittenQuestion>) => WrittenQuestion)

type EagerRecordQuestion = {
  readonly name: string;
  readonly max: number;
  readonly label: string;
  readonly acceptedFileTypes?: string[] | null;
}

type LazyRecordQuestion = {
  readonly name: string;
  readonly max: number;
  readonly label: string;
  readonly acceptedFileTypes?: string[] | null;
}

export declare type RecordQuestion = LazyLoading extends LazyLoadingDisabled ? EagerRecordQuestion : LazyRecordQuestion

export declare const RecordQuestion: (new (init: ModelInit<RecordQuestion>) => RecordQuestion)

type EagerCheckQuestion = {
  readonly name: string;
  readonly label: string;
}

type LazyCheckQuestion = {
  readonly name: string;
  readonly label: string;
}

export declare type CheckQuestion = LazyLoading extends LazyLoadingDisabled ? EagerCheckQuestion : LazyCheckQuestion

export declare const CheckQuestion: (new (init: ModelInit<CheckQuestion>) => CheckQuestion)

type EagerTextSection = {
  readonly title: string;
  readonly body: string;
}

type LazyTextSection = {
  readonly title: string;
  readonly body: string;
}

export declare type TextSection = LazyLoading extends LazyLoadingDisabled ? EagerTextSection : LazyTextSection

export declare const TextSection: (new (init: ModelInit<TextSection>) => TextSection)

type EagerHabitatProps = {
  readonly customStatus?: string[] | null;
  readonly homeownershipTermsText?: TextSection[] | null;
  readonly homeownershipMinCurrentAddressMonths: number;
  readonly homeownershipMinCurrentEmploymentMonths: number;
  readonly homeownershipNoOpenCycle: string;
  readonly homeownershipHomeText?: TextSection[] | null;
  readonly homeownershipCheckQuestions?: CheckQuestion[] | null;
  readonly homeownershipRecordQuestions?: RecordQuestion[] | null;
  readonly homeownershipWrittenQuestions?: WrittenQuestion[] | null;
}

type LazyHabitatProps = {
  readonly customStatus?: string[] | null;
  readonly homeownershipTermsText?: TextSection[] | null;
  readonly homeownershipMinCurrentAddressMonths: number;
  readonly homeownershipMinCurrentEmploymentMonths: number;
  readonly homeownershipNoOpenCycle: string;
  readonly homeownershipHomeText?: TextSection[] | null;
  readonly homeownershipCheckQuestions?: CheckQuestion[] | null;
  readonly homeownershipRecordQuestions?: RecordQuestion[] | null;
  readonly homeownershipWrittenQuestions?: WrittenQuestion[] | null;
}

export declare type HabitatProps = LazyLoading extends LazyLoadingDisabled ? EagerHabitatProps : LazyHabitatProps

export declare const HabitatProps: (new (init: ModelInit<HabitatProps>) => HabitatProps)

type EagerProperty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Property, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID: string;
  readonly props: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProperty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Property, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID: string;
  readonly props: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Property = LazyLoading extends LazyLoadingDisabled ? EagerProperty : LazyProperty

export declare const Property: (new (init: ModelInit<Property>) => Property) & {
  copyOf(source: Property, mutator: (draft: MutableModel<Property>) => MutableModel<Property> | void): Property;
}

type EagerTestCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TestCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly startDate: string;
  readonly endDate?: string | null;
  readonly isOpen: boolean;
  readonly props?: string | null;
  readonly habitatID: string;
  readonly TestApplications?: (TestApplication | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTestCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TestCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly startDate: string;
  readonly endDate?: string | null;
  readonly isOpen: boolean;
  readonly props?: string | null;
  readonly habitatID: string;
  readonly TestApplications: AsyncCollection<TestApplication>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TestCycle = LazyLoading extends LazyLoadingDisabled ? EagerTestCycle : LazyTestCycle

export declare const TestCycle: (new (init: ModelInit<TestCycle>) => TestCycle) & {
  copyOf(source: TestCycle, mutator: (draft: MutableModel<TestCycle>) => MutableModel<TestCycle> | void): TestCycle;
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
  readonly submittedDate: string;
  readonly reviewStatus?: string | null;
  readonly submissionStatus: SubmissionStatus | keyof typeof SubmissionStatus;
  readonly props?: string | null;
  readonly type: ApplicationTypes | keyof typeof ApplicationTypes;
  readonly testcycleID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
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
  readonly submittedDate: string;
  readonly reviewStatus?: string | null;
  readonly submissionStatus: SubmissionStatus | keyof typeof SubmissionStatus;
  readonly props?: string | null;
  readonly type: ApplicationTypes | keyof typeof ApplicationTypes;
  readonly testcycleID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
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
  readonly isCoApplicant?: boolean | null;
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
  readonly isCoApplicant?: boolean | null;
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
  readonly props: HabitatProps;
  readonly users?: (string | null)[] | null;
  readonly AMI?: (string | null)[] | null;
  readonly TestCycles?: (TestCycle | null)[] | null;
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
  readonly props: HabitatProps;
  readonly users?: (string | null)[] | null;
  readonly AMI?: (string | null)[] | null;
  readonly TestCycles: AsyncCollection<TestCycle>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Habitat = LazyLoading extends LazyLoadingDisabled ? EagerHabitat : LazyHabitat

export declare const Habitat: (new (init: ModelInit<Habitat>) => Habitat) & {
  copyOf(source: Habitat, mutator: (draft: MutableModel<Habitat>) => MutableModel<Habitat> | void): Habitat;
}