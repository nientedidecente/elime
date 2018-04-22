import {BattleField, Deck, PLAYERS} from "../../../libs/models";
import {cardGenerator} from "../../../libs/generators/cardGenerator";

export const UPDATE_BATTLEFIELD = 'update_battlefield';


export const initGame = () => {
    const playersDeck = new Deck(cardGenerator.generate());
    const cpusDeck = new Deck(cardGenerator.generate());
    const player = {name: 'Human', life: 20, deck: playersDeck};
    const cpu = {name: 'Computer', life: 20, deck: cpusDeck};
    const battlefield = new BattleField(player, cpu);

    battlefield.setHand(PLAYERS.ONE);
    battlefield.setHand(PLAYERS.TWO);

    return {
        type: UPDATE_BATTLEFIELD,
        data: {
            battlefield
        }
    }
};