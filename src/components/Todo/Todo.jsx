import {useState, useMemo} from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";

export default function Todo({ todo, erase }) {
    const [checked, setChecked] = useState(false);

    const memoizedIsChecked = useMemo(() => checked, [checked]);

    const handleToggle = () => {
        return setChecked((checked) => !checked);
    }

    return (
        <View style={[checked ? s.todoDone : s.todo]}>
                <TouchableOpacity 
                    style={[checked ? s.checkboxWrapDone : s.checkboxWrap]}
                    disabled={false}
                    value={memoizedIsChecked}
                    onPress={handleToggle} />
            <Text style={s.text}>{todo.name}</Text>
            <Pressable style={s.deleteButton} onPress={() => erase(todo.id)}>
                <Text style={s.buttonText}>Delete</Text>
            </Pressable>
        </View>
    )
}

const s = StyleSheet.create({
    todo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
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

    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: 95,
        height: 30,
        borderRadius: 4,
        backgroundColor: '#ececec',
        color: 'red',

    },
    buttonText: {
        color: 'red',
        fontSize: 16,
    }
})