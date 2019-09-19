const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        mylist: [...state.mylist, action.payload],
      };
    case 'UNSET_FAVORITE':
      return {
        ...state,
        mylist: state.mylist.filter((items) => items._id !== action.payload),
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_VIDEO':
      return {
        ...state,
        playing: state.trends.find((items) => items.id === action.payload) ||
        state.originals.find((items) => items.id === action.payload) ||
        [],
      };
    case 'SEARCH_VIDEO':
      if (action.payload === '') {
        return {
          ...state,
          search: [],
        };
      }
      return {
        ...state,
        search: state.content.filter((items) => items.title.toLowerCase().includes(action.payload.toLowerCase())) ||
          [],
      };

    default:
      return state;
  }
};

export default reducer;
