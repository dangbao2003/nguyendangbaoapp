import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [productDetails, setProductDetails] = useState(null);

  // Khai báo state cho thông tin giỏ hàng
  const [cartItems, setCartItems] = useState([]);

  // useEffect để load thông tin giỏ hàng từ AsyncStorage khi màn hình được render
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        // Lấy thông tin giỏ hàng từ AsyncStorage
        const savedCartItems = await AsyncStorage.getItem("cartItems");
        if (savedCartItems !== null) {
          // Nếu có dữ liệu trong AsyncStorage, cập nhật state cho giỏ hàng
          setCartItems(JSON.parse(savedCartItems));
        }
      } catch (error) {
        console.error("Error loading cart items:", error);
      }
    };

    loadCartItems();
  }, []);

  // Hàm để thêm sản phẩm vào giỏ hàng và lưu vào AsyncStorage
  const addToCart = () => {
    if (productDetails) {
      const existingItem = cartItems.find((item) => item.id === productDetails.id);
  
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        const updatedCart = cartItems.map((item) => {
          if (item.id === existingItem.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCartItems(updatedCart);
        saveCartToAsyncStorage(updatedCart); // Save the updated cart to AsyncStorage
      } else {
        // If the item doesn't exist in the cart, add it with quantity 1
        const updatedCart = [...cartItems, { ...productDetails, quantity: 1 }];
        setCartItems(updatedCart);
        saveCartToAsyncStorage(updatedCart); // Save the updated cart to AsyncStorage
      }
    }
  };
  
  // Function to save cart items to AsyncStorage
  const saveCartToAsyncStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
      // Show an alert when the item is successfully added to the cart
      Alert.alert("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng.");
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  };
  

  // Hook to monitor changes in cartItems and save to AsyncStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      saveCartToAsyncStorage(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${item.id}`
        );
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [item.id]);

  const navigateToCart = () => {
    navigation.navigate("CartList", { cartItems }); // Chuyển sang màn hình giỏ hàng và truyền danh sách sản phẩm đã chọn
  };
  return (
    <View style={{ backgroundColor: item.color, flex: 1 }}>
      <SafeAreaView style={{ flexDirection: "row", marginHorizontal: 16 }}>
        <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-circle-left"} size={28} color="white" />
        </Pressable>

        <FontAwesome name={"heart-o"} size={28} color="white" />
      </SafeAreaView>

      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          marginTop: 140,
          borderTopLeftRadius: 56,
          borderTopRightRadius: 56,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            //backgroundColor: "white",
            height: 300,
            width: 300,
            position: "absolute",
            top: -150,
            // marginBottom: 130,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>

        {/* Recipe Name */}
        <Text style={{ marginTop: 150, fontSize: 28, fontWeight: "bold" }}>
          {item.title}
        </Text>

        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Recipe Description */}
            <Text style={{ fontSize: 20, marginVertical: 16 }}>
              {item.description}
            </Text>

            {/* Recipe Extra Details */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // width: "100%",
                // backgroundColor: "green",
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.38)",
                  // paddingHorizontal: 16,
                  paddingVertical: 26,
                  borderRadius: 8,
                  alignItems: "center",
                  width: 100,
                }}
              >
                <Text style={{ fontSize: 40 }}>⏰</Text>
                <Text style={{ fontSize: 20, fontWeight: 400 }}>
                  {item.time}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(135, 206, 235, 0.8)",
                  // paddingHorizontal: 16,
                  paddingVertical: 26,
                  borderRadius: 8,
                  alignItems: "center",
                  width: 100,
                  // marginHorizontal: 24,
                }}
              >
                <Text style={{ fontSize: 40 }}>🥣</Text>
                <Text style={{ fontSize: 20, fontWeight: 400 }}>
                  {item.difficulty}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(255, 165, 0, 0.48)",
                  // paddingHorizontal: 16,
                  paddingVertical: 26,
                  borderRadius: 8,
                  alignItems: "center",
                  width: 100,
                }}
              >
                <Text style={{ fontSize: 40 }}>🔥</Text>
                <Text style={{ fontSize: 20, fontWeight: 400 }}>
                  {item.calories}
                </Text>
              </View>
            </View>

            {/* category  */}
            <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
              <Text
                style={{ fontSize: 30, fontWeight: "600", marginBottom: 6 }}
              >
                Category: {item.category}
              </Text>
            </View>

            {/* Giá  */}
            <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "600",
                  marginBottom: 6,
                }}
              >
                Price: {item.price}$
              </Text>
            </View>
            {/* rate  */}
            <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
              <Text
                style={{ fontSize: 30, fontWeight: "600", marginBottom: 6 }}
              >
                Rate: {item.rating.rate}
              </Text>
            </View>
            {/* count  */}
            <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
              <Text
                style={{ fontSize: 30, fontWeight: "600", marginBottom: 6 }}
              >
                Số lượng: {item.rating.count}
              </Text>
            </View>

            {/* Recipe Ingredients  */}

            {/* <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
                <Text
                  style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
                >
                  Ingredients:
                </Text>

                {item.ingredients &&
                  item.price.map((ingredient, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 4,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            backgroundColor: "red",
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                          }}
                        ></View>
                        <Text style={{ fontSize: 18, marginLeft: 6 }}>
                          {ingredient}
                        </Text>
                      </View>
                    );
                  })}
              </View> */}

            {/* Recipe Steps */}

            {/* <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
                <Text
                  style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
                >
                  Steps:
                </Text>

                {item.steps &&
                  item.steps.map((step, index) => {
                    return (
                      <Text
                        key={index}
                        style={{ fontSize: 18, marginLeft: 6, marginVertical: 6 }}
                      >{`${index + 1} ) ${step}`}</Text>
                    );
                  })}
              </View> */}
          </ScrollView>

          {/* Hình ảnh giỏ hàng */}
          {/* <Pressable style={styles.addToCartButtonText} onPress={addToCart}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CartList", {
                    cartItems: cartItems.concat(productDetails), // Thêm sản phẩm mới vào giỏ hàng
                  })
                }
                style={{
                  backgroundColor: "#f96163",
                  borderRadius: 18,
                  paddingVertical: 10,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="shopping-cart"
                  size={50}
                  color="black"
                  style={styles.cartIcon}
                />
              </TouchableOpacity>
            </Pressable> */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* Nút để thêm sản phẩm vào giỏ hàng */}
            <TouchableOpacity
              onPress={addToCart}
              style={styles.addToCartButton}
            >
              <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>

            {/* Nút để chuyển sang màn hình giỏ hàng */}
            <TouchableOpacity
              onPress={navigateToCart}
              style={styles.viewCartButton}
            >
              <Text style={styles.viewCartButtonText}>Xem giỏ hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  addToCartButton: {
    backgroundColor: "#f4511e",
    paddingVertical: 10,
    paddingHorizontal: 110, // Điều chỉnh khoảng cách ngắn hơn
    borderRadius: 30,
    alignSelf: "flex-start", // Canh theo bên trái
    marginBottom: 10, // Khoảng cách giữa nút và hình giỏ hàng
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  cartIcon: {
    fontSize: 30,
  },

  addToCartButton: {
    backgroundColor: "#f4511e",
    paddingVertical: 10,
    paddingHorizontal: 10, // Điều chỉnh khoảng cách ngắn hơn
    borderRadius: 30,
    alignSelf: "flex-start", // Canh theo bên trái
    marginRight: 10, // Khoảng cách giữa nút "Thêm vào giỏ hàng" và "Xem giỏ hàng"
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  viewCartButton: {
    backgroundColor: "#f4511e",
    paddingVertical: 10,
    paddingHorizontal: 60, // Điều chỉnh khoảng cách ngắn hơn
    borderRadius: 30,
    alignSelf: "flex-start", // Canh theo bên trái
  },
  viewCartButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
