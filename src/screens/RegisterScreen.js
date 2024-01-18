import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = () => {
    if (username && password && email) {
      // Đăng ký thành công
      ToastAndroid.show("Đăng ký thành công", ToastAndroid.SHORT);
      navigation.navigate("Login", { registrationSuccess: true });
    } else {
      // Đăng ký không thành công do thiếu thông tin
      setErrorMessage("Vui lòng điền đầy đủ thông tin đăng ký");
      ToastAndroid.showWithGravityAndOffset(
        "Vui lòng điền đầy đủ thông tin đăng ký",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };

  return (
    <View style={styles.container}>
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerText}>Đăng Ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.switchButton}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

// ...Styles và export như trong code bạn cung cấp


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
  registerButton: {
    backgroundColor: "#65a3ff",
    borderRadius: 18,
    paddingVertical: 18,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  switchButton: {
    marginTop: 20,
    color: "#65a3ff",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default RegisterScreen;
