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
    let result = null;
    let finalStatus = null;
    let index = 1;
    console.log(`dio`);
    while (!battleField.isOver() || index < 5) {
        console.log(`round ${index}: isFull ${!battleField.isFull()}`);
        while (!battleField.isFull()) {
            Object.values(SLOTS).forEach(s => {
                Object.values(PLAYERS).forEach(p => {
                    const card = deck.draw();
                    console.log(`${p} plays ${card} in  ${s}`);
                    battleField.playCard(p, card, s);
                });
            });
        }
        result = battleField.resolve();
        finalStatus = battleField.status();
        console.log(result, status);
        index++;
    }
    console.log('FinalResult', result);
});