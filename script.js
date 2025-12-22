const STAT_MAPPING = {
    "FIGHT_PROP_HP": "hp",
    "FIGHT_PROP_HP_PERCENT": "hp_", // Le _ signifie %
    "FIGHT_PROP_ATTACK": "atk",
    "FIGHT_PROP_ATTACK_PERCENT": "atk_",
    "FIGHT_PROP_DEFENSE": "def",
    "FIGHT_PROP_DEFENSE_PERCENT": "def_",
    "FIGHT_PROP_CRITICAL": "cr",
    "FIGHT_PROP_CRITICAL_HURT": "cd",
    "FIGHT_PROP_CHARGE_EFFICIENCY": "er",
    "FIGHT_PROP_ELEMENT_MASTERY": "em",
    // Dégâts élémentaires (Exemples courants)
    "FIGHT_PROP_WATER_ADD_HURT": "hydro_dmg",
    "FIGHT_PROP_FIRE_ADD_HURT": "pyro_dmg",
    // ... on pourra en ajouter d'autres
};

// Variable pour stocker le dictionnaire officiel une fois téléchargé
let charData = {};
let locData = {};    // Nouveau !

function formatStat(propId, value) {
    const statName = STAT_MAPPING[propId];

    // Si on ne connait pas la stat, on renvoie l'original pour debug
    if (!statName) return { name: propId, value: value };

    // Si c'est un pourcentage (contient _ ou est cr/cd/er), on multiplie par 100 ?
    // Enka envoie généralement les substats déjà correctes, mais les mainstats en float (0.466)
    // C'est un peu piégeux, pour l'instant traitons les substats :

    // Règle simple pour l'affichage : Si le nom finit par _ ou est cr/cd/er, on ajoute %
    let displayValue = value;
    let isPercent = false;

    if (statName.endsWith('_') || ['cr', 'cd', 'er', 'hydro_dmg', 'pyro_dmg'].includes(statName)) {
        isPercent = true;
        // Petit hack : parfois c'est 0.46 (main stat) parfois 46 (substat)
        // On réglera ça plus finement après, pour l'instant on regarde juste le type.
    }

    return {
        key: statName, // ex: "hp_"
        label: statName.toUpperCase().replace('_', '%'), // ex: "HP%"
        value: displayValue,
        isPercent: isPercent
    };
}

// Fonction pour charger le dictionnaire officiel d'Enka
async function loadGameData() {
    const statusDiv = document.getElementById('output');
    statusDiv.innerText = "Chargement des données (Patience, le fichier de langue est gros)...";

    try {
        // On charge seulement les personnages et les traductions
        const [chars, locs] = await Promise.all([
            fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json').then(r => r.json()),
            fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json').then(r => r.json())
        ]);

        charData = chars;
        locData = locs;

        console.log("Données chargées !");
        console.log("Structure de locData :", Object.keys(locData));
// Ça devrait afficher : ['en', 'ru', 'vi', 'th', 'pt', 'ko', 'ja', 'id', 'fr', 'es', 'de', 'chs', 'cht']
        statusDiv.innerText = "Système prêt. Entrez un UID.";
    } catch (error) {
        console.error("Erreur chargement data:", error);
        statusDiv.innerText = "Erreur : Impossible de charger les fichiers JSON (Vérifiez votre connexion).";
    }
}

// Fonction utilitaire pour récupérer le texte en français
function getText(hash) {
    // 1. Vérifier si locData est bien chargé et s'il contient le français
    if (!locData || !locData.fr) {
        return "Chargement...";
    }

    // 2. Chercher le hash dans la section 'fr'
    if (locData.fr[hash]) {
        return locData.fr[hash];
    }

    // 3. Fallback : Si pas de FR, on tente l'anglais ('en'), sinon on renvoie le hash
    if (locData.en && locData.en[hash]) {
        return locData.en[hash] + " (EN)";
    }

    return "Inconnu (" + hash + ")";
}

// Lancer le chargement dès que la page s'ouvre
loadGameData();

// On crée une variable globale pour stocker nos personnages "propres"
let globalPersoData = [];

function processData(data) {
    const characters = data.avatarInfoList;
    const playerInfo = data.playerInfo;

    if (!characters) {
        console.log("Aucun personnage en vitrine.");
        return;
    }

    console.log(`Trouvé ${characters.length} personnages pour ${playerInfo.nickname}`);

    // On vide la liste précédente si on refait une recherche
    globalPersoData = [];

    // LA BOUCLE : On traite chaque personnage un par un
    // LA BOUCLE MODIFIÉE
    characters.forEach(perso => {
        const statsCombat = perso.fightPropMap;
        const id = perso.avatarId;
        const artefactsList = [];
        let armeData = null;

        // On cherche les infos dans le Grand Livre (charData)
        // Si l'ID existe dans charData, on prend ses infos, sinon on met des valeurs par défaut
        const infoPerso = charData[id] || {};

        // 1. Trouver le nom de fichier de l'image (ex: "UI_AvatarIcon_Side_Furina")
        let iconName = infoPerso.SideIconName || "UI_AvatarIcon_Side_Paimon";

        // 2. Construire l'URL de l'image
        // Les images sont stockées sur le serveur d'Enka
        // On remplace "Side_Match" par "" car parfois le nom de fichier a une variante
        const iconUrl = `https://enka.network/ui/${iconName.replace("Side_Match", "Side")}.png`;

        // 3. Essayer de deviner le nom (Pour la vraie traduction FR, c'est une étape de plus,
        // pour l'instant on prend le nom interne qui est souvent en anglais ex: "Furina")
        // On nettoie le string "UI_AvatarIcon_Side_" pour garder juste le nom
        let nomEstime = iconName.replace("UI_AvatarIcon_Side_", "").replace("UI_AvatarIcon_", "");

        perso.equipList.forEach(item => {
            const flat = item.flat;

            // ... (Début de la boucle persos) ...

            // CAS 1 : C'est une ARME
            if (flat.itemType === "ITEM_WEAPON") {
                // On utilise la nouvelle fonction getText corrigée
                const nomArme = getText(flat.nameTextMapHash);

                const iconUrl = `https://enka.network/ui/${flat.icon}.png`;

                armeData = {
                    id: item.itemId,
                    nom: nomArme, // Devrait afficher "Lumière du verdict" (ou autre)
                    image: iconUrl,
                    level: item.weapon.level,
                    // Le raffinement est dans affixMap. Attention : pour une arme R1, affixMap peut être vide ou null
                    refinement: (item.weapon.affixMap && Object.values(item.weapon.affixMap)[0] + 1) || 1
                };
            }

            // CAS 2 : C'est un ARTÉFACT
            else if (flat.itemType === "ITEM_RELIQUARY") {

                const nomSet = getText(flat.setNameTextMapHash);

                // --- AJOUTER CECI ---
                const iconUrl = `https://enka.network/ui/${flat.icon}.png`;
                // --------------------

                // ... (Code des stats inchangé) ...
                const mainStatId = flat.reliquaryMainstat.mainPropId;
                const mainStatValue = flat.reliquaryMainstat.statValue;
                const formattedMain = formatStat(mainStatId, mainStatValue);

                const subStatsList = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach(sub => {
                        const formattedSub = formatStat(sub.appendPropId, sub.statValue);
                        subStatsList.push(formattedSub);
                    });
                }

                artefactsList.push({
                    type: flat.equipType,
                    setName: nomSet,
                    image: iconUrl, // <--- AJOUTER ICI
                    mainStat: formattedMain,
                    subStats: subStatsList,
                    level: item.reliquary.level - 1
                });
            }
        });

        const persoPropre = {
            id: id,
            nom: nomEstime,
            image: iconUrl,
            niveau: perso.propMap['4001'].val,
            stats: {
                hp: Math.round(statsCombat['2000']),
                atk: Math.round(statsCombat['2001']),
                def: Math.round(statsCombat['2002']),
                cr: (statsCombat['20'] * 100).toFixed(1),
                cd: (statsCombat['22'] * 100).toFixed(1)
            },
            arme: armeData,        // On ajoute l'arme
            artefacts: artefactsList // On ajoute la liste complète !
        };

        globalPersoData.push(persoPropre);
    });

    // Une fois la boucle finie, on affiche les boutons
    afficherBoutonsPersonnages();
}

async function fetchUserData() {
    const uid = document.getElementById('uidInput').value;
    if (!uid) return alert("Mettez un UID !");

    const output = document.getElementById('output');
    output.innerText = "Chargement...";

    // URL de l'API Enka
    const apiUrl = `https://enka.network/api/uid/${uid}`;

    // ASTUCE : On passe par un proxy pour éviter l'erreur CORS (juste pour le dev)
    // "corsproxy.io" est un service gratuit qui permet de contourner la sécurité du navigateur
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;

    try {
        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status}`);
        }

        const data = await response.json();

        // Si on est là, on a les données !
        console.log("Données reçues :", data);

        // Affichons juste le pseudo pour prouver que ça marche
        const pseudo = data.playerInfo.nickname;
        output.innerText = `Succès ! Joueur trouvé : ${pseudo}\n\nOuvrez la console (F12) pour voir tout le détail.`;

        // C'est ici qu'on va appeler notre fonction de traitement (Étape 3)
        processData(data);

    } catch (error) {
        console.error(error);
        output.innerText = "Erreur : Impossible de récupérer les données (Vérifiez l'UID ou si la vitrine est publique).";
    }
}

function afficherBoutonsPersonnages() {
    const container = document.getElementById('resultats');
    let btnContainer = document.getElementById('perso-buttons');

    if (!btnContainer) {
        btnContainer = document.createElement('div');
        btnContainer.id = 'perso-buttons';
        // Un peu de CSS pour aligner les boutons
        btnContainer.style.display = "flex";
        btnContainer.style.gap = "10px";
        btnContainer.style.flexWrap = "wrap";
        btnContainer.style.marginBottom = "20px";
        container.insertBefore(btnContainer, container.firstChild);
    }

    btnContainer.innerHTML = ''; // Vider

    globalPersoData.forEach((perso) => {
        // On crée un conteneur qui ressemble à une carte
        const card = document.createElement('div');
        card.style.border = "1px solid #ccc";
        card.style.borderRadius = "8px";
        card.style.padding = "10px";
        card.style.textAlign = "center";
        card.style.cursor = "pointer";
        card.style.background = "#f9f9f9";
        card.style.width = "100px";

        // L'image
        const img = document.createElement('img');
        img.src = perso.image;
        img.style.width = "100%"; // Prend toute la largeur de la carte
        img.style.borderRadius = "50%"; // Rond
        img.alt = perso.nom;

        // Le nom
        const txt = document.createElement('div');
        txt.innerText = perso.nom;
        txt.style.fontWeight = "bold";
        txt.style.marginTop = "5px";

        // Assemblage
        card.appendChild(img);
        card.appendChild(txt);

        // Clic
        card.onclick = () => {
            console.log("Stats complètes :", perso);
            showCharacterDetails(perso);
            // On récupère le nom du set du premier artéfact pour l'exemple
            const setExemple = perso.artefacts.length > 0 ? perso.artefacts[0].setName : "Aucun";
            const armeNom = perso.arme ? perso.arme.nom : "Aucune";

            document.getElementById('output').innerText =
                `Perso : ${perso.nom}\n` +
                `Arme : ${armeNom} (R${perso.arme ? perso.arme.refinement : 0})\n` +
                `Set (ex) : ${setExemple}\n` +
                `HP : ${perso.stats.hp} | ATK : ${perso.stats.atk}\n` +
                `CRIT : ${perso.stats.cr}% / ${perso.stats.cd}%`;
        };

        btnContainer.appendChild(card);
    });
}

function showCharacterDetails(perso) {
    const view = document.getElementById('detailed-view') || document.createElement('div');
    view.id = 'detailed-view';
    view.style.display = 'block';

    // Si le conteneur n'est pas encore dans la page, on l'ajoute après les boutons
    const resultDiv = document.getElementById('resultats');
    if (!document.getElementById('detailed-view')) {
        resultDiv.appendChild(view);
    }

    // --- 1. GÉNÉRATION DES ARTÉFACTS (HTML) ---
    let artifactsHTML = '<div class="artifacts-grid">';

    // Ordre d'affichage classique : Fleur -> Plume -> Sablier -> Coupe -> Couronne
    // Les types dans l'API sont : EQUIP_BRACER, EQUIP_NECKLACE, EQUIP_SHOES, EQUIP_RING, EQUIP_DRESS
    const order = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

    // On trie les artéfacts pour qu'ils s'affichent dans le bon ordre
    const sortedArtifacts = perso.artefacts.sort((a, b) => {
        return order.indexOf(a.type) - order.indexOf(b.type);
    });

    sortedArtifacts.forEach(art => {
        // Génération des substats
        let subsHTML = '<div class="sub-stats">';
        art.subStats.forEach(sub => {
            subsHTML += `
                <div class="sub-stat-row">
                    <span>${sub.label}</span>
                    <span>+${sub.value}${sub.isPercent ? '%' : ''}</span>
                </div>`;
        });
        subsHTML += '</div>';

        artifactsHTML += `
            <div class="artifact-card">
                <div class="art-header">
                    <img src="${art.image}" class="art-icon" alt="Icon">
                    <div>
                        <div style="font-weight:bold; font-size:0.8em">${art.type.replace('EQUIP_', '')} (+${art.level})</div>
                    </div>
                </div>
                <div class="main-stat">
                    ${art.mainStat.value}${art.mainStat.isPercent ? '%' : ''}
                    <div style="font-size:0.5em; color:#aaa">${art.mainStat.label}</div>
                </div>
                ${subsHTML}
                <div class="set-name">${art.setName}</div>
            </div>
        `;
    });
    artifactsHTML += '</div>';

    // --- 2. CONSTRUCTION GLOBALE ---
    const arme = perso.arme;
    const stats = perso.stats;

    view.innerHTML = `
        <h2 style="border-bottom:1px solid #555; padding-bottom:10px;">
            ${perso.nom} <small style="color:#aaa; font-size:0.6em">(Niv. ${perso.niveau})</small>
        </h2>
        
        <div class="top-section">
            <div class="char-info">
                <img src="${perso.image}" alt="${perso.nom}">
                <div class="stats-list">
                    <div><strong>PV Max :</strong> ${stats.hp}</div>
                    <div><strong>ATK :</strong> ${stats.atk}</div>
                    <div><strong>DEF :</strong> ${stats.def}</div>
                    <div><strong>Taux Crit :</strong> ${stats.cr}%</div>
                    <div><strong>Dégâts Crit :</strong> ${stats.cd}%</div>
                    </div>
            </div>

            <div class="weapon-info">
                ${arme ? `
                    <img src="${arme.image}" alt="${arme.nom}">
                    <div>
                        <div style="font-weight:bold; color:#daccb0">${arme.nom}</div>
                        <div>Niv. ${arme.level} <span style="background:#555; padding:2px 5px; border-radius:4px; font-size:0.8em">R${arme.refinement}</span></div>
                        <div style="color:#aaa; font-size:0.9em">ATK Base : ${arme.baseAtk}</div>
                    </div>
                ` : '<div>Pas d\'arme équipée</div>'}
            </div>
        </div>

        <h3 style="margin-top:0">Artéfacts</h3>
        ${artifactsHTML}
    `;
}