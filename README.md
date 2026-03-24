[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ymdhk8vP)

# 🐦 Cookoo, mon compagnion nutrition

[Lien du site](https://sae401.paolo-vincent.fr/)

## Fonctionnalités principales

- Listing des recettes avec filtrages par recherche, tags, notes, temps, etc [Recettes](/src/pages/recettes/index.astro)
- Listing des professionnels avec fonction de recherche [Professionnels](/src/pages/professionnels/index.astro)
- Pagination dynamique des recettes et des professionnels [Recettes](/src/pages/recettes/index.astro) [Professionnels](/src/pages/professionnels/index.astro)
- Calcul des valeurs nutritionnelles d'une recette à partir de ses ingrédients [Recette](/src/pages/recettes/[id].astro)
- Calcul front des quantités en fonction du nombre de portions [Recette](/src/pages/recettes/[id].astro)
- Listing des ingrédients et liens vers leur page dédiée [Recette](/src/pages/recettes/[id].astro) [Ingrédient](/src/pages/ingredients/[id].astro)
- Calcul de la note moyenne et listing des commentaires [Recette](/src/pages/recettes/[id].astro) [Professionnel](/src/pages/professionnels/[id].astro)
- Listing des recettes liées aux ingrédients ou professionnels [Professionnel](/src/pages/professionnels/[id].astro) [Ingrédient](/src/pages/ingredients/[id].astro)
- Création de compte et connexion [Auth](/src/pages/auth.astro) [Register](/src/pages/register.astro)
- Modification du profil [Profile](/src/pages/profile.astro)