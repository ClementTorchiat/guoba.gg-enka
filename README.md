Voici la version exacte du README.md, expurgée de tous les emojis comme demandé.

***

# Genshin Simulator & Optimizer - Enka Import

Un outil web interactif et avancé conçu pour les joueurs de **Genshin Impact**. Ce projet permet d'importer automatiquement les données des personnages depuis le jeu via l'UID, d'évaluer la qualité des artéfacts, de simuler des statistiques en conditions de combat (buffs, résonances) et de fournir un coaching personnalisé pour optimiser les builds.

---

## Fonctionnalités Principales

* **Importation via UID en temps réel** : Utilise l'API publique d'Enka.Network pour récupérer instantanément les personnages exposés dans la vitrine en jeu du joueur.
* **Système de Notation (Scoring) Avancé** : Calcule un score précis pour chaque artéfact et pour le personnage global en se basant sur un système de poids (similaire aux standards de la communauté comme Akasha/Fribbels). Les notes vont de **F** (Poubelle) jusqu'à **ARCHON** (God Roll absolu).
* **Simulateur de Combat (Buffs Dynamiques)** : Permet d'activer/désactiver à la volée les passifs des personnages, les effets de constellations, les buffs d'armes et les bonus de sets d'artéfacts pour visualiser les "Stats de combat" réelles.
* **Coaching et Plan d'Action Stratégique** :
    * *Analyse du Taux Critique / DGT Crit*.
    * *Besoins en Recharge d'Énergie (ER)* par rapport à l'archétype sélectionné.
    * *Analyse de Forçage de Set* : Détecte si le joueur se force à jouer un set de 4 pièces médiocre au lieu d'un 2p/2p excellent.
    * *Évaluation de la pièce Hors-Set (Off-piece)*.
    * *Conseils sur les niveaux d'armes et d'aptitudes*.
* **Simulateur de Reroll & Potentiel** : Analyse la "densité" d'un artéfact pour déterminer le potentiel de gain et le risque de perte en cas de reroll (ex: via l'Offrande Mystique).
* **Exportation Haute Qualité** : Génération d'une carte récapitulative du build au format image (PNG) pour le partage sur les réseaux sociaux ou Discord, intégrant le splash art du personnage et l'ensemble de ses statistiques.

---

## Architecture du Projet

Le projet est construit en pur Vanilla JavaScript, HTML et CSS, garantissant légèreté et rapidité d'exécution.

| Fichier | Description |
| :--- | :--- |
| `index.html` | L'interface utilisateur principale (UI). Contient le layout en grille flexbox, la barre de recherche latérale, le modal d'aide et l'intégration des librairies externes (FontAwesome, dom-to-image). |
| `script.js` | Le cœur logique de l'application. Gère les appels API, le mapping des données, le moteur de rendu HTML dynamique, la logique des buffs (toggle, cumulatif, exclusif), et la génération des modules de coaching. |
| `scoring.js` | Le moteur mathématique de notation. Évalue les artéfacts en croisant les valeurs réelles avec les "poids" définis pour l'archétype du personnage. Calcule les notes globales et les grades. |
| `config.js` | La base de données de configuration des personnages. Définit pour chaque personnage ses archétypes (builds), le poids de chaque statistique (Crit, ATQ, EM, etc.), les sets recommandés, les cibles d'ER, et les passifs/constellations. Contient également les passifs de toutes les armes et de tous les sets du jeu. |
| `data.js` | Dictionnaire des valeurs "pures" du jeu Genshin Impact. Contient les valeurs d'incrémentation maximales (Rolls) pour chaque type de sous-statistique (ex: 3.89% pour le Taux Crit, 7.77% pour le DGT Crit). |

---

## Fonctionnement Technique

### 1. Importation et Mapping des Données
Le système interroge `https://enka.network/api/uid/{UID}` à travers un proxy (`corsproxy.io`) pour éviter les restrictions CORS. Les données JSON brutes du jeu (identifiants numériques) sont ensuite croisées avec les bases de données open-source d'Enka (`avatars.json`, `locs.json`, `relics.json`) pour récupérer les noms, traductions et icônes correspondantes.

### 2. Le Moteur de Notation (`scoring.js`)
La notation est un système hybride :
* **Valeur de Base** : Chaque "Roll" parfait (ex: 7.8% DGT Crit) vaut une fraction de point.
* **Pondération** : Ces points sont multipliés par un "poids" (défini dans `config.js`). *Exemple : La Défense aura un poids de 1 pour Chiori, mais de 0 pour Arlecchino.*
* **Bonus Mainstat** : L'algorithme prend en compte la pertinence de la statistique principale des pièces variables (Sablier, Coupe, Diadème).
* **Multiplicateur de Set** : Un bonus est appliqué si le joueur possède le Set Best-in-Slot (BiS) recommandé.

### 3. Gestion des Buffs et "Snapshoting"
Les buffs sont classés par catégories (Armes, Sets, Constellations, Passifs). Le script gère 3 comportements de sélection :
* `standard` : Toggle on/off simple (ex: buff d'arme basique).
* `exclusive` : Boutons radio (ex: "1 allié Géo", "2 alliés Géo" ne peuvent pas être actifs en même temps).
* `cumulative` : Mode escalier. Si on active le niveau 3, les niveaux 1 et 2 s'activent automatiquement (ex: Stacks d'armes).
  *Le calcul gère le "scaling" (ex: "Convertit 0.4% de l'ER en DGT Électro") en l'appliquant en fin de chaîne de calcul.*

### 4. Génération d'Images
Utilise la librairie `dom-to-image-more`. Pour contourner le blocage CORS du canvas sur les images externes (Splash Arts), le projet utilise le proxy de redimensionnement/conversion `wsrv.nl`, garantissant des exports sans faille.

---

## Guide de Configuration d'un Personnage (`config.js`)

La puissance de cet outil réside dans la personnalisation granulaire de chaque personnage. Voici comment structurer l'entrée d'un personnage dans `CHARACTER_CONFIG` :

```javascript
"NomDuPersonnage": {
    color: "#HexCode", // Couleur de thème du personnage
    portraitOffset: -35, // Ajustement de l'image (CSS translate-y)
    talents: { auto: 1, skill: 8, burst: 10 }, // Priorité des talents
    
    buffs: [
        // Déclaration des passifs et constellations
        {
            category: "Passifs",
            buffs: [
                {
                    label: "Nom du Passif (+20% ATQ)",
                    active: true, // Activé par défaut ?
                    stats: { "atk_": 0.20 }
                }
            ]
        }
    ],

    builds: {
        "Nom_De_Larchetype": { // Ex: "Vaporisation", "Hypercarry"
            name: "Nom d'affichage",
            weights: {
                "critRate_": 1, "critDMG_": 1,
                "atk_": 0.75, "atk": 0.075,
                "hp_": 0, "hp": 0, "def_": 0, "def": 0,
                "eleMas": 0.5, "enerRech_": 0.8,
                "pyro_dmg_": 1, // 1 pour l'élément du perso, 0 pour le reste
                "heal_": 0
            },
            bestSets: ["NomDuSetEnAnglais:4"], // Set Optimal (4 pièces)
            goodSets: ["SetAlternatif1:2", "SetAlternatif2:2"], // Sets de remplacement
            er_req: 120, // Besoin en ER théorique
            team: [
                // Définition de l'équipe pour la Résonance automatique et UI
                { role: "Sustain", name: "Bennett", element: "pyro" },
                { role: "Flex", name: ["Kazuha", "Sucrose"], element: ["anemo", "anemo"] }
            ]
        }
    }
}
```

---

## Installation et Lancement

Ce projet est purement front-end (Client-side). Aucune base de données ou serveur backend (Node.js/Python) n'est requis.

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/votre-repo/genshin-simulator.git
    cd genshin-simulator
    ```
2.  **Lancer l'application** :
    * Ouvrez simplement le fichier `index.html` dans un navigateur web moderne (Chrome, Firefox, Edge, Safari).
    * *Optionnel* : Pour une meilleure expérience (surtout lors des développements avec l'exportation d'image), utilisez une extension comme **Live Server** sur VSCode.

---

## Prérequis en jeu (Pour l'utilisateur)

Pour que l'outil puisse récupérer les données, le joueur doit configurer son compte Genshin Impact :
1. Aller dans le Menu Paimon > Modifier le profil.
2. Ajouter les personnages souhaités dans la **Vitrine de personnages**.
3. **Cocher l'option : "Afficher les détails des personnages"** (Crucial).
4. Patienter 2 à 5 minutes (Délai de synchronisation des serveurs Hoyoverse/Enka).

---

## Dépendances externes

* **Polices** : *Inter* (Google Fonts) et *ShinShin* (Custom - `ShinShin.ttf`).
* **Icônes** : [FontAwesome 6.4.0](https://fontawesome.com/) (CDN).
* **API** : [Enka.Network](https://enka.network/) (API Publique + Raw Github Json pour l'indexation V2).
* **Image Export** : `dom-to-image-more` v2.9.5 (CDN).
* **Proxies** : `corsproxy.io` (Requêtes API) et `wsrv.nl` (Bypass CORS Images).

---

## Avertissements et Limitations

* **Dépendance à Enka.Network** : Si l'API d'Enka est hors-ligne ou change sa structure de données, le projet nécessitera une mise à jour des fonctions de mapping dans `script.js`.
* **Temps de latence Hoyoverse** : Les modifications d'artéfacts en jeu mettent quelques minutes à se refléter dans la vitrine publique. Le bouton de recherche utilise un timestamp (Cache-busting) pour forcer le rafraîchissement au maximum des capacités de l'API.
* **Limitations des Proxies** : Les proxys gratuits (`corsproxy.io`) peuvent parfois connaître des ralentissements.

---
*Ce projet a été développé par passion pour la communauté Genshin Impact. Aucune donnée personnelle n'est stockée par ce service.*