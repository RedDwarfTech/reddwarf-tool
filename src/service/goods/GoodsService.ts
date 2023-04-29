import { requestWithAction } from '@/common/XHRClient';
import { getIapProductsAction } from '@/redux/action/iapproduct/IapProductAction';

export function doGetIapProduct() {
    const config = {
        method: 'get',
        url: '/post/product/v1/list',
        headers: {'Content-Type': 'application/json'}
    };
    return requestWithAction(config, getIapProductsAction);
}
