import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { CartItem } from '../types';

interface ProductCardProps {
  item: CartItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { product, quantity, total } = item;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>${product.originalPrice!.toFixed(2)}</Text>
          )}
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.quantityInfo}>
        <Text style={styles.quantity}>Qty: {quantity}</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.ROYAL_BLUE,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.PRIMARY_TEXT,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.GRAY,
    textDecorationLine: 'line-through',
    marginRight: 8,
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
  quantityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    color: COLORS.SECONDARY_TEXT,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ROYAL_BLUE,
  },
});

export default ProductCard; 