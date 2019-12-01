import { BattleField, Card, Deck, PLAYERS, SLOTS, TYPES } from "../../../libs/models";
import { cardGenerator } from "../../../libs/generators/cardGenerator";
import { CARDS_IN_DECK } from "../../../config";

test('battle round test', () => {
    const cards = cardGenerator.generate(CARDS_IN_DECK);
    const deck = new Deck(cards);
    expect(deck.cards.length).toBe(CARDS_IN_DECK);

    deck.shuffle();

    const playerOne = { name: 'uno', deck };
    const playerTwo = { name: 'due', deck };

    const battleField = new BattleField(playerOne, playerTwo);
    battleField.forceTurn(PLAYERS.ONE);
    battleField.playCard(PLAYERS.ONE, deck.draw(), SLOTS.LEFT);
    battleField.playCard(PLAYERS.TWO, deck.draw(), SLOTS.CENTER);
    expect(battleField.isFull()).toBe(false);

    battleField.playCard(PLAYERS.ONE, deck.draw(), SLOTS.CENTER);
    battleField.playCard(PLAYERS.TWO, deck.draw(), SLOTS.LEFT);
    expect(battleField.isFull()).toBe(false);

    battleField.playCard(PLAYERS.ONE, deck.draw(), SLOTS.RIGHT);
    battleField.playCard(PLAYERS.TWO, deck.draw(), SLOTS.RIGHT);
    expect(battleField.isFull()).toBe(true);
});


test('if draw, cost will be carried next turn', () => {
    const cards = cardGenerator.generate(CARDS_IN_DECK);
    const deck = new Deck(cards);
    const playerOne = { name: 'uno', deck };
    const playerTwo = { name: 'due', deck };
    const cost = 10;
    const battleField = new BattleField(playerOne, playerTwo);
    const fire = new Card({ name: '', type: TYPES.FIRE, cost });
    const water = new Card({ name: '', type: TYPES.WATER, cost });
    expect(battleField.players[PLAYERS.ONE].discardPile.length).toBe(0);
    expect(battleField.players[PLAYERS.TWO].discardPile.length).toBe(0);
    battleField.forceTurn(PLAYERS.ONE);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.LEFT);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.CENTER);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.CENTER);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.LEFT);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.RIGHT);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.RIGHT);
    let result = battleField.resolve();
    expect(result).toBe(false);
    expect(battleField.isOver()).toBe(result);
    expect(battleField.players[PLAYERS.ONE].discardPile.length).toBe(0);
    expect(battleField.players[PLAYERS.TWO].discardPile.length).toBe(0);

    battleField.playCard(PLAYERS.ONE, fire, SLOTS.LEFT);
    battleField.playCard(PLAYERS.TWO, water, SLOTS.CENTER);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.CENTER);
    battleField.playCard(PLAYERS.TWO, water, SLOTS.LEFT);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.RIGHT);
    battleField.playCard(PLAYERS.TWO, water, SLOTS.RIGHT);
    result = battleField.resolve();
    expect(result).toBe(true);
    expect(battleField.isOver()).toBe(result);
    expect(battleField.result().winner).toBe(PLAYERS.TWO);
    expect(battleField.players[PLAYERS.ONE].discardPile.length).toBe(3); // lost three slots
    expect(battleField.players[PLAYERS.TWO].discardPile.length).toBe(0); // won three slots
    expect(battleField.players[PLAYERS.TWO].hand.length).toBe(3); // cards return to hand
    expect(battleField.status()[PLAYERS.ONE].life).toBe(-40);
});


test('set hands will get the right number of cards', () => {
    const deckOne = new Deck(cardGenerator.generate());
    const playerOne = { life: 20, deck: deckOne };
    const deckTwo = new Deck(cardGenerator.generate());
    const playerTwo = { life: 20, deck: deckTwo };
    const battleField = new BattleField(playerOne, playerTwo);
    battleField.setHand(PLAYERS.ONE);
    battleField.setHand(PLAYERS.TWO);

    expect(battleField.players[PLAYERS.ONE].hand.length).toBe(4);
    expect(battleField.players[PLAYERS.TWO].hand.length).toBe(4);
});

test('it can be serialize/deserialized to/from a plain json object', () => {
    const cards = cardGenerator.generate(CARDS_IN_DECK);
    const deck = new Deck(cards);
    const playerOne = { name: 'uno', deck };
    const playerTwo = { name: 'due', deck };
    const cost = 10;
    const battleField = new BattleField(playerOne, playerTwo);
    const fire = new Card({ name: '', type: TYPES.FIRE, cost });
    const water = new Card({ name: '', type: TYPES.WATER, cost });
    expect(battleField.players[PLAYERS.ONE].discardPile.length).toBe(0);
    expect(battleField.players[PLAYERS.TWO].discardPile.length).toBe(0);
    battleField.forceTurn(PLAYERS.ONE);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.LEFT);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.CENTER);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.CENTER);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.LEFT);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.RIGHT);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.RIGHT);
    let result = battleField.resolve();
    expect(result).toBe(false);
    expect(battleField.isOver()).toBe(result);
    expect(battleField.players[PLAYERS.ONE].discardPile.length).toBe(0);
    expect(battleField.players[PLAYERS.TWO].discardPile.length).toBe(0);

    const plainJs = battleField.toJs();
    const newBattlefield = BattleField.fromJs(plainJs);
    newBattlefield.playCard(PLAYERS.ONE, fire, SLOTS.LEFT);
    newBattlefield.playCard(PLAYERS.TWO, water, SLOTS.CENTER);
    newBattlefield.playCard(PLAYERS.ONE, fire, SLOTS.CENTER);
    newBattlefield.playCard(PLAYERS.TWO, water, SLOTS.LEFT);
    newBattlefield.playCard(PLAYERS.ONE, fire, SLOTS.RIGHT);
    newBattlefield.playCard(PLAYERS.TWO, water, SLOTS.RIGHT);
    result = newBattlefield.resolve();
    expect(result).toBe(true);
    expect(newBattlefield.isOver()).toBe(result);
    expect(newBattlefield.result().winner).toBe(PLAYERS.TWO);
    expect(newBattlefield.players[PLAYERS.ONE].discardPile.length).toBe(3); // lost three slots
    expect(newBattlefield.players[PLAYERS.TWO].discardPile.length).toBe(0); // won three slots
    expect(newBattlefield.players[PLAYERS.TWO].hand.length).toBe(3); // cards return to hand
    expect(newBattlefield.status()[PLAYERS.ONE].life).toBe(-40);
});