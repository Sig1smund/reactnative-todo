import React, {useState} from "react";
import { View, StyleSheet, TextInput, Pressable, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";

export default function AddTodo({ onSubmit }) {
    const [input, setInput] = useState('');
    
    const handleAddTodo = () => {
        if (!input.trim()) {
            alert('Type something to create todo element')
            setInput('')
        }
        if (input.trim()) {
            onSubmit(input);
            setInput('')
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={s.block}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <TextInput style={s.input}
                        placeholder='Type something..'
                        onChangeText={value => setInput(value)}
                        value={input}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </KeyboardAvoidingView>
                <Pressable style={s.addButton} onPress={handleAddTodo}>
                    <Text style={s.addButtonText}>Add</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}

const s = StyleSheet.create({
    block: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom: 15
    },
    
    input: {
        width: "70%",
        height: 50,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab', 
        padding: 10,
        margin: 'auto'
    },

    addButton: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: 100,
        height: 50,
        borderRadius: 4,
        backgroundColor: '#ececec',
        marginLeft: 'auto',
    },
    addButtonText: {
        color: 'blue',
        fontSize: 16,
    }
})