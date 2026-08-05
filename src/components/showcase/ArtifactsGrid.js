// src/components/showcase/ArtifactsGrid.js
import { renderArtifactCard } from './ArtifactCard.js';

export function renderArtifactsGrid(persoObj, charIndex = 0) {
    if (!persoObj || !persoObj.artefacts || persoObj.artefacts.length === 0) return '';
    const weights = persoObj.weights || {};

    return persoObj.artefacts.map((art, artIndex) => renderArtifactCard(art, weights, charIndex, artIndex)).join('');
}
