import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum ReviewStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  DENIED = "DENIED",
  RETURNED = "RETURNED"
}

export enum Sexs {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export enum UserTypes {
  AFFILIATE = "AFFILIATE",
  APPLICANT = "APPLICANT"
}

export enum RootFormStatusTypes {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING"
}

export enum ApplicationTypes {
  ONLINE = "ONLINE",
  PAPER = "PAPER"
}

export enum SubmissionStatus {
  INCOMPLETE = "INCOMPLETE",
  COMPLETED = "COMPLETED"
}

type EagerSidebarName = {
  readonly name?: string | null;
  readonly fontSize?: string | null;
}

type LazySidebarName = {
  readonly name?: string | null;
  readonly fontSize?: string | null;
}

export declare type SidebarName = LazyLoading extends LazyLoadingDisabled ? EagerSidebarName : LazySidebarName

export declare const SidebarName: (new (init: ModelInit<SidebarName>) => SidebarName)

type EagerApplicantProps = {
  readonly state: string;
  readonly city: string;
  readonly street: string;
  readonly householdMembersNumber: number;
  readonly householdAnnualIncome: number;
  readonly currentlyUnemployed: string;
  readonly currentWorkTitle?: string | null;
  readonly nameOfEmployer?: string | null;
  readonly howDidYouHearAbout: string;
  readonly firstTimeApplying: string;
  readonly whatAreYouInterestedIn: string;
}

type LazyApplicantProps = {
  readonly state: string;
  readonly city: string;
  readonly street: string;
  readonly householdMembersNumber: number;
  readonly householdAnnualIncome: number;
  readonly currentlyUnemployed: string;
  readonly currentWorkTitle?: string | null;
  readonly nameOfEmployer?: string | null;
  readonly howDidYouHearAbout: string;
  readonly firstTimeApplying: string;
  readonly whatAreYouInterestedIn: string;
}

export declare type ApplicantProps = LazyLoading extends LazyLoadingDisabled ? EagerApplicantProps : LazyApplicantProps

export declare const ApplicantProps: (new (init: ModelInit<ApplicantProps>) => ApplicantProps)

type EagerAffiliateProps = {
  readonly titleAtHabitat: string;
  readonly roleDescription: string;
  readonly joinDate: string;
}

type LazyAffiliateProps = {
  readonly titleAtHabitat: string;
  readonly roleDescription: string;
  readonly joinDate: string;
}

export declare type AffiliateProps = LazyLoading extends LazyLoadingDisabled ? EagerAffiliateProps : LazyAffiliateProps

export declare const AffiliateProps: (new (init: ModelInit<AffiliateProps>) => AffiliateProps)

type EagerGalleryItem = {
  readonly id?: string | null;
  readonly image?: string | null;
  readonly title?: string | null;
  readonly message?: string | null;
}

type LazyGalleryItem = {
  readonly id?: string | null;
  readonly image?: string | null;
  readonly title?: string | null;
  readonly message?: string | null;
}

export declare type GalleryItem = LazyLoading extends LazyLoadingDisabled ? EagerGalleryItem : LazyGalleryItem

export declare const GalleryItem: (new (init: ModelInit<GalleryItem>) => GalleryItem)

type EagerOptionalSections = {
  readonly coApplicant: boolean;
  readonly propertyInfo: boolean;
  readonly businessOwnerOrSelfEmployed: boolean;
  readonly typeOfOwnership: boolean;
}

type LazyOptionalSections = {
  readonly coApplicant: boolean;
  readonly propertyInfo: boolean;
  readonly businessOwnerOrSelfEmployed: boolean;
  readonly typeOfOwnership: boolean;
}

export declare type OptionalSections = LazyLoading extends LazyLoadingDisabled ? EagerOptionalSections : LazyOptionalSections

export declare const OptionalSections: (new (init: ModelInit<OptionalSections>) => OptionalSections)

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

type EagerHabitatProps = {
  readonly customStatus?: string[] | null;
  readonly homeownershipTermsText: string;
  readonly homeownershipMinCurrentAddressMonths: number;
  readonly homeownershipMinCurrentEmploymentMonths: number;
  readonly homeownershipNoOpenCycle: string;
  readonly homeownershipHomeText: string;
  readonly homeownershipCheckQuestions?: CheckQuestion[] | null;
  readonly homeownershipRecordQuestions?: RecordQuestion[] | null;
  readonly homeownershipWrittenQuestions?: WrittenQuestion[] | null;
  readonly optionalSections: OptionalSections;
  readonly gallery?: GalleryItem[] | null;
  readonly sidebarName?: SidebarName | null;
  readonly closedCycleMessages: string[];
}

type LazyHabitatProps = {
  readonly customStatus?: string[] | null;
  readonly homeownershipTermsText: string;
  readonly homeownershipMinCurrentAddressMonths: number;
  readonly homeownershipMinCurrentEmploymentMonths: number;
  readonly homeownershipNoOpenCycle: string;
  readonly homeownershipHomeText: string;
  readonly homeownershipCheckQuestions?: CheckQuestion[] | null;
  readonly homeownershipRecordQuestions?: RecordQuestion[] | null;
  readonly homeownershipWrittenQuestions?: WrittenQuestion[] | null;
  readonly optionalSections: OptionalSections;
  readonly gallery?: GalleryItem[] | null;
  readonly sidebarName?: SidebarName | null;
  readonly closedCycleMessages: string[];
}

export declare type HabitatProps = LazyLoading extends LazyLoadingDisabled ? EagerHabitatProps : LazyHabitatProps

export declare const HabitatProps: (new (init: ModelInit<HabitatProps>) => HabitatProps)

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly sex: Sexs | keyof typeof Sexs;
  readonly phoneNumber: string;
  readonly affiliateProps?: AffiliateProps | null;
  readonly applicantProps?: ApplicantProps | null;
  readonly type: UserTypes | keyof typeof UserTypes;
  readonly owner: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly sex: Sexs | keyof typeof Sexs;
  readonly phoneNumber: string;
  readonly affiliateProps?: AffiliateProps | null;
  readonly applicantProps?: ApplicantProps | null;
  readonly type: UserTypes | keyof typeof UserTypes;
  readonly owner: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerRootForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RootForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly status?: RootFormStatusTypes | keyof typeof RootFormStatusTypes | null;
  readonly description?: string | null;
  readonly files?: (string | null)[] | null;
  readonly Cycles?: (TestCycle | null)[] | null;
  readonly habitatID?: string | null;
  readonly formUrls: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRootForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RootForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly status?: RootFormStatusTypes | keyof typeof RootFormStatusTypes | null;
  readonly description?: string | null;
  readonly files?: (string | null)[] | null;
  readonly Cycles: AsyncCollection<TestCycle>;
  readonly habitatID?: string | null;
  readonly formUrls: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RootForm = LazyLoading extends LazyLoadingDisabled ? EagerRootForm : LazyRootForm

export declare const RootForm: (new (init: ModelInit<RootForm>) => RootForm) & {
  copyOf(source: RootForm, mutator: (draft: MutableModel<RootForm>) => MutableModel<RootForm> | void): RootForm;
}

type EagerDecision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Decision, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status: string;
  readonly serializedEditorState: string;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDecision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Decision, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status: string;
  readonly serializedEditorState: string;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Decision = LazyLoading extends LazyLoadingDisabled ? EagerDecision : LazyDecision

export declare const Decision: (new (init: ModelInit<Decision>) => Decision) & {
  copyOf(source: Decision, mutator: (draft: MutableModel<Decision>) => MutableModel<Decision> | void): Decision;
}

type EagerFormAnswer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FormAnswer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly values?: string | null;
  readonly page?: string | null;
  readonly section?: string | null;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFormAnswer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FormAnswer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly values?: string | null;
  readonly page?: string | null;
  readonly section?: string | null;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FormAnswer = LazyLoading extends LazyLoadingDisabled ? EagerFormAnswer : LazyFormAnswer

export declare const FormAnswer: (new (init: ModelInit<FormAnswer>) => FormAnswer) & {
  copyOf(source: FormAnswer, mutator: (draft: MutableModel<FormAnswer>) => MutableModel<FormAnswer> | void): FormAnswer;
}

type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly serializedEditorState: string;
  readonly ownerID: string;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly serializedEditorState: string;
  readonly ownerID: string;
  readonly testapplicationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

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
  readonly TestApplications?: (TestApplication | null)[] | null;
  readonly rootformID?: string | null;
  readonly name?: string | null;
  readonly closedCycleMessage: string;
  readonly formUrl: string;
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
  readonly TestApplications: AsyncCollection<TestApplication>;
  readonly rootformID?: string | null;
  readonly name?: string | null;
  readonly closedCycleMessage: string;
  readonly formUrl: string;
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
  readonly reviewStatus: ReviewStatus | keyof typeof ReviewStatus;
  readonly submissionStatus: SubmissionStatus | keyof typeof SubmissionStatus;
  readonly props?: string | null;
  readonly type: ApplicationTypes | keyof typeof ApplicationTypes;
  readonly testcycleID: string;
  readonly Notes?: (Note | null)[] | null;
  readonly FormAnswers?: (FormAnswer | null)[] | null;
  readonly Decisions?: (Decision | null)[] | null;
  readonly customStatus?: string | null;
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
  readonly reviewStatus: ReviewStatus | keyof typeof ReviewStatus;
  readonly submissionStatus: SubmissionStatus | keyof typeof SubmissionStatus;
  readonly props?: string | null;
  readonly type: ApplicationTypes | keyof typeof ApplicationTypes;
  readonly testcycleID: string;
  readonly Notes: AsyncCollection<Note>;
  readonly FormAnswers: AsyncCollection<FormAnswer>;
  readonly Decisions: AsyncCollection<Decision>;
  readonly customStatus?: string | null;
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
  readonly authenticationHeader?: string | null;
  readonly RootForms?: (RootForm | null)[] | null;
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
  readonly authenticationHeader?: string | null;
  readonly RootForms: AsyncCollection<RootForm>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Habitat = LazyLoading extends LazyLoadingDisabled ? EagerHabitat : LazyHabitat

export declare const Habitat: (new (init: ModelInit<Habitat>) => Habitat) & {
  copyOf(source: Habitat, mutator: (draft: MutableModel<Habitat>) => MutableModel<Habitat> | void): Habitat;
}