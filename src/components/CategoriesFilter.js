import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Constant';

const CategoriesFilter = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      // Thêm mục 'All' vào đầu danh sách danh mục
      setCategories(['All', ...data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                index === 0 ? colors.COLOR_PRIMARY : colors.COLOR_LIGHT,
              marginRight: 15,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 7,
              marginVertical: 16,
            }}
          >
            <Text
              style={{
                color: index === 0 && colors.COLOR_LIGHT,
                fontSize: 18,
              }}
            >
              {category}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesFilter;

const styles = StyleSheet.create({});
