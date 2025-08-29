// Tipos para os dados da API do Clash of Clans

export interface ClanLocation {
  id: number;
  name: string;
  isCountry: boolean;
  countryCode: string;
}

export interface BadgeUrls {
  small: string;
  large: string;
  medium: string;
}

export interface League {
  id: number;
  name: string;
  iconUrls: BadgeUrls;
}

export interface ClanMember {
  tag: string;
  name: string;
  role: string;
  expLevel: number;
  league: League;
  trophies: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  builderBaseTrophies: number;
  builderBaseLeague: League;
}

export interface ClanData {
  tag: string;
  name: string;
  type: string;
  description: string;
  location: ClanLocation;
  isFamilyFriendly: boolean;
  badgeUrls: BadgeUrls;
  clanLevel: number;
  clanPoints: number;
  clanBuilderBasePoints: number;
  clanCapitalPoints: number;
  capitalLeague: League;
  members: number;
  memberList: ClanMember[];
  labels: Array<{
    id: number;
    name: string;
    iconUrls: BadgeUrls;
  }>;
  requiredTrophies: number;
  donationsPerWeek: number;
  clanCapitalHallLevel: number;
  warFrequency: string;
  warWinStreak: number;
  warWins: number;
  warTies?: number;
  warLosses?: number;
  isWarLogPublic: boolean;
  warLeague: League;
  chatLanguage: {
    id: number;
    name: string;
    languageCode: string;
  };
}

export interface MembersResponse {
  memberList: ClanMember[];
  memberCount: number;
}

export interface WarClan {
  tag: string;
  name: string;
  badgeUrls: BadgeUrls;
  clanLevel: number;
  attacks: number;
  stars: number;
  destructionPercentage: number;
  members: Array<{
    tag: string;
    name: string;
    townhallLevel: number;
    mapPosition: number;
    attacks: Array<{
      attackerTag: string;
      defenderTag: string;
      stars: number;
      destructionPercentage: number;
      order: number;
    }>;
    bestOpponentAttack?: {
      attackerTag: string;
      defenderTag: string;
      stars: number;
      destructionPercentage: number;
      order: number;
    };
  }>;
}

export interface WarData {
  state: string;
  teamSize: number;
  attacksPerMember: number;
  preparationStartTime: string;
  startTime: string;
  endTime: string;
  clan: WarClan;
  opponent: WarClan;
}

export interface NoWarData {
  state: 'notInWar';
  reason: string;
  message: string;
}

export interface PrivateWarData {
  state: 'warPrivate';
  reason: string;
  message: string;
  hasWarParticipation: boolean;
  clanInfo: {
    name: string;
    level: number;
    members: number;
  };
}

export type WarResponse = WarData | NoWarData | PrivateWarData;

// Tipos para Player Data
export interface PlayerData {
  tag: string;
  name: string;
  townHallLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  donations: number;
  donationsReceived: number;
  attackWins: number;
  defenseWins: number;
  warStars: number;
  clan?: {
    tag: string;
    name: string;
    clanLevel: number;
    badgeUrls: BadgeUrls;
  };
  league?: League;
  role?: string;
  builderBaseTrophies: number;
  builderBaseLeague?: League;
  achievements: Achievement[];
  playerHouse: {
    elements: unknown[];
  };
  labels: Label[];
  troops: Troop[];
  heroes: Hero[];
  spells: Spell[];
}

export interface Achievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo: string | null;
  village: string;
}

export interface Troop {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface Hero {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
  equipment?: Equipment[];
}

export interface Equipment {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface Spell {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface Label {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
  };
}

// Tipos para Localizações
export interface LocationData {
  items: Location[];
}

export interface Location {
  id: number;
  name: string;
  isCountry: boolean;
  countryCode?: string;
}

export interface RaidSeason {
  state: string;
  startTime: string;
  endTime: string;
  capitalTotalLoot: number;
  raidsCompleted: number;
  totalAttacks: number;
  enemyDistrictsDestroyed: number;
  offensiveReward: number;
  defensiveReward: number;
  members: Array<{
    tag: string;
    name: string;
    attacks: number;
    attackLimit: number;
    bonusAttackLimit: number;
    capitalResourcesLooted: number;
  }>;
}

export interface RaidsData {
  items: RaidSeason[];
}
