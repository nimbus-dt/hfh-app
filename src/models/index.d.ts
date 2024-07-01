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
  readonly joinDate?: string | null;
  readonly joinMonth?: string | null;
  readonly joinYear?: string | null;
}

type LazyAffiliateProps = {
  readonly titleAtHabitat: string;
  readonly roleDescription: string;
  readonly joinDate?: string | null;
  readonly joinMonth?: string | null;
  readonly joinYear?: string | null;
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

type EagerHabitatProps = {
  readonly customStatus?: string[] | null;
  readonly gallery?: GalleryItem[] | null;
  readonly sidebarName?: SidebarName | null;
  readonly closedCycleMessages: string[];
}

type LazyHabitatProps = {
  readonly customStatus?: string[] | null;
  readonly gallery?: GalleryItem[] | null;
  readonly sidebarName?: SidebarName | null;
  readonly closedCycleMessages: string[];
}

export declare type HabitatProps = LazyLoading extends LazyLoadingDisabled ? EagerHabitatProps : LazyHabitatProps

export declare const HabitatProps: (new (init: ModelInit<HabitatProps>) => HabitatProps)

type EagerMaintenance = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Maintenance, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly maintenance?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMaintenance = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Maintenance, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly maintenance?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Maintenance = LazyLoading extends LazyLoadingDisabled ? EagerMaintenance : LazyMaintenance

export declare const Maintenance: (new (init: ModelInit<Maintenance>) => Maintenance) & {
  copyOf(source: Maintenance, mutator: (draft: MutableModel<Maintenance>) => MutableModel<Maintenance> | void): Maintenance;
}

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
  readonly verified?: boolean | null;
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
  readonly verified?: boolean | null;
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
  readonly habitatID: string;
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
  readonly habitatID: string;
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
  readonly status: ReviewStatus | keyof typeof ReviewStatus;
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
  readonly status: ReviewStatus | keyof typeof ReviewStatus;
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
  readonly rootformID: string;
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
  readonly rootformID: string;
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

type EagerTestApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TestApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ownerID?: string | null;
  readonly lastSection?: string | null;
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
  readonly lastPage?: number | null;
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
  readonly lastPage?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TestApplication = LazyLoading extends LazyLoadingDisabled ? EagerTestApplication : LazyTestApplication

export declare const TestApplication: (new (init: ModelInit<TestApplication>) => TestApplication) & {
  copyOf(source: TestApplication, mutator: (draft: MutableModel<TestApplication>) => MutableModel<TestApplication> | void): TestApplication;
}

type EagerHabitat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Habitat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly longName?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly props: HabitatProps;
  readonly users?: (string | null)[] | null;
  readonly authenticationHeader?: string | null;
  readonly RootForms?: (RootForm | null)[] | null;
  readonly urlName?: string | null;
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
  readonly longName?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly props: HabitatProps;
  readonly users?: (string | null)[] | null;
  readonly authenticationHeader?: string | null;
  readonly RootForms: AsyncCollection<RootForm>;
  readonly urlName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Habitat = LazyLoading extends LazyLoadingDisabled ? EagerHabitat : LazyHabitat

export declare const Habitat: (new (init: ModelInit<Habitat>) => Habitat) & {
  copyOf(source: Habitat, mutator: (draft: MutableModel<Habitat>) => MutableModel<Habitat> | void): Habitat;
}