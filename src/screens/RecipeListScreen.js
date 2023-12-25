import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";
import { FontAwesome } from "@expo/vector-icons";


const RecipeListScreen = ( ) => {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      {/* render header */}
      <Header headerText={"Hi, Bảo "} headerIcon={"bell-o"} />

      {/* Search Filter */}
      <SearchFilter icon="search" placeholder={"Tìm kiếm"} />

      {/* Categories filter */}

      <View style={{ marginTop: 22 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
        {/* Categories list */}
        <CategoriesFilter />
      </View>

      {/* Recipe List Filter */}

      <View style={{ marginTop: 22, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Recipes</Text>
        {/* Recipes list */}

        <RecipeCard />
      </View>
	 
	 
      
    </SafeAreaView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({

	cartButton: {
		position: "absolute",
		bottom: 30,
		right: 10,
		backgroundColor: "orange",
		borderRadius: 50,
		padding: 10,
		elevation: 35,
	  },
	  cartIcon: {
		fontSize: 35,
	  },
});
