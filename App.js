import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { isEqual } from "lodash";
import { nanoid } from "nanoid/non-secure";
import { StyleSheet, View, FlatList } from "react-native";
import AddTodo from "./src/components/AddTodo/AddTodo";
import AppBar from "./src/components/AppBar/AppBar";
import Todo from "./src/components/Todo/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    if (!title) {
      alert("Русский корабль, иди нахуй!");
      setInput("");
    }
    if (!todos.some((todo) => isEqual(title, todo.name))) {
      const newTodo = {
        id: nanoid(4),
        isChecked: false,
        name: title,
      };
      setTodos((prevState) => [...prevState, newTodo]);
    } else {
      return alert("Element with this name already exists..");
    }
  };

  const editTodo = (data) => {
    console.log(data);
    setTodos((state) =>
      state.map((todo) => {
        if (
          todo.id === data.id &&
          !todos.some((todo) => isEqual(data.name, todo.name))
        ) {
          return data;
        }
        alert("Element with this name already exists..");
        return todo;
      })
    );
  };

  const eraseTodo = (data) => {
    setTodos((state) => state.filter((todo) => todo.id !== data));
  };

  return (
    <View>
      <AppBar title={"ToDo"} />
      <View style={s.container}>
        <AddTodo onSubmit={addTodo} />
        <FlatList
          data={todos}
          renderItem={(todo) => (
            <Todo todo={todo} erase={eraseTodo} edit={editTodo}>
              {todo.item.name}
            </Todo>
          )}
          keyExtractor={(todo) => todo.id}
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: "auto",
  },
});
