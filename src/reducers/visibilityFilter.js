const visibilityFilter = (state = {}, action) => {
  switch (action.type) {
    case 'showAll':
      return { ...state, ...action.payload };
    case 'showCompleted':
      return { ...state, ...action.payload };
    case 'showActive':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default visibilityFilter;
