import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "./ApiActionCreator";
import { Card } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { Platform } from "react-native";

const MORE_ICON =
  Platform.OS === "android" ? "dots-horizontal" : "dots-vertical";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiReducer.data);
  const loading = useSelector((state) => state.apiReducer.loading);
  useEffect(() => {
    dispatch(apiCall("https://fakestoreapi.com/products"));
  }, []);

  return (
    <View style={{ backgroundColor: "#dce3f0" }}>
      <Appbar.Header>
        <Appbar.Content title="TokoKu" subtitle={"Tubes PAM"} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card
                style={{ margin: 5, backgroundColor: "white", borderRadius: 3 }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 20,
                  padding: 10,
                }}
              >
                {item.title}
              </Text>
              <View style={{ margin: 10 }}>
                <Card.Cover source={{ uri: item.image }} />
                <Text style={{ color: "red" }}>Price : {item.price} $</Text>
                <Text>Rating : {item.rating.rate}</Text>
                <Text>Jumlah : {item.rating.count}</Text>
                <Text>Description : {item.description}</Text>
              </View>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Home;
