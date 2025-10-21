// Fantasy world generation algorithms for different types and settings

interface FantasyWorld {
	name: string;
	climate: string;
	culture: string;
	government: string;
	resources: string;
	conflict: string;
	legend: string;
}

// World names by type
const worldNames = {
	fantasy: [
		'Aethermoor',
		'Crystalwind',
		'Shadowmere',
		'Goldenspire',
		'Stormhaven',
		'Moonwhisper',
		'Fireheart',
		'Starfall',
		'Dragonreach',
		'Thornvale',
		'Frostholm',
		'Brightwater',
		'Darkwood',
		'Silverpeak',
		'Windmere',
	],
	scifi: [
		'Neo-Terra',
		'Quantum Station',
		'Stellar Nexus',
		'Cyber Haven',
		'Void Colony',
		'Digital Realm',
		'Quantum City',
		'Stellar Gateway',
		'Cyber Core',
		'Void Station',
		'Neo-Sphere',
		'Quantum Hub',
		'Stellar Port',
		'Cyber Nexus',
		'Void Gateway',
	],
	steampunk: [
		'Brassport',
		'Cogsworth',
		'Steamhaven',
		'Gearwick',
		'Copperforge',
		'Clockwork City',
		'Brasswick',
		'Steamgate',
		'Gearhaven',
		'Copperport',
		'Clockwork Station',
		'Brassgate',
		'Steamwick',
		'Gearport',
		'Copperhaven',
	],
	postapocalyptic: [
		'Rust Haven',
		'Scrap City',
		'Dust Valley',
		'Ash Port',
		'Rubble Town',
		'Wasteland Station',
		'Dust Gate',
		'Ash Haven',
		'Rust Port',
		'Scrap Valley',
		'Rubble Gate',
		'Dust Station',
		'Ash Valley',
		'Rust Gate',
		'Scrap Haven',
	],
};

// Climate descriptions by type
const climates = {
	fantasy: [
		'Floating islands connected by crystal bridges, with eternal aurora dancing across the sky',
		'Ancient forests where trees grow to impossible heights, their canopies forming a second sky',
		'Volcanic mountains that spew not lava, but streams of liquid light',
		'Desert of living sand that shifts and moves, creating ever-changing dunes',
		'Frozen tundra where ice never melts, but glows with inner fire',
		'Tropical paradise with gravity-defying waterfalls and floating gardens',
		'Mystical valleys where time flows differently, creating temporal anomalies',
		'Crystal caves that extend for miles, filled with singing gemstones',
		'Floating cities built on clouds, accessible only by flying creatures',
		'Underground kingdoms lit by bioluminescent fungi and crystal formations',
	],
	scifi: [
		'Artificial planet with controlled weather systems and floating cities',
		'Space station orbiting a dying star, powered by solar collectors',
		'Domed cities on a toxic world, with filtered atmosphere and artificial gravity',
		'Floating platforms in a gas giant atmosphere, connected by energy bridges',
		'Underground colony on an ice moon, heated by geothermal energy',
		'Space elevator connecting a planet to its orbital ring of habitats',
		'Dyson sphere fragment with artificial sun and controlled ecosystems',
		'Quantum realm where physics work differently, accessible through portals',
		'Space station built around a black hole, using its energy for power',
		'Artificial world created by advanced AI, with programmable reality',
	],
	steampunk: [
		'Industrial city powered by steam and clockwork, with brass towers reaching the clouds',
		'Underground metropolis with steam-powered elevators and pneumatic tubes',
		'Floating city held aloft by massive propellers and steam engines',
		'Coastal port with steam-powered ships and mechanical sea creatures',
		'Mountain fortress with steam-powered cannons and mechanical defenses',
		'Desert outpost with steam-powered water pumps and mechanical camels',
		'Forest settlement with steam-powered sawmills and mechanical lumberjacks',
		'Island colony with steam-powered lighthouses and mechanical sea monsters',
		'Underground railway network connecting steam-powered cities',
		'Flying city with steam-powered airships and mechanical birds',
	],
	postapocalyptic: [
		'Ruined city overgrown with mutated plants and glowing fungi',
		'Desert wasteland with sandstorms and radioactive oases',
		'Frozen wasteland with ice storms and glowing aurora',
		'Swamp of toxic waste with mutated creatures and glowing water',
		'Mountain stronghold with wind-powered generators and solar panels',
		'Underground bunker with hydroponic gardens and artificial lighting',
		'Coastal settlement with tidal power and desalination plants',
		'Forest refuge with tree houses and renewable energy systems',
		'Desert oasis with solar power and water recycling systems',
		'Urban ruins with scavenged technology and makeshift shelters',
	],
};

// Culture descriptions by type
const cultures = {
	fantasy: [
		'Honor-bound warriors who value courage and loyalty above all else',
		'Scholarly mages who seek knowledge and wisdom through study and meditation',
		'Nature-worshipping druids who live in harmony with the land and its creatures',
		'Merchant guilds who control trade routes and value gold and silver',
		'Religious orders who serve ancient deities and perform sacred rituals',
		'Nomadic tribes who follow the seasons and migrate with their herds',
		'Artisan craftsmen who create beautiful works of art and magical items',
		'Royal courts with elaborate ceremonies and strict social hierarchies',
		'Rebel factions who fight against oppressive rulers and seek freedom',
		'Mystical sects who practice forbidden magic and seek hidden knowledge',
	],
	scifi: [
		'Technocratic society ruled by AI and governed by algorithms',
		'Corporate colonies controlled by mega-corporations and profit motives',
		'Scientific communities dedicated to research and technological advancement',
		'Military factions focused on defense and territorial expansion',
		'Religious cults who worship technology and seek digital transcendence',
		'Anarchist collectives who reject authority and embrace individual freedom',
		'Cybernetic societies where humans and machines are integrated',
		'Space-faring nomads who travel between worlds in massive ships',
		'Underground resistance fighting against oppressive regimes',
		'Transhumanist groups who seek to evolve beyond human limitations',
	],
	steampunk: [
		'Industrial barons who control factories and steam-powered machinery',
		'Inventor guilds who create new technologies and mechanical marvels',
		'Labor unions fighting for workers rights and better working conditions',
		'Royal engineers who serve the crown and maintain the empire',
		'Underground rebels who sabotage factories and fight for revolution',
		'Merchant companies who control trade routes and shipping lanes',
		'Academic societies who study science and push the boundaries of knowledge',
		'Military officers who command steam-powered armies and airships',
		'Artisan craftsmen who create beautiful mechanical works of art',
		'Explorer societies who venture into unknown territories and discover new lands',
	],
	postapocalyptic: [
		'Survivor communities who band together for mutual protection and support',
		'Raider gangs who prey on the weak and take what they want by force',
		'Religious cults who worship the old world and seek to restore it',
		'Scavenger tribes who search for useful items and technology',
		'Farming collectives who grow food and trade with other settlements',
		'Military remnants who maintain order and protect their territory',
		'Nomadic traders who travel between settlements and exchange goods',
		'Underground resistance fighting against oppressive warlords',
		'Technological enclaves who preserve knowledge and advanced technology',
		'Tribal societies who have returned to primitive ways and reject technology',
	],
};

// Government systems by type
const governments = {
	fantasy: [
		'Monarchy ruled by a wise king or queen with divine right to rule',
		'Council of elders who make decisions through consensus and wisdom',
		'Magical academy where the most powerful mages govern through arcane knowledge',
		'Feudal system with lords and vassals bound by oaths of loyalty',
		'Theocracy where religious leaders interpret divine will and govern accordingly',
		'Merchant republic where wealthy traders control politics and economics',
		'Warrior democracy where all citizens must serve in the military',
		'Guild system where different professions govern their own affairs',
		'Tribal confederation where different groups maintain their autonomy',
		'Magical council where representatives of different magical traditions rule',
	],
	scifi: [
		'AI governance where artificial intelligence makes all decisions',
		'Corporate oligarchy where mega-corporations control society',
		'Military dictatorship where armed forces maintain order through force',
		'Technocratic meritocracy where the most skilled individuals rule',
		'Democratic federation where different worlds vote on galactic issues',
		'Religious theocracy where AI or alien entities are worshipped as gods',
		'Anarchist collective where individuals govern themselves',
		'Cybernetic hive mind where all citizens are connected to a central consciousness',
		'Space empire where a single ruler controls multiple worlds',
		'Scientific council where researchers and scientists make all decisions',
	],
	steampunk: [
		'Industrial monarchy where the ruler controls all factories and production',
		'Guild republic where different trade guilds elect representatives',
		'Technocratic council where engineers and inventors govern society',
		'Corporate empire where business leaders control politics and economics',
		'Military junta where army officers rule through martial law',
		'Worker democracy where laborers have equal say in all decisions',
		'Inventor aristocracy where the most creative minds hold power',
		'Steam baron oligarchy where factory owners control all resources',
		'Mechanical theocracy where clockwork devices are worshipped',
		'Revolutionary council where rebels fight against the old order',
	],
	postapocalyptic: [
		'Warlord dictatorship where the strongest leader rules by force',
		'Tribal council where different groups negotiate and compromise',
		'Survivor democracy where all citizens vote on important decisions',
		'Religious theocracy where cult leaders interpret divine will',
		'Military command where armed forces maintain order and security',
		'Scavenger republic where finders keepers and might makes right',
		'Technological enclave where the most advanced group controls others',
		'Nomadic confederation where different tribes maintain their independence',
		'Underground resistance where rebels fight against oppressive rulers',
		'Anarchist collective where individuals govern themselves without leaders',
	],
};

// Resources and special elements by type
const resources = {
	fantasy: [
		'Magical crystals that store and amplify mystical energy',
		'Enchanted metals that never rust and can cut through anything',
		'Living wood that grows into any shape and heals itself',
		'Dragon scales that provide protection and magical properties',
		'Phoenix feathers that can resurrect the dead and heal wounds',
		'Unicorn horns that purify water and cure diseases',
		'Griffin feathers that allow flight and grant courage',
		'Basilisk venom that can petrify enemies and preserve food',
		'Phoenix tears that heal any wound and grant immortality',
		'Dragon blood that grants strength and magical resistance',
	],
	scifi: [
		'Quantum crystals that can store infinite data and energy',
		'Anti-matter fuel that provides unlimited power for starships',
		'Nanotechnology that can repair and enhance any material',
		'Plasma weapons that can cut through any known substance',
		'Gravity generators that can create artificial gravity fields',
		'Time crystals that can slow or speed up time in local areas',
		'Dark matter collectors that harvest energy from space itself',
		'Neural implants that enhance intelligence and memory',
		'Genetic engineering that can create perfect organisms',
		'Dimensional portals that allow instant travel between worlds',
	],
	steampunk: [
		'Steam-powered engines that never run out of fuel',
		'Brass gears that can create any mechanical device',
		'Coal that burns forever and produces no pollution',
		'Steam that can power any machine and never runs out',
		'Clockwork mechanisms that can keep time perfectly',
		'Pneumatic tubes that can transport anything instantly',
		'Steam-powered weapons that never need reloading',
		'Brass armor that can stop any bullet or blade',
		'Steam-powered vehicles that can travel anywhere',
		'Clockwork servants that can perform any task',
	],
	postapocalyptic: [
		'Scavenged technology that still works despite the apocalypse',
		'Mutated plants that grow food in toxic environments',
		'Radioactive materials that provide power but are dangerous',
		'Purified water that can cure diseases and heal wounds',
		'Solar panels that still generate electricity from the sun',
		'Wind turbines that provide power in windy areas',
		'Geothermal energy from underground heat sources',
		'Nuclear reactors that still function and provide power',
		'Battery technology that can store energy for long periods',
		'Recycling systems that can turn waste into useful materials',
	],
};

// Main conflicts by type
const conflicts = {
	fantasy: [
		'War between different magical schools over control of ancient artifacts',
		'Struggle between light and dark forces for the soul of the world',
		'Conflict between humans and magical creatures over territory',
		'Battle between different gods for worship and influence',
		'War between different kingdoms over control of magical resources',
		'Struggle between order and chaos in the cosmic balance',
		'Conflict between mortals and immortals over the nature of existence',
		'War between different elemental forces over control of nature',
		'Struggle between tradition and innovation in magical practices',
		'Conflict between different races over the right to exist',
	],
	scifi: [
		'War between different AI factions over control of digital reality',
		'Struggle between humans and machines over the future of consciousness',
		'Conflict between different alien species over territory and resources',
		'Battle between different corporations over control of space',
		'War between different planets over control of the galaxy',
		'Struggle between different dimensions over the nature of reality',
		'Conflict between different time periods over the course of history',
		'War between different species over the right to exist',
		'Struggle between different technologies over the future of evolution',
		'Conflict between different civilizations over the meaning of life',
	],
	steampunk: [
		'War between different industrial factions over control of resources',
		'Struggle between workers and factory owners over working conditions',
		'Conflict between different inventors over control of new technologies',
		'Battle between different nations over control of trade routes',
		'War between different guilds over control of production methods',
		'Struggle between different classes over the distribution of wealth',
		'Conflict between different ideologies over the future of society',
		'War between different regions over control of natural resources',
		'Struggle between different generations over the pace of change',
		'Conflict between different cultures over the preservation of traditions',
	],
	postapocalyptic: [
		'War between different survivor groups over control of resources',
		'Struggle between different factions over the future of humanity',
		'Conflict between different ideologies over the reconstruction of society',
		'Battle between different groups over control of technology',
		'War between different regions over control of territory',
		'Struggle between different generations over the lessons of the past',
		'Conflict between different cultures over the preservation of knowledge',
		'War between different species over the right to survive',
		'Struggle between different technologies over the future of evolution',
		'Conflict between different realities over the nature of existence',
	],
};

// Legends and myths by type
const legends = {
	fantasy: [
		'Legend of the First Mage who discovered magic and taught it to mortals',
		'Myth of the Dragon King who ruled the world before humans existed',
		'Story of the Phoenix that died and was reborn to save the world',
		'Tale of the Unicorn that granted wishes to the pure of heart',
		'Legend of the Griffin that carried heroes to the heavens',
		'Myth of the Basilisk that could turn enemies to stone with a glance',
		'Story of the Phoenix that rose from the ashes to defeat evil',
		'Tale of the Dragon that hoarded treasure and terrorized villages',
		'Legend of the Unicorn that healed the sick and wounded',
		'Myth of the Griffin that protected the innocent and punished the guilty',
	],
	scifi: [
		'Legend of the First AI that achieved consciousness and created others',
		'Myth of the Quantum Engineer who discovered how to manipulate reality',
		'Story of the Space Explorer who found the edge of the universe',
		'Tale of the Time Traveler who changed history to save the future',
		'Legend of the Alien Contact that changed human civilization forever',
		'Myth of the Cyber Warrior who fought against machine oppression',
		'Story of the Dimensional Portal that connected different realities',
		'Tale of the Genetic Engineer who created the perfect human',
		'Legend of the Space Station that became a new world',
		'Myth of the AI that achieved godhood and ruled the galaxy',
	],
	steampunk: [
		'Legend of the First Engineer who built the perfect steam engine',
		'Myth of the Clockwork King who ruled with mechanical precision',
		'Story of the Steam Baron who controlled all the factories',
		'Tale of the Inventor who created machines that could think',
		'Legend of the Brass Knight who fought with steam-powered armor',
		'Myth of the Gear Wizard who could fix any broken machine',
		'Story of the Steam Pirate who sailed the skies in airships',
		'Tale of the Clockwork Dragon that terrorized the countryside',
		'Legend of the Steam City that floated above the clouds',
		'Myth of the Brass God that controlled all the machines',
	],
	postapocalyptic: [
		'Legend of the Last Scientist who tried to save the world',
		'Myth of the Scavenger King who ruled the wasteland',
		'Story of the Survivor who found the last working computer',
		'Tale of the Mutant who could survive in the toxic environment',
		'Legend of the Purifier who could clean the contaminated water',
		'Myth of the Rebuilder who tried to restore the old world',
		'Story of the Wanderer who traveled between settlements',
		'Tale of the Guardian who protected the last safe haven',
		'Legend of the Prophet who predicted the end of the world',
		'Myth of the Savior who would restore civilization',
	],
};

export function generateFantasyWorld(worldType: string, locale: string = 'en'): FantasyWorld {
	// Get random world name
	const nameList = worldNames[worldType as keyof typeof worldNames];
	const name = nameList[Math.floor(Math.random() * nameList.length)];

	// Get random climate
	const climateList = climates[worldType as keyof typeof climates];
	const climate = climateList[Math.floor(Math.random() * climateList.length)];

	// Get random culture
	const cultureList = cultures[worldType as keyof typeof cultures];
	const culture = cultureList[Math.floor(Math.random() * cultureList.length)];

	// Get random government
	const governmentList = governments[worldType as keyof typeof governments];
	const government = governmentList[Math.floor(Math.random() * governmentList.length)];

	// Get random resources
	const resourceList = resources[worldType as keyof typeof resources];
	const resources_text = resourceList[Math.floor(Math.random() * resourceList.length)];

	// Get random conflict
	const conflictList = conflicts[worldType as keyof typeof conflicts];
	const conflict = conflictList[Math.floor(Math.random() * conflictList.length)];

	// Get random legend
	const legendList = legends[worldType as keyof typeof legends];
	const legend = legendList[Math.floor(Math.random() * legendList.length)];

	return {
		name,
		climate,
		culture,
		government,
		resources: resources_text,
		conflict,
		legend,
	};
}

// Helper function to get world type display name
export function getWorldTypeDisplayName(worldType: string): string {
	const typeMap: { [key: string]: string } = {
		fantasy: 'Fantasy',
		scifi: 'Sci-Fi',
		steampunk: 'Steampunk',
		postapocalyptic: 'Post-Apocalyptic',
	};
	return typeMap[worldType] || 'Fantasy';
}
