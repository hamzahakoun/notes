import React, { memo } from "react";
import { FlatList, View, Text } from "react-native";
import Item from "../item";

const List = ({ data, onPress, onLongPress }) => {
    const keyExtractor = item => item.id;
    const renderItem = ({ item }) => <Item {...item} onPress={onPress} onLongPress={onLongPress} />;

    if (data?.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No items found ):</Text>
            </View>
        );
    }
    return <FlatList data={data} keyExtractor={keyExtractor} renderItem={renderItem} />;
};

export default memo(List);
