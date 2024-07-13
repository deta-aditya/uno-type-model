
// ======================
// Start Game
// ======================

// ----------------------
// Main Workflow
// ----------------------

export type StartGame = (game: UnstartedGame) => PlayingGame;

// ----------------------
// Sub-Workflows & States
// ----------------------

type UnstartedGame = {
  deck: FreshDeck;
  players: PlayerCandidates;
}

export type ShuffleDeck = (game: UnstartedGame) => ShuffledUnstartedGame;

type ShuffledUnstartedGame = {
  deck: ShuffledDeck;
  players: PlayerCandidates;
};

export type DealCards = (game: ShuffledUnstartedGame) => DealtUnstartedGame;

type DealtUnstartedGame = {
  deck: DealtDeck;
  players: PlayersInWaiting;
};

export type InitiateStartingCard = (game: DealtUnstartedGame) => InitiatedUnstartedGame;

type InitiatedUnstartedGame = {
  deck: PlayableDeck;
  discardPile: DiscardPile;
  players: PlayersInWaiting;
};

export type DetermineFirstPlayer = (game: InitiatedUnstartedGame) => PlayingGame;

type PlayingGame = {
  deck: PlayableDeck;
  discardPile: DiscardPile;
  playerInTurn: PlayerInTurn;
  playersInWaiting: PlayersInWaiting;
};


// ======================
// Play Card
// ======================

// ----------------------
// Main Workflow
// ----------------------

export type PlayCard = (game: PlayingGame, playableCard: PlayableCard) => PlayCardResult;

// ----------------------
// Sub-Workflows & States
// ----------------------

export type UnhandCard = (game: PlayingGame, playableCard: PlayableCard) => PossiblyWonGame;

type PossiblyWonGame = PlayingGame;

export type CheckIfGameWon = (game: PossiblyWonGame) => CheckIfGameWonResult;

type CheckIfGameWonResult =
  | { kind: 'continue-playing', value: NoCurrentPlayerGame }
  | { kind: 'finish-playing', value: FinishedGame };

type NoCurrentPlayerGame = {
  deck: PlayableDeck;
  discardPile: DiscardPile;
  playersInWaiting: PlayersInWaiting;
};

type FinishedGame = {
  deck: PlayableDeck;
  discardPile: DiscardPile;
  wininngPlayer: PlayerName;
  losingPlayer: LostPlayers;
};

export type NextTurn = (game: NoCurrentPlayerGame) => PlayingGame;

type PlayCardResult =
  | { kind: 'continue-playing', value: PlayingGame }
  | { kind: 'finish-playing', value: FinishedGame }; 

// ======================
// Draw Card
// ======================

// ----------------------
// Main Workflow
// ----------------------

export type DrawCard = (game: PlayingGame) => PlayingGame;

// ----------------------
// Sub-Workflows & States
// ----------------------

export type DrawFromDeck = (game: PlayingGame) => NoCurrentPlayerGame;

// ======================
// Other States
// ======================

type FreshDeck = Array<Card>;

type ShuffledDeck = Array<Card>;

type DealtDeck = Array<Card>;

type PlayableDeck = Array<Card>;

type DiscardPile = Array<Card>;

type Card = {
  symbol: CardSymbol;
  color: CardColor;
};

type CardSymbol = 
  | { kind: 'numbers', value: number }
  | { kind: 'skip' }
  | { kind: 'reverse' }
  | { kind: 'draw-two' };

type CardColor =
  | { kind: 'blue' }
  | { kind: 'green' }
  | { kind: 'yellow' }
  | { kind: 'red' };

type PlayerCandidates = Array<PlayerName>;

type PlayerName = string;

type Player = {
  name: PlayerName; 
  hand: PlayerHand;
};

type PlayerHand = Array<Card>;

type PlayerInTurn = {
  name: PlayerName;
  playableHand: PlayableHand;
  unplayableHand: UnplayableHand;
}

type PlayableHand = Array<PlayableCard>;

type PlayableCard = Card;

type UnplayableHand = Array<Card>;

type PlayersInWaiting = Array<Player>;

type LostPlayers = Array<Player>;
