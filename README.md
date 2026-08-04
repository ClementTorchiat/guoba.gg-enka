# guoba.gg — Optimiseur de Builds & Coach Virtuel Genshin Impact

**guoba.gg** est une application web moderne, interactive et complète conçue pour les joueurs de **Genshin Impact**. 

Bien plus qu'un simple calculateur, c'est un véritable **coach virtuel** qui audite mathématiquement la qualité de vos équipements via un double système de score et de grade, simule vos statistiques réelles en conditions de combat sous buffs, et vous guide pas à pas pour orienter vos priorités de farm sans jamais avoir à manipuler un tableur complexe.

---

## Pourquoi guoba.gg ? (Genèse & Vision)

Le projet est né d'une frustration récurrente chez les joueurs :
1. **L'opacité et la complexité des tableurs** : Les feuilles de calcul traditionnelles sont souvent austères, difficiles à configurer et peu adaptées à une consultation rapide.
2. **Le piège des calculateurs de dégâts bruts (speedrun)** : Beaucoup d'outils comparent des builds dans des conditions idéalisées ou irréalistes sans évaluer l'équilibre global (Recharge d'Énergie suffisante, ratio critique cohérent, statistiques utiles gaspillées).
3. **Le manque de conseils exploitables** : Savoir qu'un artéfact a 30% de DGT Crit est une chose ; savoir s'il est rentable de le recycler dans l'Offrande Mystique, si le set 4-pièces actuel vaut la peine d'être forcé, ou quelle pièce remplacer en priorité en est une autre.

**guoba.gg** répond à ces besoins en combinant rigueur mathématique, immersion visuelle et conseils d'optimisation clairs et actionnables.

> 
> **Ce que guoba.gg n'est pas :**  
> Ce n'est ni un outil officiel HoYoverse, ni un classement de dégâts speedrun, ni une base de données de tier-lists. L'outil se concentre sur la **qualité mathématique de votre investissement** et l'**orientation concrète de votre farm**.

---

## Fonctionnalités Principales

### 1. Importation instantanée via UID (Enka.Network)
* Récupération automatique et instantanée des données publiques de votre vitrine de personnages en jeu.
* **100% sécurisé et transparent** : aucun mot de passe ni identifiant de connexion requis.
* Données stockées localement sur votre navigateur (via IndexedDB).

### 2. Système de Notation (Scoring) & Grades
* **Précision mathématique** : Évaluation de chaque artéfact et du build global croisant les valeurs réelles avec les tables de rolls officielles du jeu (`rollTable.json`).
* **Pondération par archétype** : Chaque statistique est valorisée selon le build choisi pour le personnage (DPS, Sub-DPS, Support, etc.).
* **Grades visuels clairs** : Attribution d'un grade de **F** (Poubelle) jusqu'à **ARCHON** (God Roll absolu), avec détail de l'efficacité de chaque sous-statistique et des rolls gaspillés (*dead rolls*).

### 3. Simulateur de Combat & Buffs Dynamiques
* Simulation des statistiques réelles du personnage en conditions de combat :
  * **Passifs d'aptitudes et de constellations** (avec sélection standard, exclusive ou cumulative).
  * **Passifs d'armes et bonus de sets d'artéfacts**.
  * **Résonances élémentaires** actives selon la composition d'équipe.
  * **Buffs d'alliés (*Teammate Buffs*)** : Bennett, Kazuha, Furina, Sara, etc.
  * Prise en compte des **scalings dynamiques** appliqués en fin de chaîne de calcul (ex: conversion de l'ER en DGT Électro).

### 4. Modules de Coaching & Conseils Proactifs
* **Équilibrage Crit** : Analyse du ratio Taux Crit / DGT Crit et détection d'overcap.
* **Besoins en Recharge d'Énergie (ER)** : Comparaison en temps réel avec la cible d'ER recommandée pour l'archétype sélectionné.
* **Détecteur de « Forçage de Set »** : Détecte si un joueur se pénalise en conservant un set 4-pièces aux statistiques médiocres au lieu d'un combo 2p/2p bien supérieur.
* **Évaluation de la Pièce Hors-Set (*Off-piece*)** : Analyse de la pertinence de la pièce isolée.
* **Simulateur d'Offrande Mystique & Potentiel de Reroll** : Évalue la densité de rolls d'une pièce pour conseiller le recyclage ou la conservation.
* **Distribution des Rolls & Pièces Idéales** : Identification des pièces les plus faibles et projection des gains potentiels de statistiques.
* **Recommandations d'Investissement** : Conseils sur les niveaux d'élévation, d'armes et d'aptitudes prioritaires.

### 5. Export & Partage
* **Génération de cartes de build en haute définition (PNG)** intégrant le splash art officiel du personnage, ses statistiques de combat, son score et ses artéfacts.
* Contournement transparent des blocages CORS sur les images distantes via un proxy d'optimisation d'images.
* Liens de partage de profil pour comparer ses builds avec ses amis ou sur Discord.

### 6. Internationalisation (i18n)
* Interface et données entièrement bilingues : **Français** et **Anglais** avec détection automatique de la langue du navigateur et bascule manuelle instantanée.

---

## Stack Technique & Architecture

Le projet a évolué d'une architecture monolithique en Vanilla JS vers une stack moderne et ultra-performante propulsée par **Astro 5** :

* **Framework & Build** : [Astro 5](https://astro.build/) avec **Vite** pour un bundling ultra-rapide, du préchargement de pages (*prefetching*) et une génération optimisée.
* **Gestion d'état** : [Nanostores](https://github.com/nanostores/nanostores) pour une réactivité légère et découplée entre composants.
* **Composants modulaires** :
  * Layouts statiques et dynamiques (`src/layouts/`).
  * Composants d'affichage de profil et vitrine (`src/components/showcase/`, `src/components/profile/`).
  * Modules de coaching indépendants (`src/components/advice/`).
* **Micro-chunks de données dynamiques** : Les configurations de personnages (`data/characters/*.json`), armes (`data/weapons/*.json`) et sets (`data/sets/*.json`) sont découpées et chargées à la demande via `import.meta.glob`, évitant le chargement de mégabytes inutiles.
* **Persistance & Performance** : Moteur de cache local natif basé sur **IndexedDB** (`src/scripts/db.js`) garantissant zéro dépendance externe pour la base locale et des temps de chargement quasi-instantanés.
* **Export Image** : Intégration de `dom-to-image-more` optimisée pour le rendu canvas.
* **Compression & SEO** : `vite-plugin-compression` (Brotli & Gzip), `@astrojs/sitemap`, métadonnées enrichies (OpenGraph, Schema.org).

---

## Structure du Projet

```text
guoba.gg/
├── data/                               # Base de données modulaire du jeu
│   ├── characters/                     # 115+ configurations JSON individuelles par personnage
│   ├── weapons/                        # Passifs et stats de toutes les armes
│   ├── sets/                           # Passifs et effets des sets d'artéfacts
│   └── default_config.json             # Configuration de fallback par défaut
├── public/                             # Assets statiques distribués tels quels
├── src/
│   ├── assets/                         # Images, icônes et visuels d'onboarding
│   ├── components/                     # Composants de l'application
│   │   ├── advice/                     # 20+ modules de coaching (Crit, ER, Reroll, SetForcing...)
│   │   ├── profile/                    # Header joueur, sidebar, évaluation globale
│   │   └── showcase/                   # Carte personnage, artéfacts, armes, buffs, toolbar
│   ├── data/                           # Dictionnaires et tables (rollTable, mappings, couleurs...)
│   ├── layouts/                        # Templates Astro (Layout.astro, StaticLayout.astro)
│   ├── pages/                          # Routes de l'application
│   │   ├── index.astro                 # Vitrine principale et recherche UID
│   │   ├── team.astro                  # Page de présentation de l'équipe
│   │   ├── about.astro                 # Page À propos & FAQ
│   │   └── privacy.astro               # Politique de confidentialité
│   ├── scripts/                        # Logique métier et moteurs de calcul
│   │   ├── script.js                   # Orchestration principale et interactions
│   │   ├── scoring.js                  # Moteur mathématique de notation et pondération
│   │   ├── configLoader.js             # Chargeur dynamique des micro-fichiers JSON
│   │   ├── teammate_buffs.js           # Définition et calcul des buffs d'alliés
│   │   ├── db.js                       # Wrapper natif IndexedDB pour le cache local
│   │   ├── i18n.js                     # Moteur de traduction FR/EN
│   │   └── embedHelper.js              # Générateur d'exports et cartes partagées
│   ├── stores/                         # Stores réactifs Nanostores (appStore.js)
│   └── styles/                         # Feuilles de style modulaires
├── astro.config.mjs                    # Configuration Astro, Vite et plugins
├── package.json                        # Dépendances et scripts de build
└── README.md                           # Documentation du projet
```

---

## Structure d'une Configuration de Personnage (`data/characters/`)

Chaque personnage dispose de son propre fichier JSON structuré, permettant d'ajouter ou ajuster un personnage facilement :

```json
{
  "color": "#AB3D2D",
  "portraitOffset": -38,
  "talents": {
    "auto": 10,
    "skill": 8,
    "burst": 6
  },
  "buffs": [
    {
      "category": "Passifs",
      "buffs": [
        {
          "label": {
            "fr": "Passif : Seule la lune peut savoir (DGTs Pyro)",
            "en": "Passive: The Balemoon alone may know (Pyro DMG)"
          },
          "stats": {
            "pyro_dmg_": 0.4
          }
        }
      ]
    }
  ],
  "builds": {
    "DPS Fonte": {
      "name": {
        "fr": "DPS Fonte",
        "en": "Melt DPS"
      },
      "weights": {
        "critRate_": 1,
        "critDMG_": 1,
        "atk_": 0.8,
        "atk": 0.1,
        "hp_": 0,
        "def_": 0,
        "eleMas": 0.6,
        "enerRech_": 0,
        "pyro_dmg_": 1
      },
      "bestSets": ["FragmentOfHarmonicWhimsy:4"],
      "goodSets": ["GladiatorsFinale:4", "CrimsonWitchOfFlames:4"],
      "er_req": 100,
      "team": [
        { "role": "Sub-DPS", "name": "Citlali", "element": "cryo" },
        { "role": "Buffer", "name": "Bennett", "element": "pyro" },
        { "role": "Flex", "name": ["Kazuha", "Sucrose"], "element": ["anemo", "anemo"] }
      ]
    }
  }
}
```

---

## Installation et Démarrage Local

### Prérequis
* [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
* Gestionnaire de paquets `npm` ou `pnpm`

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-compte/guobagg_enka_tests.git
cd guobagg_enka_tests
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible localement à l'adresse `http://localhost:4321`.

### 4. Construire pour la production
```bash
npm run build
npm run preview
```

---

## Prérequis en Jeu (Pour l'utilisateur)

Pour que l'outil puisse récupérer vos données publiques :
1. Dans Genshin Impact, ouvrez le **Menu Paimon** > **Modifier le profil**.
2. Ajoutez vos personnages dans la **Vitrine de personnages**.
3. **Cochez impérativement l'option : « Afficher les détails des personnages »**.
4. Patientez quelques minutes pour que les serveurs de HoYoverse synchronisent les données publiques.

---

## Équipe & Remerciements

* **Clem** — *Fondateur & Développeur Front-End / Architecture*
* **Bluvitae** — *UI Artist & Conseillère*
* **Services externes & API** :
  * [Enka.Network](https://enka.network/) pour la fourniture des données de vitrine publique.
  * [Astro](https://astro.build/) & [Vite](https://vitejs.dev/) pour le moteur applicatif.
  * [wsrv.nl](https://wsrv.nl/) pour le traitement et le proxy des images.

---

## Rejoindre la communauté & Contribuer

Une suggestion, un bug à signaler ou envie de participer aux tests ?
* Rejoignez le serveur Discord : [Discord guoba.gg](https://discord.gg/CZ5qxVqBVJ)
* Soutenir le projet : [Ko-fi](https://ko-fi.com/guobagg)

---

## Licence & Mentions Légales

*Ce projet est un outil communautaire indépendant et n'est affilié d'aucune manière à **HoYoverse** (COGNOSPHERE PTE. LTD.).*  
*Genshin Impact™ et l'ensemble des éléments graphiques, noms de personnages et marques associées sont la propriété exclusive de HoYoverse.*  
*Aucune donnée personnelle ou identifiant de compte de jeu n'est collecté ni stocké sur un serveur distant.*