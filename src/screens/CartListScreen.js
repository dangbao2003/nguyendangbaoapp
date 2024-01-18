import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { DeepLinking } from "react-native-deep-linking";

const CartListScreen = ({ route }) => {
  const { cartItems } = route.params;
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart([...updatedCart]); // Cập nhật giỏ hàng với một bản sao mới
      saveCartToAsyncStorage(updatedCart);
    }
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (!isNaN(updatedCart[index].quantity)) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart[index].quantity = 1; // Nếu quantity không phải là số, gán lại giá trị là 1
    }
    setCart([...updatedCart]); // Cập nhật giỏ hàng với một bản sao mới
    saveCartToAsyncStorage(updatedCart);
  };

  const saveCartToAsyncStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
      console.log("Giỏ hàng đã được cập nhật.");
    } catch (error) {
      console.error("Lỗi khi lưu giỏ hàng vào AsyncStorage:", error);
    }
  };

  const removeFromCart = async (index) => {
    try {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);

      // Save the updated cart to AsyncStorage and setCart
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCart(updatedCart);

      console.log("Sản phẩm đã được xóa khỏi giỏ hàng.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem("cartItems");
        if (storedCartItems !== null) {
          setCart(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      // Ensure 'price' and 'quantity' are numbers and not undefined
      const updatedCart = cartItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Set quantity to 1 if undefined
        price: item.price || 0, // Set price to 0 if undefined
      }));
      setCart(updatedCart);
    }
  }, [cartItems]);

  useEffect(() => {
    // Calculate total amount when cart changes
    if (cart.length > 0) {
      let calculatedTotal = cart.reduce(
        (total, item) => total + (item.price * item.quantity || 0),
        0
      );
      setTotalAmount(calculatedTotal);
    } else {
      setTotalAmount(0);
    }
  }, [cart]);

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem("cartItems"); // Xóa dữ liệu giỏ hàng từ AsyncStorage
      setCart([]); // Xóa giỏ hàng trong state
      setTotalAmount(0); // Đặt tổng số tiền về 0
      console.log("Đã xóa tất cả sản phẩm khỏi giỏ hàng.");
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
  };

  const handleCheckout = () => {
    const momoPhoneNumber = '0349977452';
    Linking.openURL(`momo://transfer?to=${momoPhoneNumber}`).then(() => {
      console.log('Đã mở MoMo và chuyển đến số điện thoại:', momoPhoneNumber);
      clearCart();
    }).catch((err) => {
      console.error('Lỗi khi mở MoMo:', err);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Shopping Cart</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {cart && cart.length > 0 ? (
          cart.map((item, index) => (
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
                      <Text style={styles.quantityText}>Số lượng: </Text>
                      <TouchableOpacity
                        onPress={() => decreaseQuantity(index)}
                        style={styles.controlButton}
                      >
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityDisplay}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => increaseQuantity(index)}
                        style={styles.controlButton}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removeFromCart(index)} // Thay đổi ở đây
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        )}
      </ScrollView>

      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={handleCheckout}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
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
  removeButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  totalAmountContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    marginBottom: 70, // Để giữ phần tổng giá và nút Checkout ở phía dưới
  },
});
