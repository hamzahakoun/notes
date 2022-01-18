import { StyleSheet, View } from "react-native";
import { HomeScreen } from "./screens";

//--------------------------------------------------------------------------

// notes :
// press on item to update it
// long press on item to delete it

//--------------------------------------------------------------------------
export default function App() {
    return (
        <View style={styles.container}>
            <HomeScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
