import { requestWithActionType } from "@/common/XHRClient";
import { PhotoActionType } from "@/redux/action/rembg/PhotoAction";

export function uploadBackgroundImage(params: any){
    const config = {
        method: 'post',
        url: '/tool/photo/rembg',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(params)
    };
    const actionTypeString: string = PhotoActionType[PhotoActionType.REM_BACKGROUND];
    return requestWithActionType(config, actionTypeString);
}

