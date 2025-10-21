// Character generation algorithms for different types and settings

interface Character {
	name: string;
	age: string;
	personality: string;
	strengths: string[];
	weaknesses: string[];
	profession: string;
	backstory: string;
}

// Names database by gender and type
const names = {
	male: {
		realistic: [
			'Alexander',
			'Benjamin',
			'Christopher',
			'Daniel',
			'Ethan',
			'Gabriel',
			'Henry',
			'Isaac',
			'James',
			'Lucas',
		],
		fantasy: [
			'Aetherius',
			'Zephyrus',
			'Orionis',
			'Atlasius',
			'Phoenixus',
			'Titanus',
			'Vulcanus',
			'Apollonius',
			'Marsius',
			'Jupiterius',
		],
		scifi: [
			'Zephyr',
			'Orion',
			'Atlas',
			'Phoenix',
			'Titan',
			'Vulcan',
			'Apollo',
			'Mars',
			'Jupiter',
			'Neptune',
		],
	},
	female: {
		realistic: [
			'Emma',
			'Olivia',
			'Sophia',
			'Isabella',
			'Charlotte',
			'Amelia',
			'Mia',
			'Harper',
			'Evelyn',
			'Abigail',
		],
		fantasy: [
			'Lunaria',
			'Stellara',
			'Aurora',
			'Novara',
			'Irisa',
			'Ariana',
			'Zara',
			'Liliana',
			'Nora',
			'Maya',
		],
		scifi: [
			'Luna',
			'Stella',
			'Aurora',
			'Nova',
			'Iris',
			'Aria',
			'Zara',
			'Lila',
			'Nora',
			'Maya',
		],
	},
	any: {
		realistic: [
			'Alex',
			'Sam',
			'Jordan',
			'Taylor',
			'Casey',
			'Morgan',
			'Riley',
			'Avery',
			'Quinn',
			'Sage',
		],
		fantasy: [
			'Aether',
			'Zephyr',
			'Orion',
			'Atlas',
			'Phoenix',
			'Titan',
			'Vulcan',
			'Apollo',
			'Mars',
			'Jupiter',
		],
		scifi: [
			'Aether',
			'Zephyr',
			'Orion',
			'Atlas',
			'Phoenix',
			'Titan',
			'Vulcan',
			'Apollo',
			'Mars',
			'Jupiter',
		],
	},
};

// Age ranges by age group
const ageRanges = {
	child: ['5-8 years', '6-9 years', '7-10 years', '8-11 years', '9-12 years'],
	teen: [
		'13-15 years',
		'14-16 years',
		'15-17 years',
		'16-18 years',
		'17-19 years',
	],
	adult: [
		'20-25 years',
		'26-30 years',
		'31-35 years',
		'36-40 years',
		'41-45 years',
	],
	elderly: [
		'60-65 years',
		'66-70 years',
		'71-75 years',
		'76-80 years',
		'81-85 years',
	],
};

// Personality traits
const personalityTraits = {
	realistic: [
		'Outgoing and sociable, loves meeting new people and making friends',
		'Introverted and thoughtful, prefers quiet environments and deep conversations',
		'Adventurous and spontaneous, always seeking new experiences and challenges',
		'Cautious and methodical, carefully plans every step before taking action',
		'Creative and artistic, expresses themselves through various forms of art',
		'Analytical and logical, approaches problems with systematic thinking',
		"Empathetic and caring, always puts others' needs before their own",
		'Independent and self-reliant, prefers to handle things on their own',
		'Optimistic and cheerful, sees the bright side in every situation',
		'Realistic and practical, focuses on what can actually be achieved',
	],
	fantasy: [
		'Noble and honorable, follows a strict code of ethics and justice',
		'Mysterious and enigmatic, keeps their true thoughts and feelings hidden',
		'Wild and untamed, connected to nature and ancient magic',
		'Wise and ancient, possesses knowledge from centuries of experience',
		'Brave and heroic, always ready to face danger for the greater good',
		'Cunning and clever, uses wit and intelligence to overcome obstacles',
		'Magical and mystical, has a deep connection to supernatural forces',
		'Loyal and devoted, would sacrifice everything for those they love',
		'Rebellious and free-spirited, challenges authority and tradition',
		'Ancient and timeless, carries the wisdom of ages within them',
	],
	scifi: [
		'Tech-savvy and innovative, always on the cutting edge of technology',
		'Logical and precise, approaches everything with scientific methodology',
		'Adaptable and flexible, thrives in rapidly changing environments',
		'Curious and exploratory, driven by the desire to discover new worlds',
		'Efficient and systematic, optimizes everything for maximum productivity',
		'Futuristic and visionary, thinks in terms of possibilities and potential',
		'Connected and networked, maintains relationships across vast distances',
		'Enhanced and augmented, has been improved through technology',
		'Digital and virtual, comfortable in both physical and digital realms',
		'Cosmic and universal, thinks in terms of galactic scales and time',
	],
};

// Strengths database
const strengths = {
	realistic: [
		'Leadership',
		'Communication',
		'Problem-solving',
		'Creativity',
		'Empathy',
		'Determination',
		'Patience',
		'Organization',
		'Teamwork',
		'Adaptability',
		'Critical thinking',
		'Time management',
		'Negotiation',
		'Mentoring',
		'Innovation',
	],
	fantasy: [
		'Bravery',
		'Wisdom',
		'Magic',
		'Honor',
		'Loyalty',
		'Strength',
		'Courage',
		'Nobility',
		'Mysticism',
		'Ancient knowledge',
		'Spiritual connection',
		'Elemental mastery',
		'Divine favor',
		'Legendary status',
		'Mythical power',
	],
	scifi: [
		'Technical expertise',
		'Innovation',
		'Analytical thinking',
		'Adaptability',
		'Precision',
		'System optimization',
		'Data analysis',
		'Future vision',
		'Technological mastery',
		'Digital fluency',
		'Quantum understanding',
		'AI collaboration',
		'Space navigation',
		'Cyber security',
		'Bio-engineering',
	],
};

// Weaknesses database
const weaknesses = {
	realistic: [
		'Perfectionism',
		'Procrastination',
		'Impatience',
		'Overthinking',
		'Self-doubt',
		'Stubbornness',
		'Fear of failure',
		'People-pleasing',
		'Workaholism',
		'Indecisiveness',
		'Overconfidence',
		'Underconfidence',
		'Isolation',
		'Burnout',
		'Anxiety',
	],
	fantasy: [
		'Pride',
		'Recklessness',
		'Trust issues',
		'Past trauma',
		'Moral conflicts',
		'Power corruption',
		'Ancient curses',
		'Divine punishment',
		'Legendary burden',
		'Mystical weakness',
		'Elemental vulnerability',
		'Spiritual crisis',
		'Mythical responsibility',
		'Eternal loneliness',
		'Destiny burden',
	],
	scifi: [
		'Technology dependence',
		'Data overload',
		'System failures',
		'Cyber vulnerabilities',
		'Future anxiety',
		'Isolation',
		'Perfectionism',
		'Over-optimization',
		'Human connection loss',
		'Reality confusion',
		'AI paranoia',
		'Technological obsolescence',
		'Digital addiction',
		'System crashes',
		'Quantum uncertainty',
	],
};

// Professions by type and age
const professions = {
	realistic: {
		child: [
			'Student',
			'Young artist',
			'Sports enthusiast',
			'Book lover',
			'Future scientist',
		],
		teen: [
			'High school student',
			'Part-time worker',
			'Volunteer',
			'Athlete',
			'Artist',
		],
		adult: [
			'Engineer',
			'Teacher',
			'Doctor',
			'Lawyer',
			'Business owner',
			'Artist',
			'Writer',
			'Scientist',
			'Manager',
			'Consultant',
		],
		elderly: [
			'Retired professional',
			'Mentor',
			'Volunteer',
			'Grandparent',
			'Community leader',
		],
	},
	fantasy: {
		child: [
			'Young apprentice',
			'Mage in training',
			'Squire',
			'Nature child',
			'Mystical prodigy',
		],
		teen: [
			'Apprentice wizard',
			'Young knight',
			'Druid initiate',
			'Bard student',
			'Ranger trainee',
		],
		adult: [
			'Wizard',
			'Knight',
			'Druid',
			'Bard',
			'Ranger',
			'Paladin',
			'Cleric',
			'Rogue',
			'Fighter',
			'Sorcerer',
		],
		elderly: [
			'Archmage',
			'Elder knight',
			'Druid elder',
			'Master bard',
			'Legendary ranger',
		],
	},
	scifi: {
		child: [
			'Young scientist',
			'Tech prodigy',
			'Future engineer',
			'Digital native',
			'Space cadet',
		],
		teen: [
			'Tech student',
			'Hacker',
			'Gamer',
			'Future astronaut',
			'AI researcher',
		],
		adult: [
			'Engineer',
			'Scientist',
			'Astronaut',
			'AI specialist',
			'Cyborg',
			'Space pilot',
			'Data analyst',
			'Tech entrepreneur',
			'Quantum physicist',
			'Roboticist',
		],
		elderly: [
			'Retired scientist',
			'Tech mentor',
			'AI consultant',
			'Space veteran',
			'Digital elder',
		],
	},
};

// Backstory templates
const backstoryTemplates = {
	realistic: [
		'Grew up in a small town and moved to the city to pursue their dreams',
		'Overcame significant challenges in their early life to achieve success',
		'Has always been passionate about their field and worked hard to excel',
		'Came from a family of professionals and was expected to follow tradition',
		'Discovered their true calling later in life after trying different paths',
		'Has traveled extensively and gained wisdom from diverse experiences',
		'Started from humble beginnings and built their success through determination',
		'Has always been a natural leader and inspired others to follow',
		'Overcame personal struggles to become the person they are today',
		'Has dedicated their life to helping others and making a difference',
	],
	fantasy: [
		'Born under a rare celestial alignment that marked them for greatness',
		'Discovered their magical abilities during a time of great crisis',
		'Was chosen by an ancient artifact that revealed their true destiny',
		'Grew up in a mystical realm and learned the old ways from masters',
		'Was transformed by a powerful spell that changed their very nature',
		'Has been reincarnated multiple times, carrying wisdom from past lives',
		'Was raised by magical creatures and learned their ancient secrets',
		'Discovered a hidden realm and became its guardian and protector',
		'Was blessed by a deity and granted extraordinary powers',
		'Has been on a quest for many years, seeking to fulfill an ancient prophecy',
	],
	scifi: [
		'Was part of the first generation to be born in space colonies',
		'Discovered advanced alien technology that changed their understanding of reality',
		'Was enhanced through cybernetic implants that expanded their capabilities',
		'Grew up in a post-apocalyptic world and learned to survive through technology',
		'Was part of a secret government program that enhanced their abilities',
		'Has traveled through time and space, experiencing multiple realities',
		'Was created through genetic engineering and represents the next stage of evolution',
		'Has been uploaded into a digital realm and exists as pure consciousness',
		'Was part of the first contact with alien civilizations',
		'Has been modified through nanotechnology and represents the fusion of human and machine',
	],
};

export function generateCharacter(
	gender: string,
	characterType: string,
	ageGroup: string,
	locale: string = 'en'
): Character {
	// For now, use English data - in a real implementation,
	// you would load the appropriate language data based on locale
	// This is a simplified version that always uses English

	// Get random name
	const nameList =
		names[gender as keyof typeof names]?.[
			characterType as keyof typeof names.male
		] || names.any[characterType as keyof typeof names.any];
	const name = nameList[Math.floor(Math.random() * nameList.length)];

	// Get random age
	const ageList = ageRanges[ageGroup as keyof typeof ageRanges];
	const age = ageList[Math.floor(Math.random() * ageList.length)];

	// Get random personality
	const personalityList =
		personalityTraits[characterType as keyof typeof personalityTraits];
	const personality =
		personalityList[Math.floor(Math.random() * personalityList.length)];

	// Get random strengths (3-5)
	const strengthList = strengths[characterType as keyof typeof strengths];
	const numStrengths = Math.floor(Math.random() * 3) + 3; // 3-5 strengths
	const selectedStrengths = [];
	for (let i = 0; i < numStrengths; i++) {
		const strength =
			strengthList[Math.floor(Math.random() * strengthList.length)];
		if (!selectedStrengths.includes(strength)) {
			selectedStrengths.push(strength);
		}
	}

	// Get random weaknesses (2-4)
	const weaknessList = weaknesses[characterType as keyof typeof weaknesses];
	const numWeaknesses = Math.floor(Math.random() * 3) + 2; // 2-4 weaknesses
	const selectedWeaknesses = [];
	for (let i = 0; i < numWeaknesses; i++) {
		const weakness =
			weaknessList[Math.floor(Math.random() * weaknessList.length)];
		if (!selectedWeaknesses.includes(weakness)) {
			selectedWeaknesses.push(weakness);
		}
	}

	// Get random profession
	const professionList =
		professions[characterType as keyof typeof professions][
			ageGroup as keyof typeof professions.realistic
		];
	const profession =
		professionList[Math.floor(Math.random() * professionList.length)];

	// Get random backstory
	const backstoryList =
		backstoryTemplates[characterType as keyof typeof backstoryTemplates];
	const backstory =
		backstoryList[Math.floor(Math.random() * backstoryList.length)];

	return {
		name,
		age,
		personality,
		strengths: selectedStrengths,
		weaknesses: selectedWeaknesses,
		profession,
		backstory,
	};
}

// Helper function to get gender display name
export function getGenderDisplayName(gender: string): string {
	const genderMap: { [key: string]: string } = {
		any: 'Any',
		male: 'Male',
		female: 'Female',
	};
	return genderMap[gender] || 'Any';
}

// Helper function to get character type display name
export function getCharacterTypeDisplayName(characterType: string): string {
	const typeMap: { [key: string]: string } = {
		realistic: 'Realistic',
		fantasy: 'Fantasy',
		scifi: 'Sci-Fi',
	};
	return typeMap[characterType] || 'Realistic';
}

// Helper function to get age group display name
export function getAgeGroupDisplayName(ageGroup: string): string {
	const ageMap: { [key: string]: string } = {
		child: 'Child',
		teen: 'Teen',
		adult: 'Adult',
		elderly: 'Elderly',
	};
	return ageMap[ageGroup] || 'Adult';
}
