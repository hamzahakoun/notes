import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

//--------------------------------------------------------------------------

// notes :
// press on item to update it
// long press on item to delete it

//--------------------------------------------------------------------------

const Item = ({ text, onPress, id, timestamp, onLongPress }) => {
    const handlePress = () => {
        onPress && onPress({ text, id, timestamp });
    };

    const handleLongPress = () => {
        onLongPress && onLongPress({ text, id, timestamp });
    };

    return (
        <Pressable style={styles.conatainer} onPress={handlePress} onLongPress={handleLongPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    conatainer: {
        backgroundColor: "#444",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Item;
