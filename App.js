import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { isEqual } from "lodash";
import { nanoid } from "nanoid/non-secure";
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AddTodo from "./src/components/AddTodo/AddTodo";
import AppBar from "./src/components/AppBar/AppBar";
import Todo from "./src/components/Todo/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    if (!title) {
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
    setTodos((state) =>
      state.map((todo) => {
        if (todo.id === data.id) {
          return data;
        }
        return todo;
      })
    );
  };

  const eraseTodo = (data) => {
    setTodos((state) => state.filter((todo) => todo.id !== data));
  };

  return (
    <View
      style={{
        postion: "absolute",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <AppBar title={"ReactNative ToDo"} />
      <View style={s.container}>
        <AddTodo onSubmit={addTodo} />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <FlatList
              onEndReachedThreshold={0.5}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              data={todos}
              renderItem={(todo) => (
                <Todo todo={todo} erase={eraseTodo} edit={editTodo}>
                  {todo.item.name}
                </Todo>
              )}
              keyExtractor={(todo) => todo.id}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: "auto",
  },
});
