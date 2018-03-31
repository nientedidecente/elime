import {BattleField, Deck, PLAYERS, SLOTS} from "../../../libs/models";
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
    battleField.playCard(PLAYERS.TWO, deck.draw(), SLOTS.LEFT);
    expect(battleField.isFull()).toBe(false);

    battleField.playCard(PLAYERS.ONE, deck.draw(), SLOTS.CENTER);
    battleField.playCard(PLAYERS.TWO, deck.draw(), SLOTS.CENTER);
    expect(battleField.isFull()).toBe(false);

    battleField.playCard(PLAYERS.ONE, deck.draw(), SLOTS.RIGHT);
    battleField.playCard(PLAYERS.TWO, deck.draw(), SLOTS.RIGHT);
    expect(battleField.isFull()).toBe(true);
});