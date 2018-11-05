import React from 'react';
import Todo from 'components/todo';
class Todolist extends React.Component {
  render() {
    const { todoList, closeHandle, editClickHandle, blurHandler, checkToggle, showType } = this.props;
    return (
      <ul className="todo-list">
        {todoList.map((item, index) => {
          let style = { display: 'none' };
          if (
            (item.completed && showType === 'completed') ||
            (!item.completed && showType === 'active') ||
            showType === 'all'
          ) {
            style = { display: 'inline-block' };
          }
          return (
            <Todo
              key={index}
              id={item.id}
              style={style}
              completed={item.completed}
              editVisible={item.editVisible}
              value={item.value}
              closeHandle={closeHandle}
              editClickHandle={editClickHandle}
              blurHandler={blurHandler}
              checkToggle={checkToggle}
            />
          );
        })}
      </ul>
    );
  }
}
export default Todolist;
