import { combineReducers } from 'redux';
import user from '@/redux/reducer/user/UserReducer';


const rootReducer = combineReducers({
    user
})

export default rootReducer;