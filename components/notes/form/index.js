import React, { useState, useEffect } from "react";
import { TextInput, View, Pressable, StyleSheet, Text } from "react-native";

const Form = ({ onSuccess, onFail, text, id, onCancelPress }) => {
    const [note, setNote] = useState("");

    const onSubmit = async () => {
        try {
            onSuccess && onSuccess({ timestamp: Date.now(), text: note, id });
        } catch (error) {
            onFail && onFail(error.message);
        }
    };

    useEffect(() => {
        Boolean(text) && setNote(text);
    }, [text]);

    const handleChange = text => setNote(text);

    const handleCancelPress = () => onCancelPress && onCancelPress();

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={note}
                    onChangeText={handleChange}
                    placeholder={"Please Write your note here..."}
                />
            </View>
            <View style={[styles.wrapper, { flexDirection: "row" }]}>
                <Pressable
                    disabled={note.trim().length === 0}
                    onPress={onSubmit}
                    style={[
                        styles.press,
                        { backgroundColor: !note.trim().length ? "#ddd" : "red" },
                    ]}
                >
                    <Text>{isNaN(id) ? "Create" : "Update"}</Text>
                </Pressable>
                <Pressable onPress={handleCancelPress} style={[styles.press]}>
                    <Text>{"Cancel"}</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        paddingVertical: 20,
    },
    input: {
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 10,
    },
    press: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: "#ddd",
        borderRadius: 10,
    },
});

export default Form;
