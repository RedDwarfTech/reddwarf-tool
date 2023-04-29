
const initState = {
    formText:""
};

const PayReducer = (state=initState, action:any) => {
    switch (action.type) {
        case "CREATE_ORDER":
            return {
                ...state,
                formText: action.data 
            };
        default:
            break;
    }
    return state;
};

export default PayReducer;


