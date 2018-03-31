import {Deck} from "../../../libs/models/index";
import {cardGenerator} from "../../../libs/generators/cardGenerator";

test('a deck can be instantiated correctly', () => {
    const card = new Deck(
        cardGenerator.generate()
    );
    expect(card).toBeTruthy();
});