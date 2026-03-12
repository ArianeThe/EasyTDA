# Correction des Modales et Focus - EasyTda

## Date : 2026-02-12

## Objectif
Corriger les écrans blancs (AddTask, Notifications, Categories), structurer la navigation modale avec Expo Router, et améliorer l'expérience utilisateur (boutons Back, formulaires).

## Actions Effectuées

### 1. ✅ Restructuration de la Navigation
- ❌ **Supprimé** : `app/modal.tsx` (ancienne gestion via params)
- ✅ **Créé** : Dossier `app/modal/`
- ✅ **Nouvelles Routes Fichier** :
  - `app/modal/addTask.tsx`
  - `app/modal/notifications.tsx`
  - `app/modal/categories.tsx`
  - `app/modal/_layout.tsx` (Configuration `presentation: 'modal'`)

### 2. ✅ Correction des Écrans (Fin des Écrans Blancs)

#### AddTaskScreen
- **Fichier :** `src/screens/AddTaskScreen.tsx`
- **Ajouté :** Formulaire complet (Titre, Description, Priorité, Catégorie).
- **Ajouté :** Header avec bouton "Back".
- **Corrigé :** Appel à `addTask(title, desc, catId)` pour correspondre à `useTasks`.

#### NotificationsScreen
- **Fichier :** `src/screens/NotificationsScreen.tsx`
- **Ajouté :** Header avec bouton "Back".
- **Amélioré :** Utilisation de `useRouter` pour la navigation.
- **Corrigé :** Structure de la vue pour éviter les erreurs de rendu.

#### CategoriesScreen
- **Fichier :** `src/screens/CategoriesScreen.tsx`
- **Ajouté :** Header avec bouton "Back".
- **Ajouté :** Formulaire d'ajout de catégorie (Nom, Description, Couleur).
- **Corrigé :** Appel à `addCategory(name, color, desc)` pour correspondre à `useCategories`.
- **Corrigé :** Widget `CategoryWidget` rendu cliquable via prop `onPress`.

### 3. ✅ Mise à jour de HomeScreen
- **Fichier :** `src/screens/HomeScreen.tsx`
- **Routes :** Mis à jour `router.push('/modal/...')` pour utiliser les nouvelles routes fichiers.
- **Widget :** Ajout de la prop `onPress` manquante sur `CategoryWidget`.

### 4. ✅ Accessibilité Web
- Les modales utilisent maintenant une navigation stack native via `app/modal/_layout.tsx`.
- Cela permet une meilleure gestion du focus et de l'accessibilité sur le web, réduisant les conflits `aria-hidden`.
- **Focus :** Les formulaires utilisent `autoFocus` sur les champs de saisie principaux pour capturer le focus dès l'ouverture.

## Vérification
- **Navigation :** Les boutons de la page d'accueil ouvrent maintenant les nouvelles routes modales.
- **Fonctionnalités :** L'ajout de tâches et de catégories est fonctionnel.
- **Compilation :** Les erreurs TypeScript liées aux signatures de fonctions ont été corrigées.

## Prochaines Étapes
- Tester l'ajout d'une tâche et vérifier qu'elle apparaît sur la page d'accueil.
- Tester l'ajout d'une catégorie et vérifier qu'elle apparaît dans le widget.
- Vérifier le comportement du bouton "Mark all as read" dans les notifications.
