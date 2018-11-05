const todos = (state, action) => {
  if (!state)
    return {
      todoList: []
    };
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          ...action.payload
        }
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo));
    default:
      return state;
  }
};

export default todos;
