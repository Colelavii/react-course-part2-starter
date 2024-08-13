import "./App.css";
import PostList from "./react-query/PostList";
import PostListPagi from "./react-query/PostListPagi";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}

export default App;
