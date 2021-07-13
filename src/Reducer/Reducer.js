import {ACTIONS} from './Actions';
export default function loginReducer(state,action) {
    switch (action.type){
       
        case ACTIONS.FIELD:{
            return{
                ...state,
                [action.field]: action.value 
            }
        }
        case ACTIONS.LOADING: {
            return {
                ...state,
                isloading: true, 
            }
        }
        case ACTIONS.SUCCESS: {
            return {
                ...state,
                isloading: false, 
                isLoggedin: true,
            }
        }
        case ACTIONS.ERROR: {
            return {
                ...state,
                // error : "Invalid Credentials",
                isloading: false,
                username: '', password:'', confirmPassword:''
            }
        }
        case ACTIONS.PASSCONFIRM: {
            return {
                ...state,
                // error : "Invalid Credentials",
                isloading: false,
                username: state.username, password:'', confirmPassword:''
            }
        }
        case ACTIONS.LOGGEDOUT: {
            return {
                ...state,
                username: '', password:'',confirmPassword:'',
                isLoggedin: false,
                error:''
            }
        }
        default:
            return state
        }
        
    }