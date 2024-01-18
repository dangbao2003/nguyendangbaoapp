import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert // Thêm Alert từ React Native để hiển thị thông báo
} from "react-native";

const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi

  const handleLogin = () => {
    // Xử lý đăng nhập ở đây, ví dụ: gọi API, kiểm tra thông tin đăng nhập, vv.
    // Đây chỉ là ví dụ, bạn cần thay đổi logic kiểm tra đăng nhập thực tế
    if (username === "baobao" && password === "1234") {
      navigation.navigate("RecipeList");
    } else {
      setErrorMessage("Tên người dùng hoặc mật khẩu không chính xác"); // Đặt thông báo lỗi khi thông tin không đúng
      Alert.alert("Lỗi", "Tên người dùng hoặc mật khẩu không chính xác");
    }
  };

  const handleRegister = () => {
    // Xử lý đăng ký ở đây
  };

  return (
    <View style={styles.container}>
     
    
      {/* Giao diện phần đăng nhập hoặc đăng ký */}
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {errorMessage !== "" && ( // Kiểm tra nếu có thông báo lỗi, hiển thị thông báo
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      {isLogin ? null : (
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
      )}
      <TouchableOpacity
        onPress={isLogin ? handleLogin : handleRegister}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchButton}>
          {isLogin ? "Chưa có tài khoản? Đăng ký ngay" : "Đã có tài khoản? Đăng nhập"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  loginButton: {
    backgroundColor: "#f96163",
    borderRadius: 18,
    paddingVertical: 18,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  switchButton: {
    marginTop: 20,
    color: "#f96163",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
});

export default LoginScreen;
