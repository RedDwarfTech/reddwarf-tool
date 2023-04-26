import { requestWithActionType } from "@/common/XHRClient";
import { PhotoActionType } from "@/redux/action/rembg/PhotoAction";

export function uploadBackgroundImage(params: any){
    const config = {
        method: 'post',
        url: '/post/user/current-user',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(params)
    };
    const actionTypeString: string = PhotoActionType[PhotoActionType.REM_BACKGROUND];
    return requestWithActionType(config, actionTypeString);
}

