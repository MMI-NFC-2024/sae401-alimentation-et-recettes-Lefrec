import Pocketbase from 'pocketbase';
import type { IngredientsResponse, RecettesResponse, TypedPocketBase, UsersResponse } from '../src/utils/type';
const pb = new Pocketbase(import.meta.env.PROD ? "http://localhost:8081/" : "https://sae401.paolo-vincent.fr/") as TypedPocketBase;

export async function getUserById(id: string) : Promise<UsersResponse | undefined> {
    try {
        const user = await pb.collection("users").getOne(id);
        console.log("[getUser] Got user :",JSON.stringify(user, null, 2));
        return user;
    } catch (e) {
        console.log("[getUser] Failed to get user :",id,"Caught error :",e);
        return;
    }
}

export async function getRecette(id: string) : Promise<RecettesResponse | undefined> {
    try {
        const recette = await pb.collection("Recettes").getOne(id);
        console.log("[getRecette] Got recette :",JSON.stringify(recette, null, 2));
        return recette;
    } catch (e) {
        console.log("[getRecette] Failed to get recette :",id,"Caught error :",e);
        return;
    }
}

export async function getRecetteWithIngredients(id: string) : Promise<Object | undefined> {
    try {
        const recette = await pb.collection("Recettes").getOne(id);
        const ingredients = await pb.collection("Contient").getFullList({filter: `recette = '${id}'`, expand: "ingredient"});
        let recetteWithIngredients = {...recette, ingredients};
        console.log("[getRecetteeWithIngredients] Got recette",id,"with ingredients");
        return recetteWithIngredients;
    } catch (e) {
        console.log("[getRecetteeWithIngredients] Failed to get recette :",id,"Caught error :",e);
        return;
    }
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