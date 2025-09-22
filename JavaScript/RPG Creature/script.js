const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureDisplay = document.getElementById('creature-display');

// Elements to update with creature data
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const creatureSprite = document.getElementById('creature-sprite');

// Type color mapping for styling
const typeColors = {
    fire: 'type-fire',
    water: 'type-water',
    rock: 'type-rock',
    grass: 'type-grass',
    electric: 'type-electric',
    ice: 'type-ice',
    fighting: 'type-fighting',
    poison: 'type-poison',
    ground: 'type-ground',
    flying: 'type-flying',
    psychic: 'type-psychic',
    bug: 'type-bug',
    ghost: 'type-ghost',
    steel: 'type-steel',
    dragon: 'type-dragon',
    dark: 'type-dark',
    fairy: 'type-fairy'
};

// API base URL
const API_URL = 'https://rpg-creature-api.freecodecamp.rocks/api/creature';

// Search function
async function searchCreature() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Please enter a creature name or ID');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${searchTerm}`);
        
        if (!response.ok) {
            throw new Error('Creature not found');
        }
        
        const creatureData = await response.json();
        displayCreature(creatureData);
        
    } catch (error) {
        alert('Creature not found');
        hideCreatureDisplay();
    }
}

// Display creature data
function displayCreature(data) {
    // Clear previous types
    types.innerHTML = '';
    
    // Update creature information
    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    
    // Update stats - find each stat by name
    const statsMap = {};
    data.stats.forEach(stat => {
        statsMap[stat.name] = stat.base_stat;
    });
    
    hp.textContent = statsMap['hp'];
    attack.textContent = statsMap['attack'];
    defense.textContent = statsMap['defense'];
    specialAttack.textContent = statsMap['special-attack'];
    specialDefense.textContent = statsMap['special-defense'];
    speed.textContent = statsMap['speed'];
    
    // Update types
    data.types.forEach(typeInfo => {
        const typeElement = document.createElement('span');
        typeElement.textContent = typeInfo.name.toUpperCase();
        typeElement.className = `type-badge ${typeColors[typeInfo.name] || 'type-normal'}`;
        types.appendChild(typeElement);
    });
    
    // Hide sprite for RPG creatures (no sprite in API)
    creatureSprite.style.display = 'none';
    
    // Show creature display
    showCreatureDisplay();
}

// Show creature display
function showCreatureDisplay() {
    creatureDisplay.classList.add('show');
    creatureDisplay.style.display = 'block';
}

// Hide creature display
function hideCreatureDisplay() {
    creatureDisplay.classList.remove('show');
    creatureDisplay.style.display = 'none';
}

// Event listeners
searchButton.addEventListener('click', searchCreature);

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchCreature();
    }
});

// Clear display on page load
hideCreatureDisplay();