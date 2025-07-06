import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { MOCK_CART_ITEMS, MOCK_ML_WEIGHT_CHECK } from '../constants/mockData';
import ProductCard from '../components/ProductCard';
import MrWaltButton from '../components/MrWaltButton';

interface FinalBillScreenProps {
  navigation: any;
}

const FinalBillScreen: React.FC<FinalBillScreenProps> = ({ navigation }) => {
  const handleProceedToCheckout = () => {
    // In a real app, this would navigate to payment
    alert('Proceeding to checkout...');
  };

  const handleMrWaltPress = () => {
    navigation.navigate('MrWalt');
  };

  const calculateSubtotal = () => {
    return MOCK_CART_ITEMS.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTotalDiscount = () => {
    return MOCK_CART_ITEMS.reduce((sum, item) => {
      if (item.product.originalPrice) {
        return sum + ((item.product.originalPrice - item.product.price) * item.quantity);
      }
      return sum;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalDiscount = calculateTotalDiscount();
  const finalTotal = subtotal;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Final Bill</Text>
        <Text style={styles.headerSubtitle}>Review your items</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ML Weight Check Status */}
        <View style={styles.weightCheckSection}>
          <View style={[
            styles.weightCheckCard,
            MOCK_ML_WEIGHT_CHECK.status === 'success' ? styles.successCard : styles.errorCard
          ]}>
            <View style={styles.weightCheckHeader}>
              <Icon 
                name={MOCK_ML_WEIGHT_CHECK.status === 'success' ? 'check-circle' : 'error'} 
                size={24} 
                color={MOCK_ML_WEIGHT_CHECK.status === 'success' ? COLORS.SUCCESS : COLORS.ERROR} 
              />
              <Text style={styles.weightCheckTitle}>ML Weight Check Status</Text>
            </View>
            <Text style={styles.weightCheckMessage}>{MOCK_ML_WEIGHT_CHECK.message}</Text>
            <View style={styles.weightDetails}>
              <Text style={styles.weightText}>
                Actual: {MOCK_ML_WEIGHT_CHECK.weight}kg
              </Text>
              <Text style={styles.weightText}>
                Expected: {MOCK_ML_WEIGHT_CHECK.expectedWeight}kg
              </Text>
            </View>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Your Items</Text>
          {MOCK_CART_ITEMS.map((item) => (
            <ProductCard key={item.product.id} item={item} />
          ))}
        </View>

        {/* Bill Summary */}
        <View style={styles.billSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          {totalDiscount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Savings:</Text>
              <Text style={[styles.summaryValue, styles.savingsText]}>
                -${totalDiscount.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Proceed to Checkout Button */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Icon name="payment" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
      </View>

      {/* Floating Mr. Walt Button */}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  weightCheckSection: {
    padding: 20,
  },
  weightCheckCard: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  successCard: {
    backgroundColor: COLORS.WHITE,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.SUCCESS,
  },
  errorCard: {
    backgroundColor: COLORS.WHITE,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.ERROR,
  },
  weightCheckHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weightCheckTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
    marginLeft: 8,
  },
  weightCheckMessage: {
    fontSize: 14,
    color: COLORS.SECONDARY_TEXT,
    marginBottom: 12,
  },
  weightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightText: {
    fontSize: 12,
    color: COLORS.SECONDARY_TEXT,
  },
  itemsSection: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  billSummary: {
    backgroundColor: COLORS.WHITE,
    margin: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.PRIMARY_TEXT,
  },
  savingsText: {
    color: COLORS.SUCCESS,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.LIGHT_GRAY,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.ROYAL_BLUE,
  },
  buttonSection: {
    padding: 20,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.LIGHT_GRAY,
  },
  checkoutButton: {
    backgroundColor: COLORS.ROYAL_BLUE,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkoutButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default FinalBillScreen; 