import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions, // Add Dimensions from react-native
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const windowWidth = Dimensions.get('window').width; // Get window width

  const itemWidth = (windowWidth - 24) / 2 - 16; // Calculate width for 2 columns with margins
  const styles = StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productItem: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      margin: 8,
      width: itemWidth, // Set width for each item
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    image: {
      width: '100%', // Set image width to fill container
      height: 150, // Set a fixed height for the image
      resizeMode: 'cover',
      marginBottom: 8,
      borderRadius: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 14,
      color: '#888',
    },
  });

  const fetchProductData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=10');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('RecipeDetail', { item: item })}
            style={styles.productItem}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecipeCard;
