import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteForm, NoteList } from "../../components";
import {
    TextInput,
    View,
    StyleSheet,
    ActivityIndicator,
    Pressable,
    Text,
    Dimensions,
    Alert,
} from "react-native";

const { height, width } = Dimensions.get("window");

const Home = () => {
    //search notes based on text
    const [query, setQuery] = useState("");

    // all notes
    const [notes, setNotes] = useState(null);

    // displayed notes (when filtering data not all notes should be rendered)
    const [displayedNotes, setDisplayedNotes] = useState(null);

    //when user wants to create or update a note
    const [activeNote, setActiveNote] = useState(null);

    //while user is typing in search bar
    const handleChange = useCallback(text => {
        setQuery(text);
    }, []);

    // get notes from async storage
    const getNotes = async () => {
        try {
            let _notes = await AsyncStorage.getItem("notes");
            _notes = _notes ? JSON.parse(_notes) : [];

            setNotes(_notes);
        } catch (error) {
            alert(error.message);
        }
    };

    // update displayed notes based on searhed value
    useEffect(() => {
        const filtered = query.trim()
            ? notes.filter(item => item.text.toLowerCase().includes(query.toLowerCase()))
            : notes;
        setDisplayedNotes(filtered);
    }, [query]);

    // get all notes upon mounting
    useEffect(() => getNotes(), []);

    // everytime notes got updated this will reflects on displayed notes
    useEffect(() => notes && setDisplayedNotes(notes), [notes]);

    // call when save (whether create or update) operation is done
    const onSaveNoteSuccess = useCallback(
        note => {
            let _notes;
            // user is updating
            if (!isNaN(note.id)) {
                _notes = notes.map(item => (note.id === item.id ? note : item));
            } else {
                // user is creating
                _notes = [...notes, { ...note, id: Date.now() }];
            }

            setNotes(_notes);
            AsyncStorage.setItem("notes", JSON.stringify(_notes));
            setActiveNote(null);
        },
        [notes]
    );

    // call when save operation returns an error for some reason
    const onSaveNoteFail = useCallback(errorMessage => alert(errorMessage), []);

    const handleNotePress = useCallback(note => setActiveNote(note), []);

    const handleNoteLongPress = useCallback(note => removeNotePrompt(note), [notes]);

    // delete note
    const removeNote = note => {
        const _notes = notes?.filter(item => item.id !== note.id);
        setNotes(_notes);
        AsyncStorage.setItem("notes", JSON.stringify(_notes));
    };

    // prompt the user before removing the note
    const removeNotePrompt = note => {
        Alert.alert("Remove Note", `Are you sure you want to delete (${note.text}) note ?`, [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel",
            },
            { text: "OK", onPress: () => removeNote(note) },
        ]);
    };

    const toggleSort = () => setDisplayedNotes([...displayedNotes.reverse()]);

    return (
        <View style={styles.container}>
            {Boolean(displayedNotes) ? (
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <TextInput
                            style={styles.input}
                            value={query}
                            onChangeText={handleChange}
                            placeholder={"Search..."}
                        />
                    </View>

                    <NoteList
                        data={displayedNotes}
                        onPress={handleNotePress}
                        onLongPress={handleNoteLongPress}
                    />
                </View>
            ) : (
                <View
                    style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
                >
                    <ActivityIndicator color="red" />
                </View>
            )}

            <Pressable style={styles.floatPress} onPress={() => setActiveNote({})}>
                <Text style={styles.floatPressText}>Add</Text>
            </Pressable>

            <Pressable style={[styles.floatPress, { left: 40, width: 100 }]} onPress={toggleSort}>
                <Text style={styles.floatPressText}>{`Toggle Sort`}</Text>
            </Pressable>

            {Boolean(activeNote) && (
                <View style={styles.formBlock}>
                    <NoteForm
                        {...activeNote}
                        onCancelPress={() => setActiveNote(null)}
                        onSuccess={onSaveNoteSuccess}
                        onFail={onSaveNoteFail}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    floatPress: {
        position: "absolute",
        bottom: 40,
        right: 40,
        backgroundColor: "#444",
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    floatPressText: {
        color: "#fff",
    },
    formBlock: {
        height,
        width,
        position: "absolute",
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    wrapper: {
        marginBottom: 20,
    },
});
export default Home;
