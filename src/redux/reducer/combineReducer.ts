import { combineReducers } from 'redux';
import user from '@/redux/reducer/user/UserReducer';
import photo from '@/redux/reducer/photo/PhotoReducer';
import iapproducts from '@/redux/reducer/iapproduct/IapProductReducer';
import pay from '@/redux/reducer/pay/PayReducer';

const rootReducer = combineReducers({
    user,
    photo,
    iapproducts,
    pay
})

export default rootReducer;