import Pocketbase from 'pocketbase';
import type { IngredientsResponse, TypedPocketBase, UsersResponse } from '../src/utils/type';
const pb = new Pocketbase(import.meta.env.PROD ? "http://localhost:8081/" : "https://sae401.paolo-vincent.fr/") as TypedPocketBase;


//Custom types
type NutritionValues = {
    calories: number;
    gras: number;
    glucides: number;
    proteines: number;
    fibres: number;
};

export type RecetteListItem = {
    id: string;
    imageURL: string;
    nom?: string;
    niveau?: string;
    temps: number;
    calories: number;
    note: number;
};

export type RecetteFilter = {
    tags?: string[];
    niveau?: string;
    minTemps?: number;
    maxTemps?: number;
    minNote?: number;
    maxNote?: number;
    ingredients?: string[];
    userId?: string;
    search?: string;
    limit?: number;
};

//Main functions
export async function getUser(id: string) : Promise<UsersResponse | undefined> {
    try {
        const user = await pb.collection("users").getOne(id);
        console.log("[getUser] Got user :",JSON.stringify(user, null, 2));
        return user;
    } catch (e) {
        console.log("[getUser] Failed to get user :",id,"Caught error :",e);
        return;
    }
}

export async function getRecette(id: string) : Promise<Object | undefined> {
    try {
        const recette = await pb.collection("Recettes").getOne(id, { expand: "user" });
        const user = recette.expand.user;

        const base = {
            id: recette.id,
            description: recette.description,
            imageURL: pb.files.getURL(recette, recette.image),
            preparation: recette.preparation,
            tags: recette.tags,
            niveau: recette.niveau,
            tempsCuisson: recette.tempsCuisson,
            tempsPreparation: recette.tempsPreparation,
            temps: (recette.tempsPreparation ?? 0) + (recette.tempsCuisson ?? 0),
            userId: user.id,
            userImageURL: pb.files.getURL(user, user.avatar),
            userName: user.name,
        };

        const ingredients = await pb.collection("Contient").getFullList({filter: `recette = '${id}'`, expand: "ingredient"});
        const ingredientsFixed = ingredients.map(normalizeIngredientForGetRecette);

        const commentaires = await pb.collection("Commentaires").getFullList({filter: `recette = '${id}'`, expand: "user"});
        const commentairesFixed = commentaires.map(normalizeCommentForGetRecette);

        const valeurs = calculateNutritionValues(ingredientsFixed);

        const note = calculateNote(commentairesFixed);

        return { ...base, valeurs, note, ingredientsFixed, commentairesFixed };
    } catch (e) {
        console.log("[getRecette] Failed to get recette :", id, "Caught error :", e);
        return;
    }
}

export async function getRecetteMinimal(id: string) : Promise<RecetteListItem | undefined> {
    try {
        const recette = await pb.collection("Recettes").getOne(id);
        const imageURL = pb.files.getURL(recette, recette.image);
        const temps = (recette.tempsPreparation ?? 0) + (recette.tempsCuisson ?? 0);

        const ingredients = await pb.collection("Contient").getFullList({filter: `recette = '${id}'`, expand: "ingredient"});
        const calories = calculateNutritionValues(ingredients.map(normalizeIngredientForGetRecette)).calories;

        const commentaires = await pb.collection("Commentaires").getFullList({filter: `recette = '${id}'`});
        const note = calculateNote(commentaires);

        return {
            id: recette.id,
            imageURL,
            nom: recette.nom,
            niveau: recette.niveau,
            temps,
            calories,
            note,
        };
    } catch (e) {
        console.log("[getRecetteMinimal] Failed to get recette :", id, "Caught error :", e);
        return;
    }
}

export async function getRecettes(filters: RecetteFilter = {}): Promise<RecetteListItem[]> {
    const filterParts: string[] = [];

    if (filters.userId) {
        filterParts.push(`user = '${filters.userId}'`);
    }
    if (filters.niveau) {
        filterParts.push(`niveau = '${filters.niveau}'`);
    }
    if (filters.tags && filters.tags.length) {
        const tagFilters = filters.tags.map((tag) => `tags ?~ '${tag}'`);
        filterParts.push(tagFilters.join(' && '));
    }
    if (filters.search) {
        const escaped = filters.search.replace(/'/g, "\\'");
        filterParts.push(`nom ?~ '${escaped}'`);
    }

    const filter = filterParts.join(' && ');
    console.log("[getRecettes] Created filter :",filter);

    const recettes = await pb.collection('Recettes').getFullList({ filter });

    let recetteIds = recettes.map((r: any) => r.id);
    console.log("[getRecettes] recettesIds :", recetteIds);
    if (filters.ingredients) {
        const ingredientFilter = filters.ingredients.map((ingredient) => `ingredient = '${ingredient}'`).join("||");
        console.log("[getRecettes] Filtering by ingredient :", ingredientFilter);
        const contains = await pb.collection('Contient').getFullList({ filter: ingredientFilter });
        const recettesWithIngredient = (contains.map((c: any) => c.recette));
        console.log("[getRecettes] idsWithIngredient :", recettesWithIngredient);
        recetteIds = recetteIds.filter((id) => recettesWithIngredient.includes(id));
    }

    const recettesFiltered = recettes.filter((r: any) => recetteIds.includes(r.id));
    console.log("[getRecettes] recettesFiltered :", recettesFiltered);

    if (recetteIds.length === 0) return [];

    const recetteFilter = recettesFiltered.map((recette) => `recette = '${recette.id}'`).join("||");
    const contientRecords = await pb.collection('Contient').getFullList({ filter: recetteFilter, expand: 'ingredient' });
    const commentaireRecords = await pb.collection('Commentaires').getFullList({ filter: recetteFilter });

    const contientsByRecette = new Map<string, any[]>();
    contientRecords.forEach((c: any) => {
        const list = contientsByRecette.get(c.recette) ?? [];
        list.push(c);
        contientsByRecette.set(c.recette, list);
    });

    const commentairesByRecette = new Map<string, any[]>();
    commentaireRecords.forEach((c: any) => {
        const list = commentairesByRecette.get(c.recette) ?? [];
        list.push(c);
        commentairesByRecette.set(c.recette, list);
    });

    const result: RecetteListItem[] = recettesFiltered.map((r: any) => {
        const temps = (r.tempsPreparation ?? 0) + (r.tempsCuisson ?? 0);

        const calories = calculateNutritionValues(
            (contientsByRecette.get(r.id) ?? []).map(normalizeIngredientForGetRecette),
        ).calories;

        const note = calculateNote(commentairesByRecette.get(r.id) ?? []);

        return {
            id: r.id,
            imageURL: pb.files.getURL(r, r.image),
            nom: r.nom,
            niveau: r.niveau,
            temps,
            calories,
            note,
        };
    });

    const filteredByTemps = result.filter((item) => {
        if (filters.minTemps != null && item.temps < filters.minTemps) return false;
        if (filters.maxTemps != null && item.temps > filters.maxTemps) return false;
        return true;
    });

    const filteredByNote = filteredByTemps.filter((item) => {
        if (filters.minNote != null && item.note < filters.minNote) return false;
        if (filters.maxNote != null && item.note > filters.maxNote) return false;
        return true;
    });

    return filters.limit ? filteredByNote.slice(0, filters.limit) : filteredByNote;
}

export async function getIngredient(id: string) : Promise<IngredientsResponse | undefined> {
    try {
        const ingredient = await pb.collection("Ingredients").getOne(id);
        console.log("[getIngredient] Got ingredient :",JSON.stringify(ingredient, null, 2));
        return ingredient;
    } catch (e) {
        console.log("[getIngredient] Failed to get ingredient :",id,"Caught error :",e);
        return;
    }
}

//Utility functions
function getIngredientScale(ingredient: { quantite: number; unitaire?: boolean; poidsUnitaire?: number }) {
    return ingredient.unitaire
        ? (ingredient.quantite * (ingredient.poidsUnitaire ?? 100)) / 100
        : ingredient.quantite / 100;
}

function calculateNutritionValues(
    ingredients: Array<{ quantite: number; unitaire?: boolean; poidsUnitaire?: number; valeurs?: Partial<NutritionValues> }>,
): NutritionValues {
    return ingredients.reduce(
        (acc, ingredient) => {
            const scale = getIngredientScale(ingredient);
            const values = ingredient.valeurs ?? {};

            const calories = (values.calories ?? 0) * scale;
            const gras = (values.gras ?? 0) * scale;
            const glucides = (values.glucides ?? 0) * scale;
            const proteines = (values.proteines ?? 0) * scale;
            const fibres = (values.fibres ?? 0) * scale;

            return {
                calories: parseFloat((acc.calories + calories).toFixed(0)),
                gras: parseFloat((acc.gras + gras).toFixed(1)),
                glucides: parseFloat((acc.glucides + glucides).toFixed(1)),
                proteines: parseFloat((acc.proteines + proteines).toFixed(1)),
                fibres: parseFloat((acc.fibres + fibres).toFixed(1)),
            };
        },
        { calories: 0, gras: 0, glucides: 0, proteines: 0, fibres: 0 },
    );
}

function normalizeIngredientForGetRecette(record: any) {
    const ingredient = record.expand?.ingredient ?? {};
    return {
        id: record.id,
        quantite: record.quantite,
        unite: record.unite,
        ...ingredient,
        imageURL: pb.files.getURL(ingredient, ingredient.image),
    };
}

function normalizeCommentForGetRecette(record: any) {
    const user = record.expand?.user;
    return {
        created: record.created,
        message: record.message,
        note: record.note,
        name: user?.name,
        id: user?.id,
        imageURL: pb.files.getURL(user, user?.avatar),
    };
}

function calculateNote(record: any) : number {
    const notes: number[] = record
        .map((commentaire: any) => commentaire.note)
        .filter((note: unknown): note is number => typeof note === "number");
    if (notes.length === 0) return 0;
    const total = notes.reduce((acc, note) => acc + note, 0);
    return parseFloat((total / notes.length).toFixed(1));
}