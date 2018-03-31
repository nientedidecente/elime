import {randomizer, range} from 'uvk';
import {Card, CARD_COSTS, TYPES} from "../models";
import {CARDS_IN_DECK} from "../../config";

export const cardGenerator = {
    generateOne(forcedFields = {}) {
        const type = randomizer.pickOne(Object.values(TYPES));
        const cost = randomizer.int(CARD_COSTS.LOW, CARD_COSTS.HIGH);
        const name = `${type}_${cost}`;
        return new Card({
            name,
            cost,
            type,
            ...forcedFields
        });
    },

    generate(number = CARDS_IN_DECK, forcedField = {}) {
        return range(number).map(() => this.generateOne(forcedField));
    }
};