import {initMixin} from './init.js';

function Due(options) {
    this._init(options); //尽量保证外界函数的干净利索 所以就引用一下init方法
}
initMixin(Due);

export default Due;