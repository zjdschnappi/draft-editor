const todos = (state = [], action) => {
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
    case 'DELETE_TODO':
      return state.filter((item) => item.id !== action.id);
    case 'EDIT_TODO':
      return state.map((todo) => (todo.id === action.id ? { ...todo, editVisible: !todo.editVisible } : todo));
    case 'FINISH_EDIT_TODO':
      return state.map(
        (todo) =>
          todo.id === action.id ? { ...todo, editVisible: false, value: action.value } : { ...todo, editVisible: false }
      );
    default:
      return state;
  }
};

export default todos;
