import {Card, TYPES} from "../../../libs/models";
import {cardGenerator} from "../../../libs/generators/cardGenerator";

test('a card can be instantiated correctly', () => {
    const card = new Card({name: '', type: TYPES.ROCK});
    expect(card).toBeTruthy();
});

test('generator forces fields', () => {
    const card = cardGenerator.generateOne({type: TYPES.PAPER, name: 'banana'});
    expect(card.type).toBe(TYPES.PAPER);
    expect(card.name).toBe('banana');
});