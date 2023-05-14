import {useState, useMemo} from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity, TextInput } from "react-native";

export default function Todo({ todo, erase, edit }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo.name)

    const memoizedIsChecked = useMemo(() => isChecked, [isChecked]);

    const handleToggle = () => {
        return setIsChecked((isChecked) => !isChecked);
    }

    const editTodo = (data) => {
        setIsEdit(prevState => !prevState);
        if (isEdit) {
            const todo = {
                id: data.id,
                isChecked: isChecked,
                name: editedTodo,
            };
            edit(todo);
        }
    };


    return (
        <View style={[isChecked ? s.todoDone : s.todo]}>
                <TouchableOpacity 
                    style={[isChecked ? s.checkboxWrapDone : s.checkboxWrap]}
                    disabled={false}
                    value={memoizedIsChecked}
                onPress={handleToggle} />
            {isEdit ? (
                <TextInput
                    style={s.input}
                    onChangeText={value => setEditedTodo(value)}
                    value={editedTodo}
                    autoCorrect={false}
                    autoCapitalize='none'
                />) : (
                <>
                <Text style={s.text}>{todo.name}</Text>
                </>
            )}
            <View style={s.buttonBlock}>
                <Pressable style={s.button} onPress={() => editTodo(todo)}>
                    <Text style={s.buttonText}>Edit</Text>
                </Pressable>
                <Pressable style={s.button} onPress={() => erase(todo.id)}>
                    <Text style={s.buttonText}>X</Text>
                </Pressable>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    todo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#3949ab',
        backgroundColor: 'white',
        borderRadius: 4,
        marginBottom: 10
    },

    todoDone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderRadius: 4,
        marginBottom: 10
    },

    checkboxWrap: {
        alignItems: 'center',
        border: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: '#3949ab',
        backgroundColor: '#3949ab',
        width: 30,
        height: 30,
        margin: 5,
    },

    checkboxWrapDone: {
        alignItems: 'center',
        border: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        // borderColor: '#3949ab',
        backgroundColor: 'red',
        width: 30,
        height: 30,
        margin: 5,
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    input: {
        width: "70%",
        height: 50,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab', 
        padding: 10,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: 40,
        height: 30,
        borderRadius: 4,
        backgroundColor: '#ececec',
        color: 'red',
        margin: 5,
    },

    buttonBlock: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: "auto",

    },

    buttonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: "bold",
    }
})