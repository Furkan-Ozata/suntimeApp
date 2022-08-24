import {observable} from 'mobx';

class MainStore{
  @observable time = []
  @observable afterPrayerList = []


}


const store = new MainStore();

export default store;
