import { observable, action } from "mobx";

export class AppStore {

    @observable appName = 'Password Generator';
    @observable skipped = false;
    @observable currentUser = '';
    @action setApprName(data) {
        this.appName = data;
    }

    @action setSkipped(data) {
        this.skipped = data;
    }

    @action setCurrentUser(user) {
        this.currentUser = user;
    }
}