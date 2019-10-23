
import EventBus from 'src/assets/libs/simpleEventBus.js'


export default ({ app, router, store, Vue }) => {
    Vue.prototype.SimpleEventBus = EventBus;
  }