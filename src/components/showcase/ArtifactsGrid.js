// src/components/showcase/ArtifactsGrid.js
import { renderArtifactCard } from './ArtifactCard.js';

export function renderArtifactsGrid(persoObj) {
    if (!persoObj || !persoObj.artefacts || persoObj.artefacts.length === 0) return '';
    const weights = persoObj.weights || {};

    return persoObj.artefacts.map(art => renderArtifactCard(art, weights)).join('');
}
