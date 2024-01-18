import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import CartListScreen from "../screens/CartListScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="register" component={RegisterScreen} />
                <Stack.Screen name="RecipeList" component={RecipeListScreen} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
                <Stack.Screen name="CartList" component={CartListScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;


const styles = StyleSheet.create({});
