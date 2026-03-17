/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Apports = "Apports",
	Commentaires = "Commentaires",
	Contient = "Contient",
	Ingredients = "Ingredients",
	Objectifs = "Objectifs",
	Poids = "Poids",
	Professionnels = "Professionnels",
	Recettes = "Recettes",
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ApportsRecord = {
	calories?: number
	created: IsoAutoDateString
	date?: IsoDateString
	id: string
	updated: IsoAutoDateString
	user?: RecordIdString
}

export type CommentairesRecord = {
	created: IsoAutoDateString
	id: string
	message?: string
	note?: number
	professionnel?: RecordIdString
	recette?: RecordIdString
	updated: IsoAutoDateString
	user?: RecordIdString
}

export enum ContientUniteOptions {
	"g" = "g",
	"ml" = "ml",
	"càc" = "càc",
}
export type ContientRecord = {
	created: IsoAutoDateString
	id: string
	ingredient?: RecordIdString
	quantite?: number
	recette?: RecordIdString
	unite?: ContientUniteOptions
	updated: IsoAutoDateString
}

export enum IngredientsFieldOptions {
	"Viande" = "Viande",
	"Légume" = "Légume",
	"Fruit" = "Fruit",
	"Produit laitier" = "Produit laitier",
	"Féculent" = "Féculent",
	"Céréale" = "Céréale",
	"Divers" = "Divers",
}
export type IngredientsRecord<Tvaleurs = unknown> = {
	created: IsoAutoDateString
	field?: IngredientsFieldOptions[]
	id: string
	image?: FileNameString
	nom?: string
	poidsUnitaire?: number
	unitaire?: boolean
	updated: IsoAutoDateString
	valeurs?: null | Tvaleurs
}

export enum ObjectifsRaisonOptions {
	"Prise de poids" = "Prise de poids",
	"Perte de poids" = "Perte de poids",
	"Rééquilibrage alimentaire" = "Rééquilibrage alimentaire",
}

export enum ObjectifsRegimeOptions {
	"Omnivore" = "Omnivore",
	"Flexitarien" = "Flexitarien",
	"Végétarien" = "Végétarien",
	"Végan" = "Végan",
	"Sans porc" = "Sans porc",
}
export type ObjectifsRecord = {
	apport?: number
	created: IsoAutoDateString
	date?: IsoDateString
	id: string
	poids?: number
	raison?: ObjectifsRaisonOptions[]
	regime?: ObjectifsRegimeOptions
	updated: IsoAutoDateString
	user?: RecordIdString
}

export type PoidsRecord = {
	created: IsoAutoDateString
	date?: IsoDateString
	id: string
	poids?: number
	updated: IsoAutoDateString
	user?: RecordIdString
}

export enum ProfessionnelsProfessionOptions {
	"Diététicien" = "Diététicien",
	"Coach sportif" = "Coach sportif",
	"Nutritionniste" = "Nutritionniste",
	"Naturopathe" = "Naturopathe",
}
export type ProfessionnelsRecord = {
	created: IsoAutoDateString
	description?: string
	id: string
	lien?: string
	nom?: string
	prenom?: string
	profession?: ProfessionnelsProfessionOptions[]
	updated: IsoAutoDateString
	user?: RecordIdString
}

export enum RecettesNiveauOptions {
	"débutant" = "débutant",
	"intermédiaire" = "intermédiaire",
	"avancée" = "avancée",
}

export enum RecettesTagsOptions {
	"Entrée" = "Entrée",
	"Plat" = "Plat",
	"Dessert" = "Dessert",
	"Végétarien" = "Végétarien",
	"Flexitarien" = "Flexitarien",
	"Végan" = "Végan",
	"Sans porc" = "Sans porc",
	"Protéiné" = "Protéiné",
	"Peu calorique" = "Peu calorique",
	"Très calorique" = "Très calorique",
}
export type RecettesRecord<Tpreparation = unknown> = {
	created: IsoAutoDateString
	description?: string
	id: string
	image?: FileNameString
	niveau?: RecettesNiveauOptions
	nom?: string
	preparation?: null | Tpreparation
	tags?: RecettesTagsOptions[]
	tempsCuisson?: number
	tempsPreparation?: number
	updated: IsoAutoDateString
	user?: RecordIdString
}

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type UsersRecord = {
	admin?: boolean
	author?: boolean
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	like?: RecordIdString[]
	name?: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type ApportsResponse<Texpand = unknown> = Required<ApportsRecord> & BaseSystemFields<Texpand>
export type CommentairesResponse<Texpand = unknown> = Required<CommentairesRecord> & BaseSystemFields<Texpand>
export type ContientResponse<Texpand = unknown> = Required<ContientRecord> & BaseSystemFields<Texpand>
export type IngredientsResponse<Tvaleurs = unknown, Texpand = unknown> = Required<IngredientsRecord<Tvaleurs>> & BaseSystemFields<Texpand>
export type ObjectifsResponse<Texpand = unknown> = Required<ObjectifsRecord> & BaseSystemFields<Texpand>
export type PoidsResponse<Texpand = unknown> = Required<PoidsRecord> & BaseSystemFields<Texpand>
export type ProfessionnelsResponse<Texpand = unknown> = Required<ProfessionnelsRecord> & BaseSystemFields<Texpand>
export type RecettesResponse<Tpreparation = unknown, Texpand = unknown> = Required<RecettesRecord<Tpreparation>> & BaseSystemFields<Texpand>
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Apports: ApportsRecord
	Commentaires: CommentairesRecord
	Contient: ContientRecord
	Ingredients: IngredientsRecord
	Objectifs: ObjectifsRecord
	Poids: PoidsRecord
	Professionnels: ProfessionnelsRecord
	Recettes: RecettesRecord
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Apports: ApportsResponse
	Commentaires: CommentairesResponse
	Contient: ContientResponse
	Ingredients: IngredientsResponse
	Objectifs: ObjectifsResponse
	Poids: PoidsResponse
	Professionnels: ProfessionnelsResponse
	Recettes: RecettesResponse
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
