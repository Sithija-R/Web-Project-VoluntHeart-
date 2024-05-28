import { CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, FIND_POST_BY_CONTENT_FAILURE, FIND_POST_BY_CONTENT_REQUEST, FIND_POST_BY_CONTENT_SUCCESS, FIND_POST_BY_ID_FAILURE, FIND_POST_BY_ID_REQUEST, FIND_POST_BY_ID_SUCCESS, GET_ALL_POST_SUCCESS, GET_LIKED_POST_FAILURE, GET_LIKED_POST_REQUEST, GET_LIKED_POST_SUCCESS, GET_USERS_ALL_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, USER_LOGOUT } from "./ActionType";

const initialState={
    loading:false,
    data:null,
    error:null,
    posts:[],
    usersPosts:[],
    likedPosts:[],
    searchPost:null

}
export const postReducer = (state=initialState,action)=>{

    switch (action.type) {

        case CREATE_POST_REQUEST:
        case DELETE_POST_REQUEST:
        case GET_LIKED_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case FIND_POST_BY_CONTENT_REQUEST:
        case FIND_POST_BY_ID_REQUEST:
            return{...state,loading:true,error:null}


        case CREATE_POST_FAILURE:
        case DELETE_POST_FAILURE:
        case GET_LIKED_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case FIND_POST_BY_CONTENT_FAILURE:
        case FIND_POST_BY_ID_FAILURE:
            return{...state,loading:false,error:action.payload}

        case CREATE_POST_SUCCESS:
            return{...state,loading:false,error:null,posts:[action.payload, ...state.posts]};

        case GET_ALL_POST_SUCCESS:
        case FIND_POST_BY_CONTENT_SUCCESS:
            return{...state,loading:false,error:null,posts:action.payload};

        case GET_USERS_ALL_POST_SUCCESS:
            return{...state,loading:false,error:null,usersPosts:action.payload};

        case GET_LIKED_POST_SUCCESS:
            return{...state,loading:false,error:null,likedPosts:action.payload, };

        case LIKE_POST_SUCCESS:
            return{...state,loading:false,error:null,like:action.payload };
        
        case FIND_POST_BY_ID_SUCCESS:
            return{...state,loading:false,error:null,searchPost:action.payload };

        case DELETE_POST_SUCCESS:
            return{...state,loading:false,error:null,posts:state.posts.filter((post)=>post.id!==action.payload) };

      

        
        default:
            return state;
    }
}