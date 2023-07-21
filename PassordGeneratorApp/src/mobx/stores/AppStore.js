import { observable, action } from "mobx";

export class AppStore {

    @observable appName = 'Password Generator';
    @observable skipped = false;
    @action setApprName(data){
        this.appName = data;
    }

    @action setSkipped(data){
        this.skipped = data;
    }



}