import { action, decorate, computed } from 'mobx';

export class Store {
    apikey:string = '';
    player={
        id: '',
        name: ''
    };
    boards:{id:string; players: number}[] = [];
   

    get apikeyValue() {
        return this.apikey;
    }

    get apiPerson() {
        return this.player;
    }

    get allBoards() {
        return this.boards;
    }

    setApikey(apikey:string) {
        this.apikey = apikey;
    }

    personValue(retrievedPlayer: {id:string, name:string}){
        this.player = retrievedPlayer 
    }

    addBoard(boards:{id:string, players: number}[]) {
        this.boards = boards;
    }
}

decorate(Store, {
    apiPerson: computed,
    allBoards: computed,
    apikeyValue: computed,
    setApikey: action,
    personValue: action,
    addBoard: action,
})