import {combineReducers} from 'redux';
import manualSale from './/manualSale';
import alert from './alert';
import realtime from './realtime'
import notification from './notification';

export default combineReducers({
    manualSale,
    alert,
    realtime,
    notification
})