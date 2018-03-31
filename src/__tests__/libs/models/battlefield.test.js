import {BattleField, Card, Deck, PLAYERS, SLOTS, TYPES} from "../../../libs/models";
import {cardGenerator} from "../../../libs/generators/cardGenerator";
import {CARDS_IN_DECK} from "../../../config";

test('battle round test', () => {
    const cards = cardGenerator.generate(CARDS_IN_DECK);
    const deck = new Deck(cards);
    expect(deck.cards.length).toBe(CARDS_IN_DECK);

    deck.shuffle();

    const playerOne = {life: 20};
    const playerTwo = {life: 20};

    const battleField = new BattleField(playerOne, playerTwo);
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
    const playerOne = {life: 20};
    const playerTwo = {life: 20};
    const cost = 10;
    const battleField = new BattleField(playerOne, playerTwo);
    const fire = new Card({name: '', type: TYPES.FIRE, cost});
    const water = new Card({name: '', type: TYPES.WATER, cost});

    battleField.playCard(PLAYERS.ONE, fire, SLOTS.LEFT);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.CENTER);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.CENTER);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.LEFT);
    battleField.playCard(PLAYERS.ONE, fire, SLOTS.RIGHT);
    battleField.playCard(PLAYERS.TWO, fire, SLOTS.RIGHT);
    let result = battleField.resolve();
    expect(result).toBe(false);
    expect(battleField.isOver()).toBe(result);

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
    expect(battleField.status()[PLAYERS.ONE]).toBe(-40);
});