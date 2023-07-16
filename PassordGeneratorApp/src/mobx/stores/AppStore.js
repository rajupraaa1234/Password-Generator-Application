import { observable, action } from "mobx";

export class AppStore {

    @observable appName = 'Password Generator';
    @action setApprName(data){
        this.appName = data;
    }

}