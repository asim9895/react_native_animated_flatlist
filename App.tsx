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

const { width, height } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = height * 0.7;
const SPACING = 20;

const Content: React.FC<any> = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: 16,
          textTransform: "uppercase",
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          opacity: 0.5,
        }}
      >
        {item.desc}
      </Text>
      <View style={{ flexDirection: "row", marginTop: SPACING }}>
        <Text
          style={{
            fontWeight: "900",
            fontSize: 42,
            letterSpacing: 3,
            marginRight: 8,
          }}
        >
          {item.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 36,
            fontWeight: "800",
            alignSelf: "flex-end",
          }}
        >
          USD
        </Text>
      </View>
    </View>
  );
};

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const [card_index, setcard_index] = useState(0);
  const trigger_animation = useRef(false);
  const flatListRef: any = useRef();
  console.log(card_index);

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
            // onMomentumScrollBegin={() => {
            //   trigger_animation.current = true;
            // }}
            // onMomentumScrollEnd={(event) => {
            //   console.log(event.nativeEvent.contentOffset.x / width - 10);
            //   if (trigger_animation) {
            //     setcard_index(
            //       Math.ceil(event.nativeEvent.contentOffset.x / width)
            //     );
            //   }
            //   trigger_animation.current = false;
            // }}
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
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              height: 300,
              width: 300,
              top: SPACING * 2,
              alignSelf: "center",
              zIndex: -999,
              shadowColor: "#000",
              shadowOpacity: 1,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 0,
              },
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
            }}
          ></Animated.View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 25,
            }}
          >
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
              <Text
                style={{ fontWeight: "bold", fontSize: 12, marginBottom: 5 }}
              >
                Prev
              </Text>
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
              <Text
                style={{ fontWeight: "bold", fontSize: 12, marginBottom: 5 }}
              >
                Next
              </Text>
              <AntDesign name="swapright" style={{ fontSize: 42 }} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
