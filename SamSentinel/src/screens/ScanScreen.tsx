// ScanScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { MOCK_PRODUCTS, MOCK_OFFERS } from '../constants/mockData';
import ProductCard from '../components/ProductCard';
import MrWaltButton from '../components/MrWaltButton';
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import type { Product, CartItem } from '../types';

const ScanScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [showOffers, setShowOffers] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleDoneShopping = () => {
    navigation.navigate('FinalBill');
  };

  const handleMrWaltPress = () => {
    navigation.navigate('MrWalt');
  };

  const handleCameraPress = async () => {
    const result = await launchCamera({ mediaType: 'photo', includeBase64: true });

    if (result.didCancel || !result.assets || !result.assets[0]?.base64) return;

    const image = result.assets[0];

    try {
      const response = await axios.post('http://192.168.43.63:5000/detect', {
        image: image.base64,
      });

      const detectedNames = response.data.detected.map((d: string) => d.toLowerCase());

const matchedProducts: Product[] = MOCK_PRODUCTS.filter(product =>
  detectedNames.includes(product.name.toLowerCase())
);


      setCartItems(prevCart => {
        const updatedCart = [...prevCart];

        matchedProducts.forEach(product => {
          const existingIndex = updatedCart.findIndex(
            item => item.product.id === product.id
          );

          if (existingIndex !== -1) {
            const existing = updatedCart[existingIndex];
            const updatedQuantity = existing.quantity + 1;
            const newTotal = +(product.price * updatedQuantity).toFixed(2);

            updatedCart[existingIndex] = {
              ...existing,
              quantity: updatedQuantity,
              total: newTotal,
            };
          } else {
            updatedCart.push({
              product,
              quantity: 1,
              total: +product.price.toFixed(2),
            });
          }
        });

        return updatedCart;
      });
    } catch (error) {
      console.error('Detection error:', error);
    }
  };

  const renderOffer = ({ item }: { item: any }) => (
    <View style={styles.offerCard}>
      <View style={styles.offerHeader}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% OFF</Text>
        </View>
      </View>
      <Text style={styles.offerDescription}>{item.description}</Text>
      <Text style={styles.offerExpiry}>Expires in: {item.expiryTime}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Scanning</Text>
        <TouchableOpacity
          style={[styles.offersButton, showOffers && styles.offersButtonActive]}
          onPress={() => setShowOffers(!showOffers)}
        >
          <Icon name="local-offer" size={20} color={showOffers ? COLORS.WHITE : COLORS.YELLOW} />
          <Text style={[styles.offersButtonText, showOffers && styles.offersButtonTextActive]}>Offers</Text>
        </TouchableOpacity>
      </View>

      {showOffers && (
        <View style={styles.offersSection}>
          <FlatList
            data={MOCK_OFFERS}
            renderItem={renderOffer}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          />
        </View>
      )}

      <View style={styles.cameraSection}>
        <TouchableOpacity style={styles.cameraPlaceholder} onPress={handleCameraPress}>
          <Icon name="camera-alt" size={48} color={COLORS.ROYAL_BLUE} />
          <Text style={styles.cameraText}>Tap to Scan</Text>
          <Text style={styles.cameraSubtext}>Detect items using camera</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>Detected Products</Text>
        <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
          {cartItems.length === 0 ? (
            <Text style={{ textAlign: 'center', color: COLORS.SECONDARY_TEXT }}>
              No products detected yet. Tap the camera to scan.
            </Text>
          ) : (
            cartItems.map(item => <ProductCard key={item.product.id} item={item} />)
          )}
        </ScrollView>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDoneShopping}>
          <Text style={styles.doneButtonText}>Done Shopping</Text>
          <Icon name="check-circle" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
      </View>

      <MrWaltButton onPress={handleMrWaltPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
  },
  offersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.YELLOW,
    backgroundColor: COLORS.WHITE,
  },
  offersButtonActive: {
    backgroundColor: COLORS.YELLOW,
  },
  offersButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.YELLOW,
    marginLeft: 4,
  },
  offersButtonTextActive: {
    color: COLORS.WHITE,
  },
  offersSection: {
    backgroundColor: COLORS.LIGHT_GRAY,
    paddingVertical: 12,
  },
  offersList: {
    paddingHorizontal: 16,
  },
  offerCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 200,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
    flex: 1,
  },
  discountBadge: {
    backgroundColor: COLORS.YELLOW,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  offerDescription: {
    fontSize: 12,
    color: COLORS.SECONDARY_TEXT,
    marginBottom: 8,
  },
  offerExpiry: {
    fontSize: 10,
    color: COLORS.ERROR,
    fontWeight: '500',
  },
  cameraSection: {
    padding: 20,
  },
  cameraPlaceholder: {
    height: 200,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.ROYAL_BLUE,
    borderStyle: 'dashed',
  },
  cameraText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.ROYAL_BLUE,
    marginTop: 8,
  },
  cameraSubtext: {
    fontSize: 14,
    color: COLORS.SECONDARY_TEXT,
    marginTop: 4,
  },
  productsSection: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  productsList: {
    flex: 1,
  },
  buttonSection: {
    padding: 20,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.LIGHT_GRAY,
  },
  doneButton: {
    backgroundColor: COLORS.ROYAL_BLUE,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  doneButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default ScanScreen;
