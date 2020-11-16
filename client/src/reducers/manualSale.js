import { 
    GET_PRODUCTS, 
    GET_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT,
    PRODUCT_ERROR,
    PUBLISH_PRODUCT,
    // GET_DATA
} from '../constants/constants';

const initialState = {
    products: [],
    product: null,
    error: {},
    loading: true
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_PRODUCTS:
        // case GET_DATA:
            return {
                ...state,
                products: payload,
                loading: false,
            };
        case GET_PRODUCT: 
            return {
                ...state,
                product: payload,
                loading: false
            };
        case ADD_PRODUCT:
            return {
                ...state, 
                products: [payload, ...state.products],
                loading: false
            };
        case EDIT_PRODUCT:
        case PUBLISH_PRODUCT:
            return {
                ...state, 
                products: state.products.filter((product) => product.id !== payload),
                loading: false
            };
        case DELETE_PRODUCT:
            return {
                ...state, 
                products: state.products.filter((product) => product.id !== payload),
                loading: false
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };   
        default:
            return state
    }
}