// ======================
// Workflow Model
// ======================

type StartGame = (game: UnstartedGame) => PlayingGame;

type PlayGame = (game: PlayingGame) => PlayGameResult;

// ======================
// State Model
// ======================

type UnstartedGame = {
  deck: FreshDeck;
  players: PlayerCandidates;
};

type FreshDeck = Array<Card>;

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

type PlayingGame = {
  deck: ShuffledDeck;
  discardPile: DiscardPile;
  playerInTurn: Player;
  playersInWaiting: Array<Player>;
};

type ShuffledDeck = Array<Card>;

type DiscardPile = Array<Card>;

type Player = {
  name: PlayerName; 
  hand: PlayerHand;
};

type PlayerHand = Array<Card>;

type PlayGameResult =
  | { kind: 'continue-playing', value: PlayingGame }
  | { kind: 'finish-playing', value: FinishedGame }; 

type FinishedGame = {
  deck: ShuffledDeck;
  discardPile: DiscardPile;
  winningPlayer: PlayerName;
  losingPlayers: Array<Player>;
};
