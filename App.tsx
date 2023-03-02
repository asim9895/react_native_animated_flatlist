import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { data } from "./data/data";
import { AntDesign } from "@expo/vector-icons";
import Content from "./components/Content";
import { appStyles } from "./app.style";

const { width, height } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = height * 0.7;
const SPACING = 20;

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const [card_index, setcard_index] = useState(0);
  const flatListRef: any = useRef();

  return (
    <View style={{ backgroundColor: "#A5F1FA", flex: 1 }}>
      <SafeAreaView style={{ marginTop: SPACING * 4 }}>
        <View
          style={{
            height: IMAGE_HEIGHT * 0.9,
          }}
        >
          <Animated.FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            bounces={true}
            style={{ flexGrow: 0 }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
                listener: (event: any) => {
                  setcard_index(
                    Math.ceil(event.nativeEvent.contentOffset.x / width)
                  );
                },
              }
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [100, 0, 50],
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });

              const inputRangeText = [
                (index - 0.2) * width,
                index * width,
                (index + 0.2) * width,
              ];
              const outputRange = [0, 1, 0];
              const opacityText = scrollX.interpolate({
                inputRange: inputRangeText,
                outputRange,
              });
              return (
                <View>
                  <Animated.View
                    style={{
                      width,
                      alignItems: "center",
                      transform: [{ translateY }],
                      opacity,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 200, height: 200 }}
                    />
                  </Animated.View>
                  <Animated.View
                    style={{
                      opacity: opacityText,
                      height: 150,
                      marginTop: 10,
                      transform: [
                        {
                          perspective: 200 * 4,
                        },
                        {
                          rotateY: scrollX.interpolate({
                            inputRange: inputRangeText,
                            outputRange: ["45deg", "0deg", "45deg"],
                          }),
                        },
                      ],
                    }}
                    key={index}
                  >
                    <Content item={item} />
                  </Animated.View>
                </View>
              );
            }}
          />
          <Animated.View
            style={[
              appStyles.cardContainer,
              {
                transform: [
                  {
                    perspective: 200 * 4,
                  },
                  {
                    rotateY: progress.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: ["0deg", "90deg", "180deg"],
                    }),
                  },
                ],
              },
            ]}
          ></Animated.View>
          <View style={appStyles.buttonContainer}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: card_index === 0 ? 0.4 : 1,
              }}
              disabled={card_index === 0}
              onPress={() => {
                flatListRef?.current?.scrollToOffset({
                  offset: (card_index - 1) * width,
                  animated: true,
                });
              }}
            >
              <AntDesign name="swapleft" style={{ fontSize: 42 }} />
              <Text style={appStyles.buttonText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: card_index === data.length - 1 ? 0.4 : 1,
              }}
              disabled={card_index === data.length - 1}
              onPress={() => {
                flatListRef?.current?.scrollToOffset({
                  offset: (card_index + 1) * width,
                  animated: true,
                });
              }}
            >
              <Text style={appStyles.buttonText}>Next</Text>
              <AntDesign name="swapright" style={{ fontSize: 42 }} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;