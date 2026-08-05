export const SUPPORTED = ['fr', 'en'];
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_lang') : null;
const browser = typeof navigator !== 'undefined' && navigator.language ? navigator.language.slice(0, 2) : 'fr';
export const LANG = SUPPORTED.includes(stored) ? stored
    : SUPPORTED.includes(browser) ? browser
        : 'fr';
if (typeof window !== 'undefined') {
    window.GUOBA_LANG = LANG;
}

// ─────────────────────────────────────────────────────────
//  DICTIONNAIRES
// ─────────────────────────────────────────────────────────
export const T = {

    // ══════════════════════════════════════════════════════
    //  FRANÇAIS
    // ══════════════════════════════════════════════════════
    fr: {
        // ── Titres de page (Meta) ─────────────────────────────
        "page.title.default": "guoba.gg - Simulateur Genshin Impact",
        "page.title.char": (char, player) => `${char} de ${player} - guoba.gg`,
        "meta.description": "guoba.gg est un outil d'analyse de builds et de statistiques pour Genshin Impact. Évaluez vos artéfacts, optimisez vos personnages...",
        "meta.keywords": "Genshin Impact, build, simulateur, artéfacts, enka network, UID, statistiques",
        "meta.og.title.char": (char, player) => `Build de ${char} (${player}) - guoba.gg`,
        "meta.og.description.char": (char) => `Découvrez l'analyse complète du build, l'efficacité des artéfacts et les conseils d'optimisation pour ${char}.`,
        "meta.locale": "fr_FR",

        // ── Labels de stats ───────────────────────────────
        "stat.hp": "PV",
        "stat.hp_": "PV %",
        "stat.atk": "ATQ",
        "stat.atk_": "ATQ %",
        "stat.def": "DÉF",
        "stat.def_": "DÉF %",
        "stat.eleMas": "Maîtrise élémentaire",
        "stat.enerRech_": "Recharge d'énergie",
        "stat.critRate_": "Taux CRIT",
        "stat.critDMG_": "DGT CRIT",
        "stat.heal_": "Bonus de Soins",
        "stat.pyro_dmg_": "Bonus de DGT Pyro",
        "stat.hydro_dmg_": "Bonus de DGT Hydro",
        "stat.cryo_dmg_": "Bonus de DGT Cryo",
        "stat.electro_dmg_": "Bonus de DGT Électro",
        "stat.anemo_dmg_": "Bonus de DGT Anémo",
        "stat.geo_dmg_": "Bonus de DGT Géo",
        "stat.dendro_dmg_": "Bonus de DGT Dendro",
        "stat.physical_dmg_": "Bonus de DGT Physiques",

        // ── Types d'artéfacts ─────────────────────────────
        "artifact.EQUIP_BRACER": "Fleur de la vie",
        "artifact.EQUIP_NECKLACE": "Plume de la mort",
        "artifact.EQUIP_SHOES": "Sables du temps",
        "artifact.EQUIP_RING": "Coupe d'éonothème",
        "artifact.EQUIP_DRESS": "Diadème de Logos",

        // ── Résonances élémentaires ───────────────────────
        "buff.category.resonance": "Résonance",
        "resonance.pyro": "Flammes de la ferveur (Pyro)",
        "resonance.hydro": "Eau médicinale (Hydro)",
        "resonance.dendro": "Liane de la sagesse (Dendro)",
        "resonance.electro": "Tonnerre puissant (Électro)",
        "resonance.cryo": "Glace brisée (Cryo)",
        "resonance.geo": "Roc inamovible (Géo)",
        "resonance.anemo": "Vents de la célérité (Anémo)",

        "ui.setPieces": (n) => `${n} pièces`,
        // ── Sidebar & navigation ──────────────────────────
        "ui.version": (ver, gi) => `Ver. ${ver} - Astro Build (GI Ver. ${gi})`,
        "ui.search.placeholder": "Entrez votre UID...",
        "ui.search.loading": "Chargement des données…",
        "ui.search.error": "Erreur de chargement — rechargez la page",
        "ui.col.name": "Nom",
        "ui.col.score": "Score",
        "ui.col.portrait": "Ordre vitrine",
        "ui.col.sortByName": "Trier par nom",
        "ui.col.sortByScore": "Trier par score",

        // ── Toolbar & menu principal ──────────────────────
        "ui.noArchetype": "Aucun archétype disponible",
        "ui.exportBtn": "Exporter image",
        "ui.helpBtn": "Mode d'emploi",
        "ui.coffee": "Offrir un café",

        // ── Fiche personnage ──────────────────────────────
        "ui.char.level": (n) => `Niv. ${n}`,
        "ui.char.baseStats": "Statistiques de base",
        "ui.char.combatStats": "Statistiques de combat",
        "ui.char.skills": "Aptitudes",
        "ui.char.score": "Score",
        "ui.char.totalRolls": "Rolls totaux",
        "ui.char.buffsTitle": "Buffs actifs",
        "ui.char.buffsHint": "Cochez pour appliquer les passifs et buffs (scroll pour tout voir).",
        "ui.buff.weapon": "(Arme)",
        "ui.buff.set": "(Set)",
        "ui.char.character": "Personnage",
        "ui.char.weapon": "Arme",
        "ui.char.artifacts": "Artéfacts",
        "ui.char.base": "De base",
        "ui.char.ascension": "Élévation",
        "ui.buff.set2p": "Bonus 2p",
        "buff.category.Passifs": "Passifs",
        "buff.category.Constellations": "Constellations",
        "buff.category.Résonance": "Résonance",
        "buff.category.teammate": "Équipe",
        "ui.statTooltip.unbuffed": "Sans buffs",
        "ui.statTooltip.activeBuffs": "Buffs actifs",
        "ui.statTooltip.buffedTotal": "Total sous buffs",
        "ui.statTooltip.baseStat": (stat) => `${stat} de base`,
        "ui.statTooltip.bonusPct": (stat) => (stat && /^[aeioué]/i.test(stat)) ? `Bonus d'${stat}` : `Bonus de ${stat}`,
        "ui.statTooltip.bonusFlat": (stat) => (stat && /^[aeioué]/i.test(stat)) ? `Bonus d'${stat} flat` : `Bonus de ${stat} flat`,
        "ui.statTooltip.artifactSubstats": "Substats des artéfacts",
        "ui.statTooltip.rollCount": (c) => `${c} roll${c > 1 ? 's' : ''}`,
        "ui.statTooltip.rollBreakdown": "Décomposition des rolls",

        // ── Artéfacts ─────────────────────────────────────
        "ui.art.baseAtk": "ATQ de base",
        "ui.art.score": "Score",

        // ── Évaluation globale ────────────────────────────
        "ui.eval.globalGrade": "Note Globale",
        "ui.eval.efficiency": "Efficacité",
        "ui.eval.score": "Score",
        "ui.eval.badges": "Badges et titres",
        "ui.eval.noBadge": "Aucun fait marquant détecté...",

        // ── Page d'accueil (comptes récents) ─────────────
        "home.title": "Comptes récents",
        "home.subtitle": "Sélectionnez un compte précédemment analysé pour le recharger instantanément (jusqu'à 12 comptes à la fois).",
        "home.empty": "Aucun compte chargé",
        "home.emptyHint": "Entrez un UID Genshin Impact dans la barre latérale pour commencer l'analyse.",
        "home.pinAccount": "Épingler ce compte",
        "home.unpinAccount": "Retirer des favoris",
        "home.legal": "Ce site est un projet de fan indépendant et n'est en aucun cas affilié à, parrainé ou approuvé par HoYoverse. <br>Tous les contenus et actifs liés aux jeux sont la propriété exclusive de HoYoverse.",
        "home.enkaCredit": "Ce projet s'appuie sur l'API fournie par <a href='https://enka.network' style='color: inherit; text-decoration: underline;'>Enka.Network</a>, que nous remercions chaleureusement pour leur contribution indispensable à la communauté.",
        "home.designCredit": "Design de la fiche personnage inspiré par Fribbels HSR Optimizer.",
        "home.madeWithAstro": "Fait avec Astro",

        // ── Mobile ───────────────────────────────────────
        "mobile.title": "Version Mobile Non Disponible",
        "mobile.body": "L'interface de ce simulateur a été conçue exclusivement pour les ordinateurs afin de garantir la meilleure expérience possible et d'afficher toutes les statistiques correctement.",
        "mobile.wip": "Une version mobile du site est actuellement en cours de création.",
        "mobile.hint": "Pour l'instant, veuillez y accéder depuis un ordinateur.",

        // ── Erreurs & alertes ─────────────────────────────
        "error.noUid": "UID manquant",
        "error.invalidUid": "L'UID doit être un nombre de 9 ou 10 chiffres.\nVérifiez votre identifiant en jeu (Menu Paimon > Profil).",
        "error.dataLoading": "Les données du jeu sont encore en cours de chargement.\nPatientez quelques secondes puis réessayez.",
        "error.emptyShowcase": "La vitrine de ce compte est vide ou privée !\nVeuillez ajouter des personnages et activer l'option 'Afficher les détails des personnages' en jeu.",
        "error.timeout": "La requête a expiré (délai de 30 s dépassé).\nEnka Network ou le proxy est peut-être surchargé. Réessayez dans quelques instants.",
        "error.notFound": "Aucun compte trouvé pour cet UID (404).\nVérifiez que l'identifiant est correct.",
        "error.rateLimit": "Trop de requêtes envoyées (429 — Rate Limit).\nPatientez quelques secondes avant de réessayer.",
        "error.serverDown": "Le serveur Enka ou le proxy est temporairement indisponible.\nRéessayez dans quelques minutes.",
        "error.generic": "Impossible de récupérer les données.\nVérifiez votre connexion ou réessayez plus tard.",
        "error.gameData": "Impossible de charger les données du jeu (GitHub ou réseau indisponible).\nVeuillez recharger la page.",
        "error.noBuild": "Aucun build affiché !",
        "error.exportFail": "Erreur lors de la création de l'image.",
        "error.invalidLink": "Lien invalide ou compte introuvable.",
        "error.filesErr": "Erreur Fichiers.",
        "error.loadingV2": "Chargement V2 (Indexation)...",
        "error.pageNotFound": "Page introuvable.",

        // ── Export image ──────────────────────────────────
        "export.processing": "Traitement...",

        // ── Section Analyse & Conseils — Titres ──────────
        "analysis.title": (nom) => `${nom} - Analyse & conseils`,
        "analysis.s1.title": "Vue d'ensemble",
        "analysis.s1.desc": "Évaluez la qualité de vos sous-stats et ayez un aperçu réel du potentiel de vos artéfacts actuels.",
        "analysis.s1.buildEff": "Efficacité du Build",
        "analysis.s1.rngFactor": "Facteur Chance (RNG)",
        "analysis.s1.maxScore": "Score Potentiel Max",

        "analysis.s2.title": "Analyse stratégique",
        "analysis.s2.desc": "Identifiez les déséquilibres majeurs de votre build et assurez-vous que votre pièce hors-set apporte un vrai bonus.",
        "analysis.s2.critAnalysis": "Analyse de taux critique",
        "analysis.s2.rollDist": "Répartition des Rolls",
        "analysis.s2.usefulRolls": (n) => `${n} Utiles`,
        "analysis.s2.deadRolls": (n) => `${n} Morts`,
        "analysis.s2.usefulStats": "Stats Utiles",
        "analysis.s2.deadStats": "Stats Inutiles",
        "analysis.s2.noDeadStats": "Aucune !",
        "analysis.s2.offPiece": "Analyse Pièce Hors-Set",
        "ui.art.offPiece": "Off-Set",
        "analysis.offPiece.replaceable": "Remplaçable",
        "analysis.offPiece.offSet": "Hors-Set",
        "analysis.offPiece.setAvg": "Moy. Set",

        "analysis.s3.title": "Plan d'action",
        "analysis.s3.desc": "Votre feuille de route prioritaire avec les corrections urgentes à appliquer et les artéfacts à remplacer.",
        "analysis.s3.p1.title": "Conseils généraux",
        "analysis.s3.noSwap": "Aucun échange avantageux détecté",
        "analysis.s3.talentPriority": "Priorité des Aptitudes",
        "analysis.s3.mainStatTitle": "Problème Statistique Principale",
        "analysis.s3.mainStatOk": "Statistiques Principales",
        "analysis.s3.top3": "Top 3 des artéfacts à changer par ordre de priorité",
        "analysis.top3.tooltip.dropRate": (rate) => `Probabilité d'obtention de cette stat principale : ${rate}%`,
        "analysis.top3.tooltip.fixed": "Stat principale fixe ou garantie",
        "analysis.top3.tooltip.resin": "Estimation basée sur une génération naturelle de 180 Résines par jour.",
        "analysis.top3.thisPiece": "Cette pièce",
        "analysis.top3.globalAvg": "Moy. Globale",
        "analysis.s3.noPriority": "Rien à signaler, excellent travail.",
        "analysis.s3.resinEst": (resin, days) => `~${resin} Résines (${days} jours)`,
        "analysis.s3.mainStatDetail": (piece, better, current) =>
            `Sur <b style="color: #aaa;">${piece}</b>, visez <span style="color:var(--accent-gold); font-weight:bold;">${better}</span> (Actuellement : <span style="color:var(--accent-gold);">${current}</span>).`,
        "analysis.s3.p2.title": "Ce qu'il faut viser",
        "analysis.s3.p3.title": "Échange avantageux",
        "analysis.s3.swap.desc": "Ce système repère les artéfacts équipés sur vos autres personnages qui amélioreraient celui que vous regardez actuellement. Attention : procéder à cet échange optimisera ce personnage au maximum, mais cela réduira inévitablement les statistiques du personnage qui se fait emprunter sa pièce !",
        "analysis.s3.lvl.1": "Niv. 1",
        "analysis.s3.lvl.max": (n) => `Niv. ${n}`,
        "analysis.s3.lvl.current": (n) => `Actuellement : Niv. ${n}`,

        "analysis.s4.title": "Projection idéale",
        "analysis.s4.desc": "Visualisez vos artéfacts sous leur meilleur jour : remplacements des stats inutiles et rolls portés à leur maximum.",
        "analysis.s4.replace": (dead, target) => `Remplacer ${dead} par ${target} :`,
        "analysis.s4.optimal": "Déjà optimal",
        "analysis.s4.totalGains": "Résumé des gains potentiels",

        "analysis.s5.title": "Détails des rolls",
        "analysis.s5.desc": "Lisez dans le code source du jeu et découvrez exactement quelle qualité de statistiques vous avez obtenue.",
        "analysis.s5.unavailable": (stars) => `Artéfact ${stars}★ — Analyse indisponible`,
        "analysis.s5.rollWeak": "Jet faible",
        "analysis.s5.rollMed": "Jet moyen",
        "analysis.s5.rollStrong": "Jet fort",
        "analysis.s5.rollPerfect": "Jet parfait",
        "analysis.s5a.title": "Remplacement des stats inutiles",
        "analysis.s5a.desc": "Chaque statistique inutile est convertie en la statistique utile la plus précieuse disponible, avec le même nombre de rolls.",
        "analysis.s5b.title": "Rolls au maximum",
        "analysis.s5b.desc": "Même répartition de rolls que vos artéfacts actuels, mais chaque roll individuel remplacé par sa valeur maximale possible.",
        "analysis.s5b.unavailable": (stars) => `Artéfact ${stars}★ — Analyse indisponible`,

        "analysis.s6.title": "Simulateur de reroll",
        "analysis.s6.desc": "Évaluez s'il est rentable de redistribuer les valeurs des statistiques de vos artéfacts vers de meilleures valeurs.",
        "analysis.s6.gainPotential": "Potentiel de gain",
        "analysis.s6.lossRisk": "Risque de perte",

        // ── Messages des fonctions de conseil ─────────────
        // getCritAdvice
        "advice.crit.noCrit": "Ce personnage ne dépend pas des statistiques critiques.",
        "advice.crit.overcap": (cr) => `Taux CRIT excédentaire (${cr}%). Le surplus a été déduit de votre score global.`,
        "advice.crit.perfect100": "Taux CRIT parfait. Misez absolument tout sur les DGT CRIT.",
        "advice.crit.highCDLowCR": (cr, cd) => `Taux CRIT excellent (${cr}%), mais vos DGT CRIT (${cd}%) sont trop faibles. Rééquilibrez !`,
        "advice.crit.above90": "Taux CRIT largement suffisant (plus de 90%). Cherchez un maximum de DGT CRIT.",
        "advice.crit.above80": "Taux CRIT suffisant (plus de 80%). En obtenir plus est utile, mais le DGT CRIT devient prioritaire.",
        "advice.crit.highCDLowCR2": (cd, cr) => `Vous avez beaucoup de DGT CRIT (${cd}%) mais votre Taux CRIT (${cr}%) est trop bas pour en profiter !`,
        "advice.crit.above70": "Taux CRIT passable (plus de 70%). Essayez de vous rapprocher des 80%.",
        "advice.crit.above60": "Taux CRIT insuffisant (plus de 60%). Vos grosses attaques rateront trop souvent leur coup critique.",
        "advice.crit.below60": "Taux CRIT largement insuffisant (moins de 60%). Fixez ce problème d'urgence avant de chercher d'autres stats.",

        // getSetRecommendation
        "advice.set.best": "Vous utilisez le meilleur set recommandé !",
        "advice.set.good": (name) => `Set correct, mais <b>${name} (4p)</b> serait optimal.`,
        "advice.set.bad": (name) => `Set non optimal. Visez <b>${name} (4p)</b> pour maximiser les dégâts.`,

        // getMainStatAdvice
        "advice.mainStat.title.ok": "Statistiques Principales",
        "advice.mainStat.ok": "Votre sablier, votre coupe et votre diadème ont tous les trois une statistique principale optimale.",
        "advice.mainStat.title.problem": "Problème Statistique Principale",
        "advice.mainStat.empty": "Aucun artéfact équipé.",

        // getOffPieceAdvice
        "advice.offPiece.empty": "Aucun artéfact équipé.",
        "advice.offPiece.incomplete": "Équipez complètement votre personnage pour évaluer la pertinence de sa pièce hors-set.",
        "advice.offPiece.rainbow": "Équipez votre personnage d'un set 4p ou 2p/2p pour avoir des conseils sur votre pièce hors-set.",
        "advice.offPiece.5of5": (setName, piece, score) =>
            `Vous utilisez 5 pièces du set <b>${setName}</b>. Votre <b style="color: #aaa;">${piece}</b> étant statistiquement la plus faible (Score: ${score}), vous devriez la remplacer par une meilleure pièce hors-set.`,
        "advice.offPiece.good": (piece) => `Excellente pièce hors-set <b style="color: #aaa;">(${piece})</b>. Cette dernière porte votre build vers le haut.`,
        "advice.offPiece.ok": (piece) => `Votre pièce hors-set <b style="color: #aaa;">(${piece})</b> suffit pour l'instant en vue de la rareté de sa stat principale.`,
        "advice.offPiece.bad": (piece) => `Votre pièce hors-set <b style="color: #aaa;">(${piece})</b> pourrait être beaucoup mieux. Vous devriez en chercher une autre dans votre inventaire ou permettre à une autre pièce d'être hors-set.`,

        // getTalentAdvice
        "advice.talent.title": "Aptitudes",
        "advice.talent.ok": "Vos aptitudes sont au niveau recommandé.",
        "advice.talent.critical": (str) => `Améliorer ${str} est important pour ce personnage.`,
        "advice.talent.info": (str) => `Améliorer ${str} est recommandé pour ce personnage.`,
        "advice.talent.item": (label, lvl) => `votre <b style="color: #aaa;">${label}</b> au niv ${lvl}`,
        "advice.talent.auto": "Attaque Normale",
        "advice.talent.skill": "Compétence",
        "advice.talent.burst": "Déchaînement",
        "talents.auto": "Attaque Normale",
        "talents.skill": "Compétence",
        "talents.burst": "Déchaînement",

        // getSetForcingAdvice
        "advice.setForce.title.ok": "Pas de forçage de set d'artéfacts",
        "advice.setForce.title.warning": "Forçage de set d'artéfacts",
        "advice.setForce.ok2p2p": "Set d'artéfacts 2 pièces / 2 pièces optimal et de bonne qualité.",
        "advice.setForce.okRainbow": "Vous utilisez un build arc-en-ciel.",
        "advice.setForce.okQuality": "Set d'artéfacts optimal et de bonne qualité.",
        "advice.setForce.weak": "Vous forcez un set d'artéfacts de 4 pièces avec des artéfacts faibles. Vous devriez essayer une alternative.",
        "advice.setForce.weakHint2p": "Ce personnage fonctionne très bien en set d'artéfacts 2 pièces / 2 pièces, n'hésitez pas à casser votre set d'artéfacts actuel pour de meilleures stats.",
        "advice.setForce.okQualityOffMeta": "Vos artéfacts sont de bonne qualité, mais ce set 4 pièces n'est pas recommandé pour ce personnage.",
        "advice.setForce.empty": "Aucun artéfact équipé.",
        "advice.setForce.incomplete": "Équipez complètement votre personnage pour évaluer la pertinence de vos bonus de set.",

        // getMetaSetAdvice
        "advice.metaSet.title.ok": "Choix du set d'artéfacts",
        "advice.metaSet.title.optimize": "Optimisation du set d'artéfacts",
        "advice.metaSet.title.problem": "Problème de set d'artéfacts",
        "advice.metaSet.ok": "Vous utilisez l'un des meilleurs sets d'artéfacts recommandés pour ce personnage.",
        "advice.metaSet.good": (rec) => `Votre set actuel est correct, mais pour maximiser le build, le set d'artéfacts recommandé est : ${rec}.`,
        "advice.metaSet.bad": (rec) => `Votre set d'artéfacts actuel ne correspond pas aux standards du personnage. Vous devriez opter pour le set d'artéfacts ${rec}.`,

        // getWeaponAdvice
        "advice.weapon.title": "Niveau de l'arme",
        "advice.weapon.none": "Aucune arme équipée.",
        "advice.weapon.low": "Améliorez votre arme au niveau 90 pour maximiser son ATQ de base et sa statistique additionnelle.",
        "advice.weapon.ok": "Votre arme est au niveau maximum.",

        // getRNGAdvice / RollEfficiency
        "advice.rng.title": "Qualité des rolls",
        "advice.rng.low": (pct) => `L'efficacité moyenne de vos rolls est faible (${pct}%). Vous perdez des statistiques potentielles.`,
        "advice.rng.medium": (pct) => `L'efficacité moyenne de vos rolls est correcte (${pct}%).`,
        "advice.rng.good": (pct) => `L'efficacité moyenne de vos rolls est bonne (${pct}%).`,
        "advice.rng.high": (pct) => `L'efficacité moyenne de vos rolls est excellente (${pct}%). Très peu de pertes de valeur.`,
        "advice.rng.efficiency": "Efficacité des rolls",

        // getERAdvice
        "advice.er.title.ok": "Recharge d'Énergie",
        "advice.er.title.low": "Manque de Recharge d'Énergie",
        "advice.er.title.excess": "Excès de Recharge d'Énergie",
        "advice.er.ok": (cur, tgt) => `Votre ER (${cur}%) est idéale pour cet archétype (Cible : ${tgt}%).`,
        "advice.er.low": (cur, tgt) => `Vous avez ${cur}% d'ER, mais cet archétype demande environ <b>${tgt}%</b>. Vos rotations risquent de bloquer.`,
        "advice.er.excess": (cur, tgt) => `Vous avez ${cur}% d'ER, ce qui est bien au-dessus du nécessaire (${tgt}%). Essayez de troquer de l'ER contre d'autres stats.`,
        "advice.er.target": "Cible :",

        // getLevelAdvice
        "advice.level.title": "Niveau du Personnage",
        "advice.level.low": "Améliorez votre personnage au niveau 90 pour maximiser ses statistiques.",
        "advice.level.ok": "Votre personnage est au niveau 90.",
        "advice.level.ascended": "Niveau 95 atteint grâce à une Masterless Stella Fortuna. Vous avez dépassé le cap standard de 90 !",
        "advice.level.legendary": "Niveau 100 atteint grâce à 3 Masterless Stella Fortuna. Bien joué !",

        // getFarmDifficulty
        "farm.easy": "Facile",
        "farm.medium": "Relativement facile",
        "farm.hard": "Relativement difficile",
        "farm.veryHard": "Difficile",
        "farm.extreme": "Très difficile",

        // calculateRerollMetrics badges
        "reroll.na.stars": (stars) => `Artéfact ${stars}★ — Non applicable`,
        "reroll.na.level": (lvl) => `Niveau ${lvl}/20 — Montez l'artéfact avant d'analyser`,
        "reroll.neutral": "Neutre",
        "reroll.trash": "Poubelle (Ne pas reroll)",
        "reroll.tooRisky": "Trop risqué (Garder)",
        "reroll.recommended": "Poussière Recommandée",
        "reroll.optimizable": "Optimisable",
        "reroll.notWorth": "Peu rentable",

        // simulateDeadStatReplacements
        "sim.title": "Optimisation des substats mortes",
        "sim.replace": (dead, target) => `Remplacer ${dead} par ${target} :`,
        "sim.range": "à",
        "ui.and": " et ",

        // ── Onboarding ────────────────────────────────────
        "ob.step": (cur, tot) => `Étape ${cur} / ${tot}`,
        "ob.prev": "Précédent",
        "ob.next": "Suivant",
        "ob.finish": "C'est parti !",
        "ob.close": "Fermer le tutoriel",
        "ob.screenshot": "Screenshot à venir",

        "ob.s1.title": "Préparez votre vitrine",
        "ob.s2.title": "Score & Grade : deux lectures",
        "ob.s3.title": "Lisez votre build d'un coup d'œil",
        "ob.s4.title": "Vérifiez vos Buffs Actifs",
        "ob.s5.title": "La section Analyse & Conseils",

        // ── Badges (nom, description) ──────────────────────
        "badge.masterEndgame.name": "Maître de l'Endgame",
        "badge.masterEndgame.desc": "A conquis les Abysses, le Théâtre et le Carnage. Respect absolu.",
        "badge.abyssArchon.name": "Archon des Abysses",
        "badge.abyssArchon.desc": "A obtenu 36 étoiles dans les Profondeurs spiralées.",
        "badge.theaterStar.name": "Étoile du Théâtre",
        "badge.theaterStar.desc": "A brillé dans le Théâtre de l'Imaginarium.",
        "badge.carnageKing.name": "Roi du Carnage",
        "badge.carnageKing.desc": "A vaincu les pires horreurs du Carnage Chtonien.",
        "badge.legend.name": "Mythe Vivant",
        "badge.legend.desc": "Carnage Chtonien Difficulté 6 complété en moins de 180s. Vous avez officiellement 'fini' le jeu.",
        "badge.carnagePlague.name": "Fléau du Carnage",
        "badge.carnagePlague.desc": "Difficulté 6 du Carnage Chtonien complétée. Les monstres vous craignent.",
        "badge.veteran.name": "Vétéran Endurci",
        "badge.veteran.desc": "Niveau d'aventure 60 atteint. Il est temps d'aller toucher de l'herbe.",
        "badge.perfection.name": "Perfection Inatteignable",
        "badge.perfection.desc": "Plus de 95% d'efficacité moyenne. Vos artéfacts n'ont aucun défaut.",
        "badge.oneTrick.name": (nom) => `${nom} One Trick`,
        "badge.oneTrick.desc": (nom) => `Votre vitrine entière est dédiée à ${nom}.`,
        "badge.hiddenCollection.name": "Collection Cachée",
        "badge.hiddenCollection.desc": "Moins de 12 personnages exposés. Vous gardez vos secrets.",
        "badge.whale.name": "Baleine",
        "badge.whale.desc": "Un personnage 5 étoiles C6 détecté.",
        "badge.narval.name": "Le Narval",
        "badge.narval.desc": "Plusieurs personnages 5 étoiles C6 détectés. Vous êtes un actionnaire HoyoVerse ou quoi ?",
        "badge.lucky.name": "Touché par la Grâce",
        "badge.lucky.desc": (rng) => `RNG moyenne exceptionnelle (${rng}%). Le jeu vous aime.`,
        "badge.cursed.name": "Maudit par la RNG",
        "badge.cursed.desc": (rng) => `RNG moyenne catastrophique (${rng}%).`,
        "badge.divine.name": "Réunion Divine",
        "badge.divine.desc": "Votre vitrine rassemble au moins 4 Archons. Le Mont Olympe vous envie.",
        "badge.tripleCrown.name": "Triple Couronne",
        "badge.tripleCrown.desc": "Vous avez investi 3 couronnes sur un même personnage. Dévouement royal.",
        "badge.leviathan.name": "Léviathan",
        "badge.leviathan.desc": "Personnage 5★ C6 avec arme 5★ R5 détecté. Merci de financer le jeu !",
        "badge.allInCrit.name": "All-in Crit",
        "badge.allInCrit.desc": "Plus de 300% de DGT CRIT détecté. Si ça critique, ça désintègre.",
        "badge.surgical.name": "Précision Chirurgicale",
        "badge.surgical.desc": "100% de Taux Critique atteint. Vous ne laissez aucune place au hasard.",
        "badge.powerPlant.name": "Centrale Électrique",
        "badge.powerPlant.desc": "Au moins un perso dépasse les 200% d'ER. Déchaînement infini !",
        "badge.asthmatic.name": "Asthmatique",
        "badge.asthmatic.desc": "Exactement 100% d'ER sur un perso. Vous courez après les particules.",
        "badge.alchemist.name": "Alchimiste",
        "badge.alchemist.desc": "Plus de 1000 de ME détecté. Les réactions sont votre religion.",
        "badge.casino.name": "Casino Impact",
        "badge.casino.desc": "Ratio Crit extrême sur un DPS (<40% TC / >200% DC).",
        "badge.hpTank.name": "Increvable",
        "badge.hpTank.desc": "Au moins un personnage dépasse les 60 000 PV !",
        "badge.impostor.name": "Imposteur",
        "badge.impostor.desc": "Une de vos pièces d'artéfact a une stat principale totalement inadaptée.",
        "badge.qiqiCurse.name": "Malédiction de la Perma",
        "badge.qiqiCurse.desc": "Personnage de la bannière permanente C6 détecté. On respecte la douleur des 50/50 perdus.",
        "badge.nudist.name": "En Grève",
        "badge.nudist.desc": "Ce personnage HL refuse de travailler tant qu'il n'aura pas d'artéfacts.",
        "badge.intern.name": "Le Stagiaire",
        "badge.intern.desc": "Ce personnage de bas niveau s'est perdu dans votre vitrine.",
        "badge.aloy.name": "Voyageur Temporel",
        "badge.aloy.desc": "Aloy détectée. Vous êtes l'un des 12 derniers joueurs à vous souvenir d'elle.",
        "badge.tiersMonde.name": "Tiers-Monde",
        "badge.tiersMonde.desc": "Un personnage niveau 90 avec une arme 3★. Si c'est bête mais que ça marche...",
        "badge.akasha.name": "Akashamaxxing",
        "badge.akasha.desc": "Vous avez bourré les stats critiques sur un personnage qui n'en a pas besoin. Tout pour le Top 1%, rien pour l'équipe.",
        "badge.holyGrail.name": "Le Saint Graal",
        "badge.holyGrail.desc": "Possède un artéfact dépassant les 50 de Valeur Critique (CV). Une véritable relique divine.",
        "badge.89.name": "89 Enjoyer",
        "badge.89.desc": "On économise les leçons du héros jusqu'au bout !",
        "badge.emblemFan.name": "Accro à l'Emblème",
        "badge.emblemFan.desc": "Vous passez trop de temps dans le domaine de Momiji.",
        "badge.favSect.name": "Secte de Favonius",
        "badge.favSect.desc": "La moitié de l'équipe a une arme de Favonius. Bonjour les particules blanches !",
        "badge.rainbow.name": "Artiste Arc-en-ciel",
        "badge.rainbow.desc": "Une bonne partie de votre vitrine n'a aucun bonus 4 pièces !",
        "badge.pacifist.name": "Pacifiste",
        "badge.pacifist.desc": "Un personnage haut niveau mais avec des aptitudes utiles non montées.",
        "badge.f2p.name": "F2P By The Way",
        "badge.f2p.desc": "La majorité de votre vitrine est composée de 4 étoiles.",
        "badge.champLeague.name": "Ligue des Champions",
        "badge.champLeague.desc": "Aucun 4 étoiles. Seule l'élite a le droit de figurer sur votre profil.",
        "badge.bondUnbreakable.name": "Lien Indéfectible",
        "badge.bondUnbreakable.desc": "Niveau d'affinité 10 sur toute la vitrine. Vous aimez vraiment vos persos.",
        "badge.monopoly.name": (elem) => `Monopole ${elem}`,
        "badge.monopoly.desc": "Vitrine 100% mono-élément. Les autres éléments n'existent pas pour vous.",
        "badge.supremacy.name": (elem) => `Suprématie ${elem}`,
        "badge.supremacy.desc": "La majorité de votre vitrine partage cet élément.",
        "badge.archivist.name": "Érudit d'Irminsul",
        "badge.archivist.desc": "Plus de 1700 succès déverrouillés. Teyvat n'a absolument plus aucun secret pour vous.",
        "badge.fatui.name": "Exécuteur Fatui",
        "badge.fatui.desc": "La vitrine rassemble au moins trois Exécuteurs. Une véritable réunion de famille de Snezhnaya.",
        "badge.hospital.name": "Hôpital de Teyvat",
        "badge.hospital.desc": "Votre vitrine est une véritable clinique. Vous refusez catégoriquement de voir vos personnages perdre le moindre PV.",
        "badge.tourist.name": "Touriste",
        "badge.tourist.desc": "Niveau d'Aventure élevé, mais moins de 1000 succès. Vous jouez au jeu au moins ?",
        "badge.celestia.name": "L'Élu de Célestia",
        "badge.celestia.desc": "Absolument tous les rolls d'un personnage sont tombés sur des statistiques utiles. Vous avez vaincu les mathématiques.",
        "badge.offensiveAnomaly.name": "Anomalie Offensive",
        "badge.offensiveAnomaly.desc": "0 Maîtrise Élémentaire, 100% de Recharge d'Énergie, avec 5 artéfacts +20 sur un personnage. La brutalité pure.",
        "badge.og.name": "OG",
        "badge.og.desc": "Votre UID indique que vous étiez là dès les premiers jours du jeu. Un véritable vétéran de la première heure.",
        "badge.starter.name": "Starter Pack",
        "badge.starter.desc": "Amber, Kaeya et Lisa sont réunis dans votre vitrine. Une loyauté indéfectible aux racines de l'aventure.",
        "badge.plombier.name": "Plomberie Dramatique",
        "badge.plombier.desc": "Furina équipée du 'Passeur du Fleuve cendré'. Un choix d'accessoire... audacieux pour une idole.",
        "badge.sandrone.name": "Sceau du Créateur",
        "badge.sandrone.desc": "Vous avez placé Sandrone dans votre vitrine. Le créateur du site valide officiellement vos excellents goûts.",
        "badge.creator.name": "Le Créateur",
        "badge.creator.desc": "Le cerveau derrière ce site. Coucou c'est moi !",
        "badge.contributor.name": "Contributeur",
        "badge.contributor.desc": "A aidé à forger cet outil. La communauté vous remercie !",
        "badge.bestie.name": "Bestie !",
        "badge.bestie.desc": "Ami(e) VIP du créateur. Un statut hautement privilégié.",
        "badge.raidenCatch.name": "La Pêche à l'Éternité",
        "badge.raidenCatch.desc": "La toute-puissante Shogun se bat avec une fourche à poisson. L'éternité attendra, il y a des poissons à attraper.",
        "badge.zhongliTassel.name": "L'Archon Fauché",
        "badge.zhongliTassel.desc": "Le créateur des Moras est tellement fauché qu'il utilise une lance 3 étoiles tueuse de blobs.",
        "badge.hearth.name": "Foyer de l'Âtre",
        "badge.hearth.desc": "Père et ses enfants sont réunis. Le Foyer de l'Âtre ne laisse jamais les siens derrière.",
        "badge.kamisato.name": "Commission Yashiro",
        "badge.kamisato.desc": "L'illustre Clan Kamisato au grand complet. L'élégance, le devoir, et quelqu'un pour passer le balai.",
        "badge.arataki.name": "Gang Arataki",
        "badge.arataki.desc": "Le glorieux Gang Arataki est dans la place ! Heureusement que Shinobu est là pour gérer le budget.",
        "badge.adepti.name": "Adeptes de Liyue",
        "badge.adepti.desc": "Les êtres illuminés veillent sur votre vitrine. L'héritage de Liyue est entre de bonnes mains.",
        "badge.sumeru.name": "Amis de Sumeru",
        "badge.sumeru.desc": "Le quatuor de l'Académie est réuni. Préparez-vous pour des disputes de loyer et des blagues douteuses.",
        "badge.mermonia.name": "Palais Mermonia",
        "badge.mermonia.desc": "La Cour de Fontaine est en session. La justice sera rendue avec la plus grande des théâtralités.",
        "badge.stellaFortuna.name": "Stella Fortuna",
        "badge.stellaFortuna.desc": "A dépensé 3 Masterless Stella Fortuna sur un personnage pour l'amener au niveau 100. La chance (ou le portefeuille) sourit aux audacieux.",

        // ── Accessibilité (Balises Alt) ───────────────────
        "ui.alt.achievements": "Succès",
        "ui.alt.theater": "Théâtre de l'Imaginarium",
        "ui.alt.abyss": "Profondeurs spiralées",
        "ui.alt.stygian": "Carnage Chtonien",
        "ui.alt.kofi": "Icône Ko-fi",
        "ui.alt.weapon": "Arme",

        // ── getText fallbacks ─────────────────────────────
        "data.unknown": "Inconnu",
        "data.loading": "Chargement...",
        "data.unknownPlayer": "Joueur inconnu",
        "data.traveler": "Voyageur",

        // ── Thèmes ────────────────────────────────────────
        "theme.dark": "Sombre Classique",
        "theme.abyssal": "Fond Abyssal",
        "theme.sea": "Mer Primordiale",
        "theme.wish": "Vœu de Minuit",
        "theme.guild": "Guilde des Aventuriers",

        "wtl.or": "ou",
        "wtl.anyChoice": "Au choix",
        "wtl.chooseAmong": (n) => `${n} au choix parmi :`,
        "wtl.offSetPiece": "Pièce Hors-Set",
        "wtl.anySet": "Set au choix",
        "analysis.s3.noSwapOn": (piece) => `Aucun échange<br>avantageux détecté<br>sur ${piece}`,

        // ── Menu statique ─────────────────────────────────
        "nav.home": "Accueil",
        "nav.about": "À propos",
        "nav.team": "L'équipe",
        "nav.privacy": "Confidentialité",

        // ── Pages statiques ───────────────────────────────
        "page.about.title": "guoba.gg",
        "page.about.lead": "Un optimiseur de builds Genshin Impact indépendant, conçu par des joueurs, pour des joueurs.",
        "page.about.q1.title": "Qu'est-ce que guoba.gg ?",
        "page.about.q1.p1": "<strong>guoba.gg</strong> réinvente l'optimisation sur Genshin Impact. Bien plus qu'une simple calculatrice, c'est un véritable <strong>coach virtuel</strong> : en entrant votre UID, l'outil évalue la qualité mathématique pure de vos équipements via un double système de score et de grade, simule vos statistiques réelles en combat sous buffs, et vous guide pas à pas pour perfectionner votre personnage.",
        "page.about.q1.p2": "Le projet est né d'une frustration simple : le besoin d'avoir un outil précis, immersif et proactif pour orienter ses choix de farm sans avoir à ouvrir un tableur.",
        "page.about.q2.title": "Comment ça fonctionne ?",
        "page.about.q2.c1.title": "Récupération",
        "page.about.q2.c1.desc": "Vos données sont lues via l'API publique d'<a href=\"https://enka.network\" target=\"_blank\" rel=\"noopener\">Enka.Network</a> à partir de votre UID. Aucun compte, aucun mot de passe, et vos données sont en local.",
        "page.about.q2.c2.title": "Calcul",
        "page.about.q2.c2.desc": "Chaque artéfact est évalué selon les tables de rolls officielles du jeu, pondéré par les besoins de votre personnage et ajusté selon vos bonus de set.",
        "page.about.q2.c3.title": "Coaching visuel",
        "page.about.q2.c3.desc": "Les résultats s'affichent sous forme de fiches immersives avec des grades, des graphiques et des recommandations d'actions immédiates.",
        "page.about.q2.c4.title": "Partage & Export",
        "page.about.q2.c4.desc": "Générez une fiche visuelle de votre personnage en un clic, ou partagez directement le lien de votre profil avec la communauté pour comparer vos builds.",
        "page.about.q3.title": "Ce que guoba.gg n'est pas",
        "page.about.q3.l1": "Ce n'est <strong>pas</strong> un outil officiel de HoYoverse.",
        "page.about.q3.l2": "Ce n'est <strong>pas</strong> un simulateur de dégâts ou un classement de speedrun.",
        "page.about.q3.l3": "Ce n'est <strong>pas</strong> une base de données de tier lists.",
        "page.about.q3.note": "L'outil se concentre sur la <strong>qualité de votre investissement</strong> : vos artéfacts sont-ils mathématiquement excellents, votre build est-il bien équilibré en jeu, et que devez-vous farmer en priorité absolue ?",
        "page.about.q4.title": "Open source & contributions",
        "page.about.q4.desc": "Le projet est ouvert aux retours de la communauté. Si vous repérez une erreur dans les poids d'un personnage, une stat mal calculée ou souhaitez proposer une amélioration, rejoignez le Discord.",

        "page.team.title": "L'équipe",
        "page.team.lead": "Les personnes INCROYABLES derrière ce projet !",
        "page.team.clem.role": "Fondateur & Développeur",
        "page.team.clem.bio": "Créateur du projet. Développement front-end, UX/UI, architecture, système de scoring et maintenance générale.",
        "page.team.blu.role": "UI Artist & Conseillère",
        "page.team.blu.bio": "Conseillère générale et première testeuse. Soutien stratégique et création d'un bon nombre d'icônes de l'interface.",
        "page.team.copyUid": "Copier l'UID",
        "page.team.thanks.title": "Remerciements",
        "page.team.thanks.lead": "Ce projet n'existerait pas sans :",
        "page.team.thanks.l1": "<a href=\"https://enka.network\" target=\"_blank\" rel=\"noopener\">Enka.Network</a> — API de données joueur",
        "page.team.thanks.l2": "La communauté Discord qui teste, remonte des bugs et suggère des améliorations",
        "page.team.thanks.l3": "Fribbels, pour l'inspiration du design de la fiche personnage",

        "page.privacy.title": "Charte de confidentialité",
        "page.privacy.lead": "Transparence sur les données que guoba.gg collecte — ou plutôt ne collecte pas.",
        "page.privacy.q1.title": "Ce que nous ne collectons pas",
        "page.privacy.q1.p1": "guoba.gg ne possède <strong>aucun compte utilisateur</strong>, ne demande aucune inscription, aucun email, aucun mot de passe.",
        "page.privacy.q1.p2": "Nous n'avons pas accès à votre compte HoYoverse. Votre UID est une information publique exposée nativement par le jeu.",
        "page.privacy.q2.title": "Données locales (votre navigateur)",
        "page.privacy.q2.p1": "L'application stocke uniquement dans votre <code>localStorage</code> :",
        "page.privacy.q2.l1": "Les <strong>UIDs récemment consultés</strong> et les métadonnées associées (pseudo, avatar, stats de profil) pour l'affichage de la page d'accueil.",
        "page.privacy.q2.l2": "Vos <strong>préférences d'interface</strong> : thème visuel, langue, compte favori.",
        "page.privacy.q2.note": "Ces données ne quittent jamais votre appareil. Elles ne sont ni transmises, ni vendues, ni analysées par nos soins. Vous pouvez les effacer à tout moment via les paramètres de votre navigateur.",
        "page.privacy.q3.title": "API tierce — Enka.Network",
        "page.privacy.q3.p1": "Lorsque vous entrez un UID, une requête est envoyée à notre proxy (<code>guobagg.clement-torchiat.workers.dev</code>), lui-même relayant vers <a href=\"https://enka.network\" target=\"_blank\" rel=\"noopener\">Enka.Network</a>. Les données renvoyées sont celles que le jeu expose publiquement : personnages en vitrine, artéfacts et armes équipés, statistiques de profil.",
        "page.privacy.q3.p2": "Consultez la <a href=\"https://enka.network/privacy-policy/\" target=\"_blank\" rel=\"noopener\">politique d'Enka.Network</a> pour les détails sur leur propre traitement des données.",
        "page.privacy.q4.title": "Clause de non-responsabilité et affiliation",
        "page.privacy.q4.p1": "guoba.gg est un projet tiers indépendant créé par la communauté. Ce site n'est en aucun cas affilié, commandité, approuvé ou associé à <strong>HoYoverse</strong> ou <strong>Cognosphere PTE. LTD.</strong>",
        "page.privacy.q4.p2": "<em>Genshin Impact</em>, ainsi que l'ensemble des éléments graphiques, modèles de jeu, noms de personnages et ressources visuelles utilisés sur ce domaine, demeurent la propriété intellectuelle exclusive de HoYoverse. Leur utilisation s'inscrit dans le cadre d'un usage non commercial destiné à l'information et à l'assistance des joueurs.",
        "page.privacy.q5.title": "Cookies & traceurs",
        "page.privacy.q5.p1": "guoba.gg n'utilise <strong>aucun cookie</strong> de tracking, aucune régie publicitaire, aucun outil d'analyse comportementale (Google Analytics, etc.).",
        "page.privacy.q6.title": "Contact",
        "page.privacy.q6.p1": "Pour toute question relative à la confidentialité, rejoignez le Discord et adressez-vous à clem.",
        "page.privacy.date": "Dernière mise à jour : juin 2026",

        "ob.steps": [
            {
                title: "Préparez votre vitrine",
                html: `
        <p>Bienvenue sur <strong>guoba.gg</strong> !</p>
        <p class="ob-note-blue">guoba.gg est un outil d'analyse de builds pour Genshin Impact. Il évalue la qualité de vos artéfacts, note vos personnages et vous aide à prioriser votre farm — le tout automatiquement, à partir de votre vitrine en jeu.</p>
        <p>Le site récupère vos données via <strong>Enka.Network</strong>. Voici comment préparer votre compte en jeu :</p>
        <ul>
            <li>Menu Paimon → <strong>Modifier le profil</strong></li>
            <li>Activez <strong>"Afficher les détails des personnages"</strong></li>
            <li>Placez vos personnages dans votre <strong>Vitrine</strong></li>
            <li>Attendez ~5 min après déconnexion</li>
        </ul>
        <p>Ensuite, entrez votre <strong>UID</strong> dans la barre de recherche à gauche — et c'est parti !</p>`,
                image: "assets/onboarding/step1.gif",
                placeholder: false
            },
            {
                title: "Score & Grade : deux lectures",
                html: `
        <p>Chaque build est évalué avec <strong>deux métriques complémentaires</strong> :</p>
        <div class="ob-metric">
            <div class="ob-metric-icon">🎯</div>
            <div class="ob-metric-body">
                <strong>Le Score — votre puissance réelle</strong>
                <span>Tient compte des substats, de la mainstat et du set — pondérés selon l'utilité de chaque stat pour <em>ce personnage précis</em>.</span>
            </div>
        </div>
        <div class="ob-metric">
            <div class="ob-metric-icon">🎲</div>
            <div class="ob-metric-body">
                <strong>Le Grade (F → ARCHON) — votre chance au RNG</strong>
                <span>Mesure combien de vos améliorations sont tombées sur de bonnes stats, et à quelle valeur.</span>
            </div>
        </div>
        <div class="ob-note-blue">💡 Un Grade élevé avec un Score moyen ? Vous avez eu de la chance, mais les pièces ne sont pas optimales. L'inverse ? Bon build, RNG difficile. Les deux ensemble ? C'est le Saint-Graal.</div>`,
                image: "assets/onboarding/step2.png",
                placeholder: false
            },
            {
                title: "Lisez votre build d'un coup d'œil",
                html: `
        <p>Une fois votre UID chargé, vos personnages apparaissent dans la <strong>liste à gauche</strong>. Cliquez sur l'un d'eux pour afficher son build complet.</p>
        <ul>
            <li>Chaque artéfact affiche son <strong>grade individuel</strong> et met en valeur les substats selon leur poids</li>
            <li>La liste latérale permet de <strong>comparer vos personnages</strong>.</li>
            <li>Le bouton <strong>Exporter image</strong> génère un récap visuel à partager avec vos amis !</li>
        </ul>`,
                image: "assets/onboarding/step3.png",
                placeholder: false
            },
            {
                title: "Vérifiez vos Buffs Actifs",
                html: `
        <p>Avant de passer à la partie <strong>conseils</strong>, vérifiez la carte <strong>Buffs Actifs</strong>, en bas à droite de la fiche personnage.</p>
        <p>Certains personnages bénéficient de buffs situationnels — constellation, résonance d'équipe, passifs conditionnels — qui peuvent faire varier les conseils et les stats de combat de façon significative.</p>
        <div class="ob-note-blue">⚠️ Votre score peut être impacté par un overcap de Taux Critique. Ce malus restera même si vous désactivez les buffs liés au Taux Critique.</div>`,
                image: "assets/onboarding/step4.png",
                placeholder: false
            },
            {
                title: "La section Analyse & Conseils",
                html: `
        <p>Accessible depuis la fiche de chaque personnage, cette section se décompose en <strong>6 parties</strong> :</p>
        <div class="ob-grid-2x2">
            <div class="ob-grid-card">
                <span class="ob-gc-icon">📊</span>
                <span class="ob-gc-title">1. Vue d'ensemble</span>
                <span class="ob-gc-desc">Efficacité du build, facteur chance RNG et score potentiel maximum.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">🔍</span>
                <span class="ob-gc-title">2. Analyse stratégique</span>
                <span class="ob-gc-desc">Taux critique, recharge d'énergie, rolls utiles/morts et pièce hors-set.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">🗺️</span>
                <span class="ob-gc-title">3. Plan d'action</span>
                <span class="ob-gc-desc">Feuille de route : échanges entre persos, niveau, arme, aptitudes et mainstat.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">✨</span>
                <span class="ob-gc-title">4. Projection idéale</span>
                <span class="ob-gc-desc">Simulez ce que vos artéfacts donneraient si vos stats inutiles devenaient optimales.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">🎲</span>
                <span class="ob-gc-title">5. Détails des rolls</span>
                <span class="ob-gc-desc">La qualité exacte de chaque roll par artéfact, lue dans le code source du jeu.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">♻️</span>
                <span class="ob-gc-title">6. Simulateur de reroll</span>
                <span class="ob-gc-desc">Estimez si passer une pièce à l'Offrande Mystique vaut vraiment le risque.</span>
            </div>
        </div>`,
                image: "assets/onboarding/step5.png",
                placeholder: false
            }
        ],

        // ── Roadmap de Compte ─────────────────────────────
        "roadmap.button.title": "Roadmap du compte",
        "roadmap.button.subtitle": "Stratégie globale",
        "roadmap.button.badge": (n) => `${n} actions`,
        "roadmap.page.title": "Roadmap Stratégique du Compte",
        "roadmap.page.subtitle": (count) => `Synthèse et plan d'action d'optimisation pour les ${count} personnages de votre vitrine.`,
        "roadmap.nav.back": "Retour à la vitrine",
        "roadmap.focus.label": "Focus :",
        "roadmap.focus.all": "Tous",
        "roadmap.focus.targetBadge": (char) => `Cible : ${char}`,
        "roadmap.focus.domainPriority": "Domaine Prioritaire",
        "roadmap.focus.strongboxPriority": "Synthèse Prioritaire",
        "roadmap.toggleAllChars.label": "Tous les persos du jeu",
        "roadmap.toggleAllChars.active": "Vitrine uniquement",
        "roadmap.outsideShowcase": "Hors-vitrine",
        "roadmap.noCharacters": "Aucun personnage chargé. Entrez votre UID pour afficher la Roadmap.",

        // Module 1 : Baromètre de Maturité
        "roadmap.maturity.title": "Baromètre de Maturité Globale",
        "roadmap.maturity.desc": "Indicateur synthétique du niveau d'avancement et de complétion de vos personnages de vitrine.",
        "roadmap.maturity.weapons": "Niv. Armes",
        "roadmap.maturity.characters": "Niv. Personnages",
        "roadmap.maturity.talents": "Aptitudes",
        "roadmap.maturity.mainstats": "Stats Principales",
        "roadmap.maturity.sets": "Sets d'Artéfacts",
        "roadmap.maturity.avgScore": "Score Moyen Vitrine",
        "roadmap.maturity.globalIndex": "Maturité Globale",

        // Module 2 : Explications détaillées des 5 baromètres
        "roadmap.breakdown.title": "Plan d'Action des 5 Baromètres",
        "roadmap.breakdown.desc": "Détail précis des améliorations à apporter sur vos personnages pour atteindre 100% sur chaque indicateur.",
        "roadmap.breakdown.weapons": "Armes à monter Niv. 90",
        "roadmap.breakdown.weapons.ok": "Toutes vos armes équipées sont au niveau maximal.",
        "roadmap.breakdown.levels": "Niveaux de Personnages",
        "roadmap.breakdown.levels.ok": "Tous vos personnages sont au niveau maximal recommandé.",
        "roadmap.breakdown.talents": "Aptitudes Clés à améliorer",
        "roadmap.breakdown.talents.ok": "Toutes les aptitudes clés sont au niveau recommandé.",
        "roadmap.breakdown.mainstats": "Stats Principales à corriger",
        "roadmap.breakdown.mainstats.ok": "Toutes les statistiques principales sont optimales.",
        "roadmap.breakdown.sets": "Sets d'Artéfacts à équiper",
        "roadmap.breakdown.sets.ok": "Tous vos personnages sont équipés de leurs sets recommandés.",
        "roadmap.breakdown.optimal": "Optimal",
        "roadmap.breakdown.toDo": (n) => `${n} à faire`,
        "roadmap.breakdown.moreItems": (n) => `+ ${n} autres`,
        "roadmap.breakdown.noSetBonus": "Aucun bonus",
        "roadmap.breakdown.setBonus2p": (n) => `${n} bonus 2p`,
        "roadmap.breakdown.reason.base": "Stats de base & élévation",
        "roadmap.breakdown.reason.hp": "Scaling PV% majeur",
        "roadmap.breakdown.reason.def": "Scaling DÉF% majeur",
        "roadmap.breakdown.reason.em": "Scaling ME & Réactions",
        "roadmap.breakdown.reason.reactions": "Réactions élémentaires",
        "roadmap.action.weaponLevel": (char, weapon, cur, target) => `Monter l'arme de ${char} (${weapon}) du Niv. ${cur} au Niv. ${target}`,
        "roadmap.action.talentLevel": (char, talent, cur, target) => `Améliorer ${talent} de ${char} du Niv. ${cur} au Niv. ${target}`,
        "roadmap.action.charLevel": (char, cur, reason) => `Élever ${char} du Niv. ${cur} au Niv. 90 (${reason})`,
        "roadmap.action.replaceFlowerPlume": (char, slot, score) => `Remplacer la ${slot} de ${char} (score actuel: ${score})`,
        "roadmap.action.fixMainStat": (char, slot, curStat, bestStat) => `Corriger la stat principale de la ${slot} de ${char} (${curStat} → ${bestStat})`,
        "roadmap.action.completeSet": (char, neededSet) => `Compléter le set 4p de ${char} (${neededSet})`,
        "roadmap.action.noActions": "Toutes les étapes prioritaires sont déjà accomplies !",

        // Module 3 : Optimiseur de Swaps Croisés
        "roadmap.swaps.title": "Optimiseur de Swaps Croisés",
        "roadmap.swaps.desc": "Réallocations immédiates d'artéfacts entre vos personnages pour maximiser le score total du compte sans dépenser de résine.",
        "roadmap.swaps.netGain": (gain) => `Gain net vitrine : +${gain} pts`,
        "roadmap.swaps.noSwaps": "Aucune permutation profitable détectée : vos artéfacts sont déjà distribués de manière optimale !",
        "roadmap.swaps.swapPiece": (charA, charB, pieceName) => `Échanger la ${pieceName} entre ${charA} et ${charB}`,
        "roadmap.swaps.givesPiece": (charA, charB, pieceName) => `${charA} cède sa ${pieceName} à ${charB}`,
        "roadmap.swaps.focusGain": (char) => `Gain pour ${char}`,

        // Module 4 : Planificateur de Domaines
        "roadmap.domains.title": "Planificateur de Domaines",
        "roadmap.domains.desc": "Classement des domaines d'artéfacts selon le nombre de personnages de votre compte pouvant rentabiliser leurs sets.",
        "roadmap.domains.efficiency.veryHigh": "Rentabilité Exceptionnelle",
        "roadmap.domains.efficiency.high": "Haute Rentabilité",
        "roadmap.domains.efficiency.medium": "Rentabilité Modérée",
        "roadmap.domains.efficiency.low": "Faible Rentabilité",
        "roadmap.domains.efficiency.none": "Aucun",
        "roadmap.domains.beneficiaries": "Personnages concernés :",
        "roadmap.domains.bothSetsUseful": "Domaine doublement rentable (les 2 sets sont utiles !)",
        "roadmap.domains.noPriorityChar": "Aucun perso prioritaire",
        "roadmap.domains.empty": "Aucun domaine prioritaire identifié pour la vitrine actuelle.",
        "roadmap.domains.optimalSet": "Set Optimal (Best in Slot)",

        // Module 5 : Conseiller de Synthèse Mystique
        "roadmap.strongbox.title": "Conseiller de Synthèse Mystique",
        "roadmap.strongbox.desc": "Recyclez vos pièces 5★ inutiles pour fabriquer ces sets clés sans gaspiller de résine dans des domaines non rentables.",
        "roadmap.strongbox.recommendedSets": "Sets prioritaires à synthétiser :",
        "roadmap.strongbox.why": "Pourquoi ce set ?",
        "roadmap.strongbox.targetChars": "Pour vos personnages :",
        "roadmap.strongbox.avoidDomainNote": (domainName) => `Évite de dépenser de la résine dans « ${domainName} ».`,
        "roadmap.strongbox.recommendedBadge": "Synthèse Recommandée",
        "roadmap.strongbox.dedicatedDomain": "Domaine dédié",
        "roadmap.strongbox.empty": "Vos personnages actuels utilisent principalement des sets récents non encore disponibles en synthèse mystique.",

        // Module 6 : Audit des Maillons Faibles
        "roadmap.worst.title": "Audit des « Maillons Faibles » du Compte",
        "roadmap.worst.desc": "Les pièces d'artéfacts les plus faibles de votre vitrine qui brident les performances de vos personnages.",
        "roadmap.worst.rank": "Rang",
        "roadmap.worst.owner": "Personnage",
        "roadmap.worst.piece": "Pièce & Stat",
        "roadmap.worst.score": "Score actuel",
        "roadmap.worst.cost": "Coût d'amélioration estimé",
        "roadmap.worst.tip": "Conseil clé",
        "roadmap.worst.offPieceBadge": "Hors-set",
        "roadmap.worst.empty": "Aucune pièce défaillante détectée sur vos personnages !",
        "roadmap.worst.tip.substats": "Substats faibles à améliorer",
        "roadmap.worst.tip.flowerPlume": "Fleur/Plume très facile à upgrader (0% RNG de stat principale)",
        "roadmap.worst.tip.badMainStat": "Stat principale inadaptée (impact majeur sur le perso)",
        "roadmap.worst.tip.weakOffPiece": "Pièce hors-set faible, facile à remplacer depuis votre stock",
        "roadmap.worst.resinEstimate": (resin, days) => `~${resin} résine (${days}j)`,

        // Module 7 : Conseiller d'Élixir Sanctifiant (Transmutateur de Natlan)
        "roadmap.elixir.title": "Conseiller d'Élixir Sanctifiant",
        "roadmap.elixir.desc": "Identifiez les crafts d'artéfacts les plus rentables (coût en élixirs vs gain espéré et rareté naturelle de drop en donjon).",
        "roadmap.elixir.budget.all": "Tous",
        "roadmap.elixir.budget.1": "1 Élixir (Fleur / Plume)",
        "roadmap.elixir.budget.2": "2 Élixirs (Sablier)",
        "roadmap.elixir.budget.3": "3 Élixirs (Casque)",
        "roadmap.elixir.budget.4": "4 Élixirs (Coupe)",
        "roadmap.elixir.costBadge": (cost) => `${cost}`,
        "roadmap.elixir.costLabel": (cost) => `Coût : ${cost} élixir${cost > 1 ? 's' : ''}`,
        "roadmap.elixir.guaranteed": "Garanti :",
        "roadmap.elixir.substats": "2 Substats choisies :",
        "roadmap.elixir.currentPiece": "Pièce actuelle :",
        "roadmap.elixir.expectedGain": (pts) => `Gain espéré : +${pts} pts`,
        "roadmap.elixir.upgradeChance": (pct) => `${pct}% de chance d'amélioration`,
        "roadmap.elixir.savedResin": (resin) => `~${resin} résines économisées`,
        "roadmap.elixir.verdict.exceptional": "ROI Exceptionnel",
        "roadmap.elixir.verdict.high": "Très Rentable",
        "roadmap.elixir.verdict.safe": "Amélioration Sûre",
        "roadmap.elixir.verdict.moderate": "Rentabilité Modérée",
        "roadmap.elixir.focusPriority": "Cible Prioritaire",
        "roadmap.elixir.empty": "Aucun craft d'artéfact recommandé pour ce filtre : vos pièces équipées sont déjà d'un niveau très élevé !",
    },


    // ══════════════════════════════════════════════════════
    //  ENGLISH
    // ══════════════════════════════════════════════════════
    en: {
        // ── Page Titles (Meta) ────────────────────────────────
        "page.title.default": "guoba.gg - Genshin Impact Simulator",
        "page.title.char": (char, player) => `${player}'s ${char} - guoba.gg`,
        "meta.description": "guoba.gg is a build analysis and statistics tool for Genshin Impact. Evaluate your artifacts, optimize your characters...",
        "meta.keywords": "Genshin Impact, build, simulator, artifacts, enka network, UID, stats",
        "meta.og.title.char": (char, player) => `${player}'s ${char} Build - guoba.gg`,
        "meta.og.description.char": (char) => `Check out the complete build analysis, artifact efficiency, and optimization tips for ${char}.`,
        "meta.locale": "en_US",

        // ── Stat labels ───────────────────────────────────
        "stat.hp": "HP",
        "stat.hp_": "HP %",
        "stat.atk": "ATK",
        "stat.atk_": "ATK %",
        "stat.def": "DEF",
        "stat.def_": "DEF %",
        "stat.eleMas": "Elemental Mastery",
        "stat.enerRech_": "Energy Recharge",
        "stat.critRate_": "Crit Rate",
        "stat.critDMG_": "Crit DMG",
        "stat.heal_": "Healing Bonus",
        "stat.pyro_dmg_": "Pyro DMG Bonus",
        "stat.hydro_dmg_": "Hydro DMG Bonus",
        "stat.cryo_dmg_": "Cryo DMG Bonus",
        "stat.electro_dmg_": "Electro DMG Bonus",
        "stat.anemo_dmg_": "Anemo DMG Bonus",
        "stat.geo_dmg_": "Geo DMG Bonus",
        "stat.dendro_dmg_": "Dendro DMG Bonus",
        "stat.physical_dmg_": "Physical DMG Bonus",

        // ── Artifact types ────────────────────────────────
        "artifact.EQUIP_BRACER": "Flower of Life",
        "artifact.EQUIP_NECKLACE": "Plume of Death",
        "artifact.EQUIP_SHOES": "Sands of Eon",
        "artifact.EQUIP_RING": "Goblet of Eonothem",
        "artifact.EQUIP_DRESS": "Circlet of Logos",

        // ── Elemental resonances ──────────────────────────
        "buff.category.resonance": "Resonance",
        "resonance.pyro": "Fervent Flames (Pyro)",
        "resonance.hydro": "Soothing Water (Hydro)",
        "resonance.dendro": "Sprawling Greenery (Dendro)",
        "resonance.electro": "High Voltage (Electro)",
        "resonance.cryo": "Shattering Ice (Cryo)",
        "resonance.geo": "Enduring Rock (Geo)",
        "resonance.anemo": "Impetuous Winds (Anemo)",

        "ui.setPieces": (n) => `${n}-piece`,
        // ── Sidebar & navigation ──────────────────────────
        "ui.version": (ver, gi) => `Ver. ${ver} - Astro Build (GI Ver. ${gi})`,
        "ui.search.placeholder": "Enter your UID...",
        "ui.search.loading": "Loading data…",
        "ui.search.error": "Loading error — please reload the page",
        "ui.col.name": "Name",
        "ui.col.score": "Score",
        "ui.col.portrait": "Showcase order",
        "ui.col.sortByName": "Sort by name",
        "ui.col.sortByScore": "Sort by score",

        // ── Toolbar & main menu ───────────────────────────
        "ui.noArchetype": "No archetype available",
        "ui.exportBtn": "Export image",
        "ui.helpBtn": "Tutorial",
        "ui.coffee": "Buy me a coffee",

        // ── Character sheet ───────────────────────────────
        "ui.char.level": (n) => `Lvl. ${n}`,
        "ui.char.baseStats": "Base Stats",
        "ui.char.combatStats": "Combat Stats",
        "ui.char.skills": "Talents",
        "ui.char.score": "Score",
        "ui.char.totalRolls": "Total Rolls",
        "ui.char.buffsTitle": "Active buffs",
        "ui.char.buffsHint": "Toggle to apply passives and buffs (scroll to see all).",
        "ui.buff.weapon": "(Weapon)",
        "ui.buff.set": "(Set)",
        "ui.char.character": "Character",
        "ui.char.weapon": "Weapon",
        "ui.char.artifacts": "Artifacts",
        "ui.char.base": "Base",
        "ui.char.ascension": "Ascension",
        "ui.buff.set2p": "2pc Bonus",
        "buff.category.Passifs": "Passives",
        "buff.category.Constellations": "Constellations",
        "buff.category.Résonance": "Resonance",
        "buff.category.teammate": "Team",
        "ui.statTooltip.unbuffed": "Unbuffed",
        "ui.statTooltip.activeBuffs": "Active buffs",
        "ui.statTooltip.buffedTotal": "Buffed total",
        "ui.statTooltip.baseStat": (stat) => `Base ${stat}`,
        "ui.statTooltip.bonusPct": (stat) => `${stat} Bonus`,
        "ui.statTooltip.bonusFlat": (stat) => `Flat ${stat} Bonus`,
        "ui.statTooltip.artifactSubstats": "Artifact substats",
        "ui.statTooltip.rollCount": (c) => `${c} roll${c > 1 ? 's' : ''}`,
        "ui.statTooltip.rollBreakdown": "Roll breakdown",

        // ── Artifacts ─────────────────────────────────────
        "ui.art.baseAtk": "Base ATK",
        "ui.art.score": "Score",

        // ── Global evaluation ─────────────────────────────
        "ui.eval.globalGrade": "Global Rating",
        "ui.eval.efficiency": "Efficiency",
        "ui.eval.score": "Score",
        "ui.eval.badges": "Badges & Titles",
        "ui.eval.noBadge": "No highlights detected...",

        // ── Home page ─────────────────────────────────────
        "home.title": "Recent Accounts",
        "home.subtitle": "Select a previously analyzed account to reload it instantly (up to 12 accounts at a time).",
        "home.empty": "No account loaded",
        "home.emptyHint": "Enter a Genshin Impact UID in the sidebar to start the analysis.",
        "home.pinAccount": "Pin this account",
        "home.unpinAccount": "Unpin account",
        "home.legal": "This site is an independent fan project and is in no way affiliated with, sponsored by, or endorsed by HoYoverse. <br>All game-related content and assets are the exclusive property of HoYoverse.",
        "home.enkaCredit": "This project relies on the API provided by <a href='https://enka.network' style='color: inherit; text-decoration: underline;'>Enka.Network</a>, whom we warmly thank for their invaluable contribution to the community.",
        "home.designCredit": "Character sheet design inspired by Fribbels HSR Optimizer.",
        "home.madeWithAstro": "Made with Astro",

        // ── Mobile ───────────────────────────────────────
        "mobile.title": "Mobile Version Not Available",
        "mobile.body": "This simulator's interface was designed exclusively for desktop to ensure the best experience and correctly display all statistics.",
        "mobile.wip": "A mobile version is currently in development.",
        "mobile.hint": "For now, please access it from a desktop computer.",

        // ── Errors & alerts ───────────────────────────────
        "error.noUid": "UID missing",
        "error.invalidUid": "The UID must be a 9 or 10 digit number.\nCheck your in-game ID (Paimon Menu > Profile).",
        "error.dataLoading": "Game data is still loading.\nWait a few seconds and try again.",
        "error.emptyShowcase": "This account's showcase is empty or private!\nPlease add characters and enable 'Show Character Details' in-game.",
        "error.timeout": "Request timed out (30s exceeded).\nEnka Network or the proxy may be overloaded. Try again shortly.",
        "error.notFound": "No account found for this UID (404).\nPlease verify the ID is correct.",
        "error.rateLimit": "Too many requests (429 — Rate Limit).\nWait a few seconds before trying again.",
        "error.serverDown": "Enka server or proxy is temporarily unavailable.\nTry again in a few minutes.",
        "error.generic": "Unable to retrieve data.\nCheck your connection or try again later.",
        "error.gameData": "Unable to load game data (GitHub or network unavailable).\nPlease reload the page.",
        "error.noBuild": "No build displayed!",
        "error.exportFail": "Error creating the image.",
        "error.invalidLink": "Invalid link or account not found.",
        "error.filesErr": "Files Error.",
        "error.loadingV2": "Loading V2 (Indexing)...",
        "error.pageNotFound": "Page not found.",

        // ── Export ────────────────────────────────────────
        "export.processing": "Processing...",

        // ── Analysis & Tips — Titles ──────────────────────
        "analysis.title": (nom) => `${nom} - Analysis & Tips`,
        "analysis.s1.title": "Overview",
        "analysis.s1.desc": "Evaluate the quality of your sub-stats and get a real picture of your current artifacts' potential.",
        "analysis.s1.buildEff": "Build Efficiency",
        "analysis.s1.rngFactor": "Luck Factor (RNG)",
        "analysis.s1.maxScore": "Max Potential Score",

        "analysis.s2.title": "Strategic analysis",
        "analysis.s2.desc": "Identify major imbalances in your build and make sure your off-set piece adds real value.",
        "analysis.s2.critAnalysis": "Crit Rate Analysis",
        "analysis.s2.rollDist": "Roll Distribution",
        "analysis.s2.usefulRolls": (n) => `${n} Useful`,
        "analysis.s2.deadRolls": (n) => `${n} Wasted`,
        "analysis.s2.usefulStats": "Useful Stats",
        "analysis.s2.deadStats": "Wasted Stats",
        "analysis.s2.noDeadStats": "None!",
        "analysis.s2.offPiece": "Off-Set Piece Analysis",
        "ui.art.offPiece": "Off-Set",
        "analysis.offPiece.replaceable": "Replaceable",
        "analysis.offPiece.offSet": "Off-Piece",
        "analysis.offPiece.setAvg": "Set Avg.",

        "analysis.s3.title": "Action plan",
        "analysis.s3.desc": "Your priority roadmap with urgent fixes to apply and artifacts to replace.",
        "analysis.s3.p1.title": "General tips",
        "analysis.s3.noSwap": "No beneficial swap detected",
        "analysis.s3.talentPriority": "Talent Priority",
        "analysis.s3.mainStatTitle": "Main Stat Issue",
        "analysis.s3.mainStatOk": "Main Stats",
        "analysis.s3.top3": "Top 3 artifacts to replace, by priority",
        "analysis.top3.tooltip.dropRate": (rate) => `Drop rate probability for this main stat: ${rate}%`,
        "analysis.top3.tooltip.fixed": "Fixed or guaranteed main stat",
        "analysis.top3.tooltip.resin": "Estimate based on a natural regeneration of 180 Resin per day.",
        "analysis.top3.thisPiece": "This piece",
        "analysis.top3.globalAvg": "Global Avg.",
        "analysis.s3.noPriority": "Nothing to report, excellent work.",
        "analysis.s3.resinEst": (resin, days) => `~${resin} Resin (${days} days)`,
        "analysis.s3.mainStatDetail": (piece, better, current) =>
            `On <b style="color: #aaa;">${piece}</b>, aim for <span style="color:var(--accent-gold); font-weight:bold;">${better}</span> (Currently: <span style="color:var(--accent-gold);">${current}</span>).`,
        "analysis.s3.p2.title": "What to look for",
        "analysis.s3.p3.title": "Beneficial swap",
        "analysis.s3.swap.desc": "This system detects artifacts equipped on your other characters that enhance the one you are currently viewing. While this exchange will maximize the potential of your current character, it will inevitably reduce the stats of the character whose artifact is borrowed!",
        "analysis.s3.lvl.1": "Lvl. 1",
        "analysis.s3.lvl.max": (n) => `Lvl. ${n}`,
        "analysis.s3.lvl.current": (n) => `Currently : Lvl. ${n}`,

        "analysis.s4.title": "Ideal projection",
        "analysis.s4.desc": "See your artifacts at their best: dead stats replaced with optimal ones, and rolls pushed to their maximum.",
        "analysis.s4.replace": (dead, target) => `Replace ${dead} with ${target}:`,
        "analysis.s4.optimal": "Already optimal",
        "analysis.s4.totalGains": "Potential gains summary",

        "analysis.s5.title": "Roll details",
        "analysis.s5.desc": "Read directly from the game's source code and discover the exact quality of each stat roll.",
        "analysis.s5.unavailable": (stars) => `${stars}★ Artifact — Analysis unavailable`,
        "analysis.s5.rollWeak": "Low roll",
        "analysis.s5.rollMed": "Mid roll",
        "analysis.s5.rollStrong": "High roll",
        "analysis.s5.rollPerfect": "Perfect roll",
        "analysis.s5a.title": "Dead stat replacement",
        "analysis.s5a.desc": "Each wasted stat is converted into the most valuable available useful stat, with the same number of rolls.",
        "analysis.s5b.title": "Maximum potential rolls",
        "analysis.s5b.desc": "Same roll distribution as your current artifacts, but every individual roll replaced with its highest possible value.",
        "analysis.s5b.unavailable": (stars) => `${stars}★ Artifact — Analysis unavailable`,

        "analysis.s6.title": "Reroll simulator",
        "analysis.s6.desc": "Evaluate whether redistributing your artifact's stat values toward better ones is worth it.",
        "analysis.s6.gainPotential": "Gain potential",
        "analysis.s6.lossRisk": "Loss risk",

        // ── Advice messages ───────────────────────────────
        "advice.crit.noCrit": "This character does not rely on crit stats.",
        "advice.crit.overcap": (cr) => `Excess Crit Rate (${cr}%). The surplus was deducted from your overall score.`,
        "advice.crit.perfect100": "Perfect Crit Rate. Go all-in on Crit DMG.",
        "advice.crit.highCDLowCR": (cr, cd) => `Excellent Crit Rate (${cr}%), but your Crit DMG (${cd}%) is too low. Rebalance!`,
        "advice.crit.above90": "Crit Rate is more than sufficient (above 90%). Prioritize Crit DMG.",
        "advice.crit.above80": "Crit Rate is sufficient (above 80%). More is useful, but Crit DMG becomes the priority.",
        "advice.crit.highCDLowCR2": (cd, cr) => `You have a lot of Crit DMG (${cd}%) but your Crit Rate (${cr}%) is too low to take advantage of it!`,
        "advice.crit.above70": "Crit Rate is passable (above 70%). Try to get closer to 80%.",
        "advice.crit.above60": "Crit Rate is insufficient (above 60%). Your heavy hits will miss crits too often.",
        "advice.crit.below60": "Crit Rate is severely insufficient (below 60%). Fix this urgently before looking for other stats.",

        "advice.set.best": "You are using the best recommended set!",
        "advice.set.good": (name) => `Your set is fine, but <b>${name} (4p)</b> would be optimal.`,
        "advice.set.bad": (name) => `Non-optimal set. Aim for <b>${name} (4p)</b> to maximize damage.`,

        "advice.mainStat.title.ok": "Main Stats",
        "advice.mainStat.ok": "Your sands, goblet, and circlet all have optimal main stats.",
        "advice.mainStat.title.problem": "Main Stat Issue",
        "advice.mainStat.empty": "No artifacts equipped.",

        "advice.offPiece.empty": "No artifacts equipped.",
        "advice.offPiece.incomplete": "Fully equip your character to evaluate the relevance of their off-set piece.",
        "advice.offPiece.rainbow": "Equip your character with a 4p or 2p/2p set to get advice on your off-set piece.",
        "advice.offPiece.5of5": (setName, piece, score) =>
            `You are using 5 pieces from the <b>${setName}</b> set. Your <b style="color: #aaa;">${piece}</b> is statistically the weakest (Score: ${score}), you should replace it with a better off-set piece.`,
        "advice.offPiece.good": (piece) => `Excellent off-set piece <b style="color: #aaa;">(${piece})</b>. It is lifting your build up.`,
        "advice.offPiece.ok": (piece) => `Your off-set piece <b style="color: #aaa;">(${piece})</b> is acceptable for now given its main stat's rarity.`,
        "advice.offPiece.bad": (piece) => `Your off-set piece <b style="color: #aaa;">(${piece})</b> could be a lot better. Look for a better one in your inventory or let a different piece be off-set.`,

        "advice.talent.title": "Talents",
        "advice.talent.ok": "Your talents are at the recommended level.",
        "advice.talent.critical": (str) => `Upgrading ${str} is important for this character.`,
        "advice.talent.info": (str) => `Upgrading ${str} is recommended for this character.`,
        "advice.talent.item": (label, lvl) => `your <b style="color: #aaa;">${label}</b> to level ${lvl}`,
        "advice.talent.auto": "Normal Attack",
        "advice.talent.skill": "Elemental Skill",
        "advice.talent.burst": "Elemental Burst",
        "talents.auto": "Normal Attack",
        "talents.skill": "Elemental Skill",
        "talents.burst": "Elemental Burst",

        "advice.setForce.title.ok": "No set forcing",
        "advice.setForce.title.warning": "Set forcing detected",
        "advice.setForce.ok2p2p": "Optimal 2-piece / 2-piece artifact set of good quality.",
        "advice.setForce.okRainbow": "You are running a rainbow build.",
        "advice.setForce.okQuality": "Optimal artifact set of good quality.",
        "advice.setForce.weak": "You are forcing a 4-piece artifact set with weak artifacts. You should try an alternative.",
        "advice.setForce.weakHint2p": "This character works very well with a 2p/2p set; don't hesitate to break your current set for better stats.",
        "advice.setForce.okQualityOffMeta": "Your artifacts are of good quality, but this 4-piece set is not recommended for this character.",
        "advice.setForce.empty": "No artifacts equipped.",
        "advice.setForce.incomplete": "Fully equip your character to evaluate the relevance of your set bonuses.",

        "advice.metaSet.title.ok": "Artifact set choice",
        "advice.metaSet.title.optimize": "Artifact set optimization",
        "advice.metaSet.title.problem": "Artifact set issue",
        "advice.metaSet.ok": "You are using one of the best recommended artifact sets for this character.",
        "advice.metaSet.good": (rec) => `Your current set is fine, but to maximize the build the recommended artifact set is: ${rec}.`,
        "advice.metaSet.bad": (rec) => `Your current artifact set does not match the character's standards. You should switch to ${rec}.`,

        "advice.weapon.title": "Weapon Level",
        "advice.weapon.none": "No weapon equipped.",
        "advice.weapon.low": "Upgrade your weapon to level 90 to maximize its base ATK and sub-stat.",
        "advice.weapon.ok": "Your weapon is at maximum level.",

        // getRNGAdvice / RollEfficiency
        "advice.rng.title": "Roll Quality",
        "advice.rng.low": (pct) => `Average roll efficiency is low (${pct}%). You are losing potential stats.`,
        "advice.rng.medium": (pct) => `Average roll efficiency is decent (${pct}%).`,
        "advice.rng.good": (pct) => `Average roll efficiency is good (${pct}%).`,
        "advice.rng.high": (pct) => `Average roll efficiency is excellent (${pct}%). Very low value loss.`,
        "advice.rng.efficiency": "Roll Efficiency",

        "advice.er.title.ok": "Energy Recharge",
        "advice.er.title.low": "Insufficient Energy Recharge",
        "advice.er.title.excess": "Excess Energy Recharge",
        "advice.er.ok": (cur, tgt) => `Your ER (${cur}%) is ideal for this archetype (Target: ${tgt}%).`,
        "advice.er.low": (cur, tgt) => `You have ${cur}% ER, but this archetype needs around <b>${tgt}%</b>. Your rotations may get stuck.`,
        "advice.er.excess": (cur, tgt) => `You have ${cur}% ER, which is well above what's needed (${tgt}%). Try trading ER for other stats.`,
        "advice.er.target": "Target:",

        "advice.level.title": "Character Level",
        "advice.level.low": "Upgrade your character to level 90 to maximize their stats.",
        "advice.level.ok": "Your character is at level 90.",
        "advice.level.ascended": "Level 95 reached thanks to a Masterless Stella Fortuna. You've gone past the standard 90 cap!",
        "advice.level.legendary": "Level 100 reached using 3 Masterless Stella Fortuna. Congratulations!",

        "farm.easy": "Easy",
        "farm.medium": "Relatively easy",
        "farm.hard": "Relatively difficult",
        "farm.veryHard": "Difficult",
        "farm.extreme": "Very difficult",

        "reroll.na.stars": (stars) => `${stars}★ Artifact — Not applicable`,
        "reroll.na.level": (lvl) => `Level ${lvl}/20 — Upgrade the artifact before analyzing`,
        "reroll.neutral": "Neutral",
        "reroll.trash": "Trash (Do not reroll)",
        "reroll.tooRisky": "Too risky (Keep)",
        "reroll.recommended": "Reroll Recommended",
        "reroll.optimizable": "Optimizable",
        "reroll.notWorth": "Not worth it",

        // simulateDeadStatReplacements
        "sim.title": "Dead Substat Replacements",
        "sim.replace": (dead, target) => `Replace ${dead} with ${target}:`,
        "sim.range": "to",
        "ui.and": " and ",

        // ── Onboarding ────────────────────────────────────
        "ob.step": (cur, tot) => `Step ${cur} / ${tot}`,
        "ob.prev": "Previous",
        "ob.next": "Next",
        "ob.finish": "Let's go!",
        "ob.close": "Close tutorial",
        "ob.screenshot": "Screenshot coming soon",

        "ob.s1.title": "Prepare your showcase",
        "ob.s2.title": "Score & Grade: two readings",
        "ob.s3.title": "Read your build at a glance",
        "ob.s4.title": "Check your Active Buffs",
        "ob.s5.title": "The Analysis & Tips section",

        // ── Badges ────────────────────────────────────────
        "badge.masterEndgame.name": "Endgame Master",
        "badge.masterEndgame.desc": "Conquered the Spiral Abyss, Imaginarium Theater, and Stygian Onslaught. Absolute respect.",
        "badge.abyssArchon.name": "Abyss Archon",
        "badge.abyssArchon.desc": "Obtained 36 stars in the Spiral Abyss.",
        "badge.theaterStar.name": "Theater Star",
        "badge.theaterStar.desc": "Shone in the Imaginarium Theater.",
        "badge.carnageKing.name": "Onslaught King",
        "badge.carnageKing.desc": "Defeated the worst horrors of the Stygian Onslaught.",
        "badge.legend.name": "Living Legend",
        "badge.legend.desc": "Stygian Onslaught Difficulty 6 cleared in under 180s. You've officially 'beaten' the game.",
        "badge.carnagePlague.name": "Onslaught Scourge",
        "badge.carnagePlague.desc": "Stygian Onslaught Difficulty 6 cleared. The monsters fear you.",
        "badge.veteran.name": "Seasoned Veteran",
        "badge.veteran.desc": "Adventure Rank 60 reached. Time to touch some grass.",
        "badge.perfection.name": "Unattainable Perfection",
        "badge.perfection.desc": "Over 95% average efficiency. Your artifacts have no flaws.",
        "badge.oneTrick.name": (nom) => `${nom} One Trick`,
        "badge.oneTrick.desc": (nom) => `Your entire showcase is dedicated to ${nom}.`,
        "badge.hiddenCollection.name": "Hidden Collection",
        "badge.hiddenCollection.desc": "Fewer than 12 characters showcased. You keep your secrets.",
        "badge.whale.name": "Whale",
        "badge.whale.desc": "One 5-star character at C6 detected.",
        "badge.narval.name": "Narwal",
        "badge.narval.desc": "Multiple 5-star C6 characters detected. Are you a HoyoVerse shareholder ?",
        "badge.lucky.name": "Touched by Grace",
        "badge.lucky.desc": (rng) => `Exceptional average RNG (${rng}%). The game loves you.`,
        "badge.cursed.name": "RNG Cursed",
        "badge.cursed.desc": (rng) => `Catastrophic average RNG (${rng}%).`,
        "badge.divine.name": "Divine Gathering",
        "badge.divine.desc": "Your showcase has at least 4 Archons. Mount Olympus is envious.",
        "badge.tripleCrown.name": "Triple Crown",
        "badge.tripleCrown.desc": "You invested 3 crowns on the same character. Royal devotion.",
        "badge.leviathan.name": "Leviathan",
        "badge.leviathan.desc": "5★ C6 character with 5★ R5 weapon detected. Thanks for funding the game!",
        "badge.allInCrit.name": "All-in Crit",
        "badge.allInCrit.desc": "Over 300% Crit DMG detected. If it crits, it obliterates.",
        "badge.surgical.name": "Surgical Precision",
        "badge.surgical.desc": "100% Crit Rate achieved. You leave nothing to chance.",
        "badge.powerPlant.name": "Power Plant",
        "badge.powerPlant.desc": "At least one character exceeds 200% ER. Infinite burst!",
        "badge.asthmatic.name": "Asthmatic",
        "badge.asthmatic.desc": "Exactly 100% ER on a character. You're chasing particles.",
        "badge.alchemist.name": "Alchemist",
        "badge.alchemist.desc": "Over 1000 Elemental Mastery detected. Reactions are your religion.",
        "badge.casino.name": "Casino Impact",
        "badge.casino.desc": "Extreme crit ratio on a DPS (<40% CR / >200% CD).",
        "badge.hpTank.name": "Unkillable",
        "badge.hpTank.desc": "At least one character exceeds 60,000 HP!",
        "badge.impostor.name": "Impostor",
        "badge.impostor.desc": "One of your artifact pieces has a completely wrong main stat.",
        "badge.qiqiCurse.name": "Perma Curse",
        "badge.qiqiCurse.desc": "C6 standard 5-star detected. We feel the pain of those lost 50/50s.",
        "badge.nudist.name": "On Strike",
        "badge.nudist.desc": "This high-level character refuses to work until it gets artifacts.",
        "badge.intern.name": "The Intern",
        "badge.intern.desc": "This low-level character got lost in your showcase.",
        "badge.aloy.name": "Time Traveler",
        "badge.aloy.desc": "Aloy detected. You are one of 12 remaining players who remember her.",
        "badge.tiersMonde.name": "Budget Build",
        "badge.tiersMonde.desc": "A level 90 character with a 3★ weapon. It's dumb but it works...",
        "badge.akasha.name": "Akashamaxxing",
        "badge.akasha.desc": "You stacked crit stats on a character that doesn't need them. All for the Top 1%, nothing for the team.",
        "badge.holyGrail.name": "The Holy Grail",
        "badge.holyGrail.desc": "Owns an artifact exceeding 50 Crit Value (CV). A true divine relic.",
        "badge.89.name": "89 Enjoyer",
        "badge.89.desc": "Saving Hero's Wits until the very end!",
        "badge.emblemFan.name": "Emblem Addict",
        "badge.emblemFan.desc": "You spend too much time in the Momiji domain.",
        "badge.favSect.name": "Favonius Cult",
        "badge.favSect.desc": "Half the team has a Favonius weapon. Hello white particles!",
        "badge.rainbow.name": "Rainbow Artist",
        "badge.rainbow.desc": "A good chunk of your showcase has no 4-piece bonus!",
        "badge.pacifist.name": "Pacifist",
        "badge.pacifist.desc": "A high-level character with useful talents that aren't leveled.",
        "badge.f2p.name": "F2P By The Way",
        "badge.f2p.desc": "Most of your showcase consists of 4-star characters.",
        "badge.champLeague.name": "Champions League",
        "badge.champLeague.desc": "No 4-stars. Only the elite gets to appear on your profile.",
        "badge.bondUnbreakable.name": "Unbreakable Bond",
        "badge.bondUnbreakable.desc": "Friendship level 10 across the entire showcase. You truly love your characters.",
        "badge.monopoly.name": (elem) => `${elem} Monopoly`,
        "badge.monopoly.desc": "100% mono-element showcase. Other elements don't exist for you.",
        "badge.supremacy.name": (elem) => `${elem} Supremacy`,
        "badge.supremacy.desc": "Most of your showcase shares this element.",
        "badge.archivist.name": "Scholar of Irminsul",
        "badge.archivist.desc": "Over 1700 achievements unlocked. Teyvat holds absolutely no secrets for you anymore.",
        "badge.fatui.name": "Fatui Harbinger",
        "badge.fatui.desc": "Your showcase gathers at least three Harbingers. A true Snezhnayan family reunion.",
        "badge.hospital.name": "Teyvat Hospital",
        "badge.hospital.desc": "Your showcase is a literal clinic. You categorically refuse to let your characters lose a single HP.",
        "badge.tourist.name": "Tourist",
        "badge.tourist.desc": "High Adventure Rank, but fewer than 1000 achievements. Do you even play the game?",
        "badge.celestia.name": "Chosen of Celestia",
        "badge.celestia.desc": "Absolutely all rolls on a character landed on useful stats. You have defeated mathematics.",
        "badge.offensiveAnomaly.name": "Offensive Anomaly",
        "badge.offensiveAnomaly.desc": "0 Elemental Mastery, 100% Energy Recharge, with 5 +20 artifacts on a character. Pure brutality.",
        "badge.og.name": "OG",
        "badge.og.desc": "Your UID indicates you've been here since the very first days of the game. A true Day 1 veteran.",
        "badge.starter.name": "Starter Pack",
        "badge.starter.desc": "Amber, Kaeya, and Lisa gathered in your showcase. Unwavering loyalty to the roots of adventure.",
        "badge.plombier.name": "Dramatic Plumbing",
        "badge.plombier.desc": "Furina equipped with the 'Fleuve Cendre Ferryman'. A... bold accessory choice for an idol.",
        "badge.sandrone.name": "Creator's Seal",
        "badge.sandrone.desc": "You have Sandrone in your showcase. The site creator officially approves of your excellent taste.",
        "badge.creator.name": "The Creator",
        "badge.creator.desc": "The mastermind behind this site. Hello it's me!",
        "badge.contributor.name": "Contributor",
        "badge.contributor.desc": "Helped forge this tool. The community thanks you!",
        "badge.bestie.name": "Bestie!",
        "badge.bestie.desc": "VIP friend of the creator. A highly privileged status.",
        "badge.raidenCatch.name": "Fishing for Eternity",
        "badge.raidenCatch.desc": "The Almighty Shogun fights with a pitchfork. Eternity can wait, there are fishes to catch.",
        "badge.zhongliTassel.name": "Broke Archon",
        "badge.zhongliTassel.desc": "The creator of Mora is so broke he uses a 3-star slime-killing polearm.",
        "badge.hearth.name": "House of the Hearth",
        "badge.hearth.desc": "Father and her children are reunited. The House of the Hearth never leaves its own behind.",
        "badge.kamisato.name": "Yashiro Commission",
        "badge.kamisato.desc": "The illustrious Kamisato Clan in full force. Elegance, duty, and someone to sweep the floors.",
        "badge.arataki.name": "Arataki Gang",
        "badge.arataki.desc": "The glorious Arataki Gang is in the house! Good thing Shinobu is here to manage the budget.",
        "badge.adepti.name": "Liyue Adepti",
        "badge.adepti.desc": "The illuminated beasts watch over your showcase. Liyue's legacy is in good hands.",
        "badge.sumeru.name": "Sumeru Friends",
        "badge.sumeru.desc": "The Akademiya quartet is reunited. Get ready for rent disputes and terrible jokes.",
        "badge.mermonia.name": "Palais Mermonia",
        "badge.mermonia.desc": "The Court of Fontaine is in session. Justice will be served with the utmost theatricality.",
        "badge.stellaFortuna.name": "Stella Fortuna",
        "badge.stellaFortuna.desc": "Spent 3 Masterless Stella Fortuna on one character to push it to level 100. Luck (or your wallet) favors the bold.",

        // ── Accessibility (Alt Tags) ──────────────────────
        "ui.alt.achievements": "Achievements",
        "ui.alt.theater": "Imaginarium Theater",
        "ui.alt.abyss": "Spiral Abyss",
        "ui.alt.stygian": "Stygian Onslaught",
        "ui.alt.kofi": "Ko-fi icon",
        "ui.alt.weapon": "Weapon",

        // ── getText fallbacks ─────────────────────────────
        "data.unknown": "Unknown",
        "data.loading": "Loading...",
        "data.unknownPlayer": "Unknown Player",
        "data.traveler": "Traveler",

        // ── Themes ────────────────────────────────────────
        "theme.dark": "Dark Classic",
        "theme.abyssal": "Abyssal Void",
        "theme.sea": "Primordial Sea",
        "theme.wish": "Night Wish",
        "theme.guild": "Adventurer's Guild",

        "wtl.or": "or",
        "wtl.anyChoice": "Any",
        "wtl.chooseAmong": (n) => `${n} of the following:`,
        "wtl.offSetPiece": "Off-Set Piece",
        "wtl.anySet": "Any set",
        "analysis.s3.noSwapOn": (piece) => `No beneficial<br>swap detected<br>for ${piece}`,

        // ── Static menu ───────────────────────────────────
        "nav.home": "Home",
        "nav.about": "About",
        "nav.team": "Team",
        "nav.privacy": "Privacy",

        // ── Static pages ──────────────────────────────────
        "page.about.title": "guoba.gg",
        "page.about.lead": "An independent Genshin Impact build optimizer, designed by players, for players.",
        "page.about.q1.title": "What is guoba.gg?",
        "page.about.q1.p1": "<strong>guoba.gg</strong> reinvents optimization in Genshin Impact. Much more than a simple calculator, it's a true <strong>virtual coach</strong>: by entering your UID, the tool evaluates the pure mathematical quality of your equipment via a dual score and grade system, simulates your real combat stats under buffs, and guides you step-by-step to perfect your character.",
        "page.about.q1.p2": "The project was born from a simple frustration: the need for a precise, immersive, and proactive tool to guide farming choices without having to open a spreadsheet.",
        "page.about.q2.title": "How does it work?",
        "page.about.q2.c1.title": "Data Retrieval",
        "page.about.q2.c1.desc": "Your data is read via the public <a href=\"https://enka.network\" target=\"_blank\" rel=\"noopener\">Enka.Network</a> API using your UID. No account, no password, and your data stays local.",
        "page.about.q2.c2.title": "Calculation",
        "page.about.q2.c2.desc": "Each artifact is evaluated using the game's official roll tables, weighted by your character's needs and adjusted for set bonuses.",
        "page.about.q2.c3.title": "Visual Coaching",
        "page.about.q2.c3.desc": "Results are displayed in immersive sheets with grades, charts, and immediate action recommendations.",
        "page.about.q2.c4.title": "Share & Export",
        "page.about.q2.c4.desc": "Generate a visual summary of your character in one click, or directly share your profile link with the community.",
        "page.about.q3.title": "What guoba.gg is not",
        "page.about.q3.l1": "It is <strong>not</strong> an official HoYoverse tool.",
        "page.about.q3.l2": "It is <strong>not</strong> a damage simulator or a speedrun leaderboard.",
        "page.about.q3.l3": "It is <strong>not</strong> a tier list database.",
        "page.about.q3.note": "The tool focuses on the <strong>quality of your investment</strong>: are your artifacts mathematically excellent, is your build well-balanced in-game, and what should you farm as an absolute priority?",
        "page.about.q4.title": "Open source & contributions",
        "page.about.q4.desc": "The project is open to community feedback. If you spot an error in a character's weights, a miscalculated stat, or want to suggest an improvement, join the Discord.",

        "page.team.title": "The Team",
        "page.team.lead": "The AMAZING people behind this project!",
        "page.team.clem.role": "Founder & Developer",
        "page.team.clem.bio": "Creator of the project. Front-end development, UX/UI, architecture, scoring system, and general maintenance.",
        "page.team.blu.role": "UI Artist & Advisor",
        "page.team.blu.bio": "General advisor and first tester. Strategic support, UX/UI feedback and creator of many icons for the interface.",
        "page.team.copyUid": "Copy UID",
        "page.team.thanks.title": "Special Thanks",
        "page.team.thanks.lead": "This project wouldn't exist without:",
        "page.team.thanks.l1": "<a href=\"https://enka.network\" target=\"_blank\" rel=\"noopener\">Enka.Network</a> — Player data API",
        "page.team.thanks.l2": "The Discord community who tests, reports bugs, and suggests improvements",
        "page.team.thanks.l3": "Fribbels, for the character sheet design inspiration",

        "page.privacy.title": "Privacy Policy",
        "page.privacy.lead": "Transparency about the data guoba.gg collects — or rather, doesn't collect.",
        "page.privacy.q1.title": "What we do not collect",
        "page.privacy.q1.p1": "guoba.gg has <strong>no user accounts</strong>, requires no registration, no email, no password.",
        "page.privacy.q1.p2": "We do not have access to your HoYoverse account. Your UID is public information natively exposed by the game.",
        "page.privacy.q2.title": "Local Data (your browser)",
        "page.privacy.q2.p1": "The application only stores in your <code>localStorage</code>:",
        "page.privacy.q2.l1": "<strong>Recently viewed UIDs</strong> and associated metadata (nickname, avatar, profile stats) to display on the home page.",
        "page.privacy.q2.l2": "Your <strong>interface preferences</strong>: visual theme, language, pinned account.",
        "page.privacy.q2.note": "This data never leaves your device. It is neither transmitted, sold, nor analyzed by us. You can delete it at any time via your browser settings.",
        "page.privacy.q3.title": "Third-Party API — Enka.Network",
        "page.privacy.q3.p1": "When you enter a UID, a request is sent to our proxy (<code>guobagg.clement-torchiat.workers.dev</code>), which relays it to <a href=\"https://enka.network\" target=\"_blank\" rel=\"noopener\">Enka.Network</a>. The returned data is what the game exposes publicly: showcased characters, equipped artifacts and weapons, profile stats.",
        "page.privacy.q3.p2": "Check the <a href=\"https://enka.network/privacy-policy/\" target=\"_blank\" rel=\"noopener\">Enka.Network privacy policy</a> for details on their data handling.",
        "page.privacy.q4.title": "Disclaimer and Affiliation",
        "page.privacy.q4.p1": "guoba.gg is an independent third-party project created by the community. This site is in no way affiliated with, sponsored by, endorsed by, or associated with <strong>HoYoverse</strong> or <strong>Cognosphere PTE. LTD.</strong>",
        "page.privacy.q4.p2": "<em>Genshin Impact</em>, along with all graphical elements, game models, character names, and visual assets used on this domain, remain the exclusive intellectual property of HoYoverse. Their use falls under non-commercial fair use intended for player information and assistance.",
        "page.privacy.q5.title": "Cookies & Trackers",
        "page.privacy.q5.p1": "guoba.gg uses <strong>no tracking cookies</strong>, no ad networks, no behavioral analysis tools (Google Analytics, etc.).",
        "page.privacy.q6.title": "Contact",
        "page.privacy.q6.p1": "For any privacy-related questions, join the Discord and reach out to clem.",
        "page.privacy.date": "Last updated: June 2026",

        "ob.steps": [
            {
                title: "Prepare your showcase",
                html: `
        <p>Welcome to <strong>guoba.gg</strong>!</p>
        <p class="ob-note-blue">guoba.gg is a build analysis tool for Genshin Impact. It evaluates the quality of your artifacts, rates your characters, and helps you prioritize your farming — all automatically, from your in-game showcase.</p>
        <p>The site fetches your data via <strong>Enka.Network</strong>. Here's how to prepare your account in-game:</p>
        <ul>
            <li>Paimon Menu → <strong>Edit Profile</strong></li>
            <li>Enable <strong>"Show Character Details"</strong></li>
            <li>Place your characters in your <strong>Showcase</strong></li>
            <li>Wait ~5 min after logging out</li>
        </ul>
        <p>Then, enter your <strong>UID</strong> in the search bar on the left — and you're good to go!</p>`,
                image: "assets/onboarding/step1.gif",
                placeholder: false
            },
            {
                title: "Score & Grade: two readings",
                html: `
        <p>Each build is evaluated with <strong>two complementary metrics</strong>:</p>
        <div class="ob-metric">
            <div class="ob-metric-icon">🎯</div>
            <div class="ob-metric-body">
                <strong>The Score — your actual power</strong>
                <span>Takes into account sub-stats, main stat, and set — weighted by each stat's usefulness for <em>this specific character</em>.</span>
            </div>
        </div>
        <div class="ob-metric">
            <div class="ob-metric-icon">🎲</div>
            <div class="ob-metric-body">
                <strong>The Grade (F → ARCHON) — your RNG luck</strong>
                <span>Measures how many of your upgrades landed on good stats, and at what value.</span>
            </div>
        </div>
        <div class="ob-note-blue">💡 High Grade but average Score? You got lucky, but the pieces aren't optimal. The opposite? Good build, rough RNG. Both together? That's the Holy Grail.</div>`,
                image: "assets/onboarding/step2.png",
                placeholder: false
            },
            {
                title: "Read your build at a glance",
                html: `
        <p>Once your UID is loaded, your characters appear in the <strong>list on the left</strong>. Click on one to display their full build.</p>
        <ul>
            <li>Each artifact shows its <strong>individual grade</strong> and highlights sub-stats by weight</li>
            <li>The side list lets you <strong>compare your characters</strong>.</li>
            <li>The <strong>Export image</strong> button generates a visual summary to share with friends!</li>
        </ul>`,
                image: "assets/onboarding/step3.png",
                placeholder: false
            },
            {
                title: "Check your Active Buffs",
                html: `
        <p>Before heading to the <strong>tips</strong> section, check the <strong>Active Buffs</strong> card in the bottom right of the character sheet.</p>
        <p>Some characters benefit from situational buffs — constellations, team resonance, conditional passives — which can significantly affect the tips and combat stats shown.</p>
        <div class="ob-note-blue">⚠️ Your score can be affected by a Crit Rate overcap. This penalty will persist even if you disable the buffs related to Crit Rate.</div>`,
                image: "assets/onboarding/step4.png",
                placeholder: false
            },
            {
                title: "The Analysis & Tips section",
                html: `
        <p>Accessible from each character's sheet, this section is broken down into <strong>6 parts</strong>:</p>
        <div class="ob-grid-2x2">
            <div class="ob-grid-card">
                <span class="ob-gc-icon">📊</span>
                <span class="ob-gc-title">1. Overview</span>
                <span class="ob-gc-desc">Build efficiency, RNG luck factor, and maximum potential score.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">🔍</span>
                <span class="ob-gc-title">2. Strategic Analysis</span>
                <span class="ob-gc-desc">Crit rate, energy recharge, useful/wasted rolls, and off-set piece.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">🗺️</span>
                <span class="ob-gc-title">3. Action Plan</span>
                <span class="ob-gc-desc">Roadmap: character swaps, level, weapon, talents, and main stat.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">✨</span>
                <span class="ob-gc-title">4. Ideal Projection</span>
                <span class="ob-gc-desc">Simulate what your artifacts would look like if wasted stats became optimal ones.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">🎲</span>
                <span class="ob-gc-title">5. Roll Details</span>
                <span class="ob-gc-desc">The exact quality of each roll per artifact, read directly from the game's source code.</span>
            </div>
            <div class="ob-grid-card">
                <span class="ob-gc-icon">♻️</span>
                <span class="ob-gc-title">6. Reroll Simulator</span>
                <span class="ob-gc-desc">Estimate whether converting a piece via Mystic Offering is actually worth the risk.</span>
            </div>
        </div>`,
                image: "assets/onboarding/step5.png",
                placeholder: false
            }
        ],

        // ── Account Roadmap ───────────────────────────────
        "roadmap.button.title": "Account Roadmap",
        "roadmap.button.subtitle": "Global Optimization",
        "roadmap.button.badge": (n) => `${n} actions`,
        "roadmap.page.title": "Strategic Account Roadmap",
        "roadmap.page.subtitle": (count) => `Comprehensive analysis and optimization roadmap for all ${count} showcase characters.`,
        "roadmap.nav.back": "Back to Showcase",
        "roadmap.focus.label": "Showcase Priority:",
        "roadmap.focus.all": "All",
        "roadmap.focus.targetBadge": (char) => `Target: ${char}`,
        "roadmap.focus.domainPriority": "Priority Domain",
        "roadmap.focus.strongboxPriority": "Priority Strongbox",
        "roadmap.toggleAllChars.label": "All game characters",
        "roadmap.toggleAllChars.active": "Showcase only",
        "roadmap.outsideShowcase": "Outside showcase",
        "roadmap.noCharacters": "No characters loaded. Enter your UID to view the Roadmap.",

        // Module 1 : Maturity Barometer
        "roadmap.maturity.title": "Global Maturity Barometer",
        "roadmap.maturity.desc": "High-level summary of your showcase characters' build completeness and progression.",
        "roadmap.maturity.weapons": "Weapons Lvl.",
        "roadmap.maturity.characters": "Characters Lvl.",
        "roadmap.maturity.talents": "Talents",
        "roadmap.maturity.mainstats": "Main Stats",
        "roadmap.maturity.sets": "Artifact Sets",
        "roadmap.maturity.avgScore": "Showcase Average Score",
        "roadmap.maturity.globalIndex": "Global Maturity",

        // Module 2 : 5-Barometer Detailed Breakdown
        "roadmap.breakdown.title": "5-Barometer Optimization Plan",
        "roadmap.breakdown.desc": "Detailed breakdown of concrete upgrades needed across your characters to reach 100% on each indicator.",
        "roadmap.breakdown.weapons": "Weapons to Level 90",
        "roadmap.breakdown.weapons.ok": "All equipped weapons are at max level.",
        "roadmap.breakdown.levels": "Character Levels",
        "roadmap.breakdown.levels.ok": "All characters are at the recommended level.",
        "roadmap.breakdown.talents": "Priority Talents to Upgrade",
        "roadmap.breakdown.talents.ok": "All priority talents are at the recommended level.",
        "roadmap.breakdown.mainstats": "Main Stats to Correct",
        "roadmap.breakdown.mainstats.ok": "All artifact main stats are optimal.",
        "roadmap.breakdown.sets": "Artifact Sets to Complete",
        "roadmap.breakdown.sets.ok": "All characters are equipped with recommended sets.",
        "roadmap.breakdown.optimal": "Optimal",
        "roadmap.breakdown.toDo": (n) => `${n} to do`,
        "roadmap.breakdown.moreItems": (n) => `+ ${n} more`,
        "roadmap.breakdown.noSetBonus": "No bonus",
        "roadmap.breakdown.setBonus2p": (n) => `${n} 2pc bonus`,
        "roadmap.breakdown.reason.base": "Base stats & ascension",
        "roadmap.breakdown.reason.hp": "Major HP% scaling",
        "roadmap.breakdown.reason.def": "Major DEF% scaling",
        "roadmap.breakdown.reason.em": "Major EM & Reactions scaling",
        "roadmap.breakdown.reason.reactions": "Elemental reactions",
        "roadmap.action.weaponLevel": (char, weapon, cur, target) => `Level ${char}'s weapon (${weapon}) from Lv. ${cur} to Lv. ${target}`,
        "roadmap.action.talentLevel": (char, talent, cur, target) => `Upgrade ${talent} of ${char} from Lv. ${cur} to Lv. ${target}`,
        "roadmap.action.charLevel": (char, cur, reason) => `Ascend ${char} from Lv. ${cur} to Lv. 90 (${reason})`,
        "roadmap.action.replaceFlowerPlume": (char, slot, score) => `Replace ${char}'s ${slot} (current score: ${score})`,
        "roadmap.action.fixMainStat": (char, slot, curStat, bestStat) => `Fix main stat on ${char}'s ${slot} (${curStat} ➔ ${bestStat})`,
        "roadmap.action.completeSet": (char, neededSet) => `Complete 4pc set for ${char} (${neededSet})`,
        "roadmap.action.noActions": "All priority steps are already completed!",

        // Module 3 : Cross-Character Swap Optimizer
        "roadmap.swaps.title": "Cross-Character Swap Optimizer",
        "roadmap.swaps.desc": "Instant artifact reallocations between your characters to boost overall showcase score with 0 resin.",
        "roadmap.swaps.netGain": (gain) => `Showcase Net Gain: +${gain} pts`,
        "roadmap.swaps.noSwaps": "No profitable swaps found: your artifacts are already distributed optimally!",
        "roadmap.swaps.swapPiece": (charA, charB, pieceName) => `Swap ${pieceName} between ${charA} and ${charB}`,
        "roadmap.swaps.givesPiece": (charA, charB, pieceName) => `${charA} passes ${pieceName} to ${charB}`,
        "roadmap.swaps.focusGain": (char) => `Upgrade for ${char}`,

        // Module 4 : Domain Planner
        "roadmap.domains.title": "Domain Value Index & Resin Planner",
        "roadmap.domains.desc": "Artifact domains ranked by how many of your characters benefit from their sets.",
        "roadmap.domains.efficiency.veryHigh": "Outstanding Efficiency",
        "roadmap.domains.efficiency.high": "High Efficiency",
        "roadmap.domains.efficiency.medium": "Moderate Efficiency",
        "roadmap.domains.efficiency.low": "Low Efficiency",
        "roadmap.domains.efficiency.none": "None",
        "roadmap.domains.beneficiaries": "Benefiting Characters:",
        "roadmap.domains.bothSetsUseful": "Dual-value domain (both sets are useful!)",
        "roadmap.domains.noPriorityChar": "No priority character",
        "roadmap.domains.empty": "No priority domain identified for the current showcase.",
        "roadmap.domains.optimalSet": "Optimal Set (Best in Slot)",

        // Module 5 : Artifact Strongbox Advisor
        "roadmap.strongbox.title": "Artifact Strongbox Advisor",
        "roadmap.strongbox.desc": "Smartly recycle junk 5★ artifacts to craft key sets without wasting resin in low-value domains.",
        "roadmap.strongbox.recommendedSets": "Priority Sets to Strongbox:",
        "roadmap.strongbox.why": "Why this set?",
        "roadmap.strongbox.targetChars": "For your characters:",
        "roadmap.strongbox.avoidDomainNote": (domainName) => `Saves resin by skipping the "${domainName}" domain.`,
        "roadmap.strongbox.recommendedBadge": "Recommended Strongbox",
        "roadmap.strongbox.dedicatedDomain": "Dedicated Domain",
        "roadmap.strongbox.empty": "Your showcase characters primarily use recent sets not yet available in the Mystic Offering strongbox.",

        // Module 6 : Worst Pieces Audit
        "roadmap.worst.title": "Worst Pieces Audit & Bottlenecks",
        "roadmap.worst.desc": "The lowest scoring artifact pieces in your showcase that are bottlenecking your characters.",
        "roadmap.worst.rank": "Rank",
        "roadmap.worst.owner": "Character",
        "roadmap.worst.piece": "Piece & Stat",
        "roadmap.worst.score": "Current Score",
        "roadmap.worst.cost": "Upgrade Cost Estimate",
        "roadmap.worst.tip": "Key Tip",
        "roadmap.worst.offPieceBadge": "Off-set",
        "roadmap.worst.empty": "No deficient artifacts detected on your characters!",
        "roadmap.worst.tip.substats": "Weak substats to upgrade",
        "roadmap.worst.tip.flowerPlume": "Flower/Plume very easy to upgrade (0% main stat RNG)",
        "roadmap.worst.tip.badMainStat": "Suboptimal main stat (major performance loss)",
        "roadmap.worst.tip.weakOffPiece": "Weak off-set piece, easily replaced from your inventory",
        "roadmap.worst.resinEstimate": (resin, days) => `~${resin} resin (${days}d)`,

        // Module 7 : Sanctifying Elixir Advisor (Natlan Transmuter)
        "roadmap.elixir.title": "Sanctifying Elixir ROI Advisor",
        "roadmap.elixir.desc": "Discover the most cost-effective artifact crafts (elixir cost vs expected gain and natural domain drop rarity).",
        "roadmap.elixir.budget.all": "All",
        "roadmap.elixir.budget.1": "1 Elixir (Flower / Feather)",
        "roadmap.elixir.budget.2": "2 Elixirs (Sands)",
        "roadmap.elixir.budget.3": "3 Elixirs (Circlet)",
        "roadmap.elixir.budget.4": "4 Elixirs (Goblet)",
        "roadmap.elixir.costBadge": (cost) => `${cost}`,
        "roadmap.elixir.costLabel": (cost) => `Cost: ${cost} elixir${cost > 1 ? 's' : ''}`,
        "roadmap.elixir.guaranteed": "Guaranteed:",
        "roadmap.elixir.substats": "2 Chosen Substats:",
        "roadmap.elixir.currentPiece": "Current piece:",
        "roadmap.elixir.expectedGain": (pts) => `Expected gain: +${pts} pts`,
        "roadmap.elixir.upgradeChance": (pct) => `${pct}% upgrade chance`,
        "roadmap.elixir.savedResin": (resin) => `~${resin} resin saved`,
        "roadmap.elixir.verdict.exceptional": "Outstanding ROI",
        "roadmap.elixir.verdict.high": "Highly Efficient",
        "roadmap.elixir.verdict.safe": "Guaranteed Upgrade",
        "roadmap.elixir.verdict.moderate": "Moderate ROI",
        "roadmap.elixir.focusPriority": "Priority Target",
        "roadmap.elixir.empty": "No artifact craft recommended for this filter: your equipped pieces are already exceptionally strong!",
    }
};
export function t(key, ...args) {
    const dict = T[LANG] || T['fr'];
    const fallback = T['fr'];

    let val = dict[key];
    if (val === undefined) val = fallback[key];
    if (val === undefined) return key;

    if (typeof val === 'function') {
        return val.apply(null, args);
    }
    return val;
}

export function guobaSetLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    if (typeof localStorage !== 'undefined') localStorage.setItem('guoba_lang', lang);
    if (typeof location !== 'undefined') location.reload();
}

if (typeof window !== 'undefined') {
    window.t = t;
    window.guobaSetLang = guobaSetLang;
    window.T = T;

    const initI18n = function () {
        if (typeof document === 'undefined') return;
        document.documentElement.lang = window.GUOBA_LANG || LANG;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            el.innerHTML = t(el.getAttribute('data-i18n-html'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        });
        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            el.title = t(el.getAttribute('data-i18n-title'));
        });
        document.title = t('page.title.default');
        function updateMeta(selector, value) {
            const el = document.querySelector(selector);
            if (el) el.setAttribute('content', value);
        }
        updateMeta('meta[name="description"]', t('meta.description'));
        updateMeta('meta[name="keywords"]', t('meta.keywords'));
        updateMeta('meta[property="og:locale"]', t('meta.locale'));
        const versionEl = document.querySelector('.sidebar-text');
        if (versionEl) {
            versionEl.textContent = t('ui.version', '2.0.0', '7.0');
        }
    };

    if (typeof document !== 'undefined') {
        document.addEventListener('astro:page-load', initI18n);
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initI18n);
        } else {
            initI18n();
        }
    }
}
