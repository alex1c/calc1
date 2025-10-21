// Name generation algorithms for different types

interface NameGenerationOptions {
	nameType: string;
	gender: string;
	nameCount: number;
	nameLength: string;
}

// Baby names database
const babyNames = {
	male: {
		short: ['Max', 'Leo', 'Sam', 'Tom', 'Ben', 'Dan', 'Ian', 'Roy', 'Jay', 'Zoe'],
		medium: ['Alex', 'Ryan', 'Liam', 'Noah', 'Ethan', 'Lucas', 'Mason', 'Logan', 'James', 'Henry'],
		long: ['Alexander', 'Christopher', 'Benjamin', 'Sebastian', 'Nathaniel', 'Theodore', 'Jonathan', 'Gabriel', 'Nicholas', 'Samuel']
	},
	female: {
		short: ['Amy', 'Eva', 'Ivy', 'Joy', 'May', 'Zoe', 'Lia', 'Mia', 'Ava', 'Eve'],
		medium: ['Emma', 'Olivia', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Harper', 'Evelyn', 'Abigail'],
		long: ['Elizabeth', 'Catherine', 'Victoria', 'Alexandra', 'Isabella', 'Gabriella', 'Penelope', 'Valentina', 'Seraphina', 'Evangeline']
	},
	any: {
		short: ['Alex', 'Sam', 'Max', 'Ava', 'Mia', 'Leo', 'Eva', 'Ian', 'Zoe', 'Ben'],
		medium: ['Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sage', 'River', 'Phoenix'],
		long: ['Alexandria', 'Samantha', 'Maximilian', 'Evangeline', 'Isabella', 'Alexander', 'Gabriella', 'Sebastian', 'Valentina', 'Nathaniel']
	}
};

// Character names database
const characterNames = {
	male: {
		short: ['Kai', 'Zed', 'Rex', 'Ace', 'Fox', 'Jet', 'Rio', 'Zen', 'Lux', 'Nyx'],
		medium: ['Drake', 'Blade', 'Storm', 'Phoenix', 'Hunter', 'Ranger', 'Shadow', 'Falcon', 'Titan', 'Viper'],
		long: ['Alexander', 'Maximilian', 'Sebastian', 'Theodore', 'Benedict', 'Montgomery', 'Archibald', 'Frederick', 'Christopher', 'Nathaniel']
	},
	female: {
		short: ['Luna', 'Nova', 'Iris', 'Aria', 'Zara', 'Lila', 'Nora', 'Maya', 'Kira', 'Eva'],
		medium: ['Serena', 'Aurora', 'Luna', 'Stella', 'Nova', 'Iris', 'Aria', 'Zara', 'Lila', 'Nora'],
		long: ['Seraphina', 'Evangeline', 'Isabella', 'Gabriella', 'Valentina', 'Alexandria', 'Penelope', 'Cordelia', 'Ophelia', 'Persephone']
	},
	any: {
		short: ['Aria', 'Kai', 'Luna', 'Zed', 'Nova', 'Rex', 'Iris', 'Ace', 'Zara', 'Fox'],
		medium: ['Phoenix', 'Storm', 'Luna', 'Blade', 'Aurora', 'Hunter', 'Nova', 'Shadow', 'Serena', 'Falcon'],
		long: ['Alexandria', 'Maximilian', 'Seraphina', 'Sebastian', 'Evangeline', 'Theodore', 'Isabella', 'Benedict', 'Gabriella', 'Montgomery']
	}
};

// Project names database
const projectNames = {
	any: {
		short: ['Nexus', 'Pulse', 'Swift', 'Core', 'Edge', 'Flow', 'Sync', 'Wave', 'Spark', 'Bolt'],
		medium: ['Innovate', 'Catalyst', 'Momentum', 'Velocity', 'Dynamo', 'Genesis', 'Apex', 'Summit', 'Zenith', 'Pinnacle'],
		long: ['InnovationHub', 'TechCatalyst', 'DigitalMomentum', 'FutureVelocity', 'SmartDynamo', 'NextGenesis', 'CloudApex', 'DataSummit', 'AIZenith', 'QuantumPinnacle']
	}
};

// Book/Game names database
const bookGameNames = {
	any: {
		short: ['Quest', 'Realm', 'Saga', 'Tale', 'Epic', 'Legend', 'Myth', 'Fable', 'Chronicle', 'Story'],
		medium: ['Adventure', 'Journey', 'Odyssey', 'Voyage', 'Expedition', 'Pilgrimage', 'Crusade', 'Campaign', 'Mission', 'Quest'],
		long: ['Chronicles', 'Adventures', 'Odyssey', 'Expedition', 'Pilgrimage', 'Crusade', 'Campaign', 'Mission', 'Quest', 'Journey']
	}
};

// Fantasy/Sci-Fi names database
const fantasyNames = {
	male: {
		short: ['Zephyr', 'Orion', 'Atlas', 'Phoenix', 'Titan', 'Vulcan', 'Apollo', 'Mars', 'Jupiter', 'Neptune'],
		medium: ['Aetherius', 'Zephyrus', 'Orionis', 'Atlasius', 'Phoenixus', 'Titanus', 'Vulcanus', 'Apollonius', 'Marsius', 'Jupiterius'],
		long: ['Aetherius', 'Zephyrus', 'Orionis', 'Atlasius', 'Phoenixus', 'Titanus', 'Vulcanus', 'Apollonius', 'Marsius', 'Jupiterius']
	},
	female: {
		short: ['Luna', 'Stella', 'Aurora', 'Nova', 'Iris', 'Aria', 'Zara', 'Lila', 'Nora', 'Maya'],
		medium: ['Lunaria', 'Stellara', 'Aurora', 'Novara', 'Irisa', 'Ariana', 'Zara', 'Liliana', 'Nora', 'Maya'],
		long: ['Lunaria', 'Stellara', 'Aurora', 'Novara', 'Irisa', 'Ariana', 'Zara', 'Liliana', 'Nora', 'Maya']
	},
	any: {
		short: ['Aether', 'Zephyr', 'Orion', 'Atlas', 'Phoenix', 'Titan', 'Vulcan', 'Apollo', 'Mars', 'Jupiter'],
		medium: ['Aetherius', 'Zephyrus', 'Orionis', 'Atlasius', 'Phoenixus', 'Titanus', 'Vulcanus', 'Apollonius', 'Marsius', 'Jupiterius'],
		long: ['Aetherius', 'Zephyrus', 'Orionis', 'Atlasius', 'Phoenixus', 'Titanus', 'Vulcanus', 'Apollonius', 'Marsius', 'Jupiterius']
	}
};

export function generateNames(
	nameType: string,
	gender: string,
	nameCount: number,
	nameLength: string
): string[] {
	let names: string[] = [];
	
	// Select appropriate database based on name type
	switch (nameType) {
		case 'baby':
			names = babyNames[gender as keyof typeof babyNames]?.[nameLength as keyof typeof babyNames.male] || [];
			break;
		case 'character':
			names = characterNames[gender as keyof typeof characterNames]?.[nameLength as keyof typeof characterNames.male] || [];
			break;
		case 'project':
			names = projectNames.any[nameLength as keyof typeof projectNames.any] || [];
			break;
		case 'book':
			names = bookGameNames.any[nameLength as keyof typeof bookGameNames.any] || [];
			break;
		case 'fantasy':
			names = fantasyNames[gender as keyof typeof fantasyNames]?.[nameLength as keyof typeof fantasyNames.male] || [];
			break;
		default:
			names = babyNames.any[nameLength as keyof typeof babyNames.any] || [];
	}

	// Shuffle and select requested number of names
	const shuffled = [...names].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, nameCount);
}

// Helper function to get name type display name
export function getNameTypeDisplayName(nameType: string): string {
	const typeMap: { [key: string]: string } = {
		baby: 'Baby Name',
		character: 'Character Name',
		project: 'Project Name',
		book: 'Book/Game Name',
		fantasy: 'Fantasy/Sci-Fi Name'
	};
	return typeMap[nameType] || 'Name';
}

// Helper function to get gender display name
export function getGenderDisplayName(gender: string): string {
	const genderMap: { [key: string]: string } = {
		any: 'Any',
		male: 'Male',
		female: 'Female'
	};
	return genderMap[gender] || 'Any';
}

// Helper function to get length display name
export function getLengthDisplayName(length: string): string {
	const lengthMap: { [key: string]: string } = {
		short: 'Short',
		medium: 'Medium',
		long: 'Long'
	};
	return lengthMap[length] || 'Medium';
}
