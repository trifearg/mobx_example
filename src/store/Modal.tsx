import { makeAutoObservable } from 'mobx';

class Modal {
    isOpen: boolean = false;
    isOpenDrawer: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    close = () => {
        this.isOpen = false;
    }

    open = () => {
        this.isOpen = true;
    }

    openDrawer = () => {
        this.isOpenDrawer = true;
    }

    closeDrawer = () => {
        this.isOpenDrawer = false;
    }
}

export default new Modal();