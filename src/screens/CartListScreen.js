import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, AsyncStorage } from "react-native";

const CartListScreen = ({ route }) => {
	const { cartItems } = route.params;
	const [quantity, setQuantity] = useState(1);
	const [cart, setCart] = useState([]); // Giỏ hàng
	
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Shopping Cart</Text>
      </View>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsText}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>Giá: {item.price}$</Text>
                <View style={styles.quantityContainer}>
                  
                  <View style={styles.quantityControl}>
				  <Text style={styles.quantityText}>Số lượng:   	</Text>
                    <TouchableOpacity onPress={decreaseQuantity} style={styles.controlButton}>
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityDisplay}>{quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity} style={styles.controlButton}>
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      )}
    </SafeAreaView>
  );
};

export default CartListScreen;

const styles = StyleSheet.create({
  // Các styles khác ở trên giữ nguyên, chỉ thêm hoặc sửa styles dưới đây
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff", // Tùy chỉnh màu nền nếu cần thiết
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Đổi alignItems từ "center" thành "flex-start"
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  detailsText: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 30,
    marginTop: 5, // Đưa giá xuống dòng
  },
  quantityContainer: {
    flexDirection: "column", // Đổi flexDirection từ "row" thành "column"
    alignItems: "flex-start", // Đổi alignItems từ "center" thành "flex-start"
    marginTop: 5, // Đưa "Quantity" xuống dòng
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCart: {
    fontSize: 18,
    fontStyle: "italic",
  },
  quantityContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 1,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityDisplay: {
    paddingHorizontal: 10,
    fontSize: 50,
  },
});
