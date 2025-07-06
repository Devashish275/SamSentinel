import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import MrWaltButton from '../components/MrWaltButton';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleStartShopping = () => {
    navigation.navigate('Scan');
  };

  const handleMrWaltPress = () => {
    navigation.navigate('MrWalt');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Icon name="shopping-cart" size={60} color={COLORS.ROYAL_BLUE} />
            <Text style={styles.logoText}>SamSentinel</Text>
            <Text style={styles.tagline}>Smart Self-Checkout</Text>
          </View>
        </View>

        {/* Start Shopping Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartShopping}>
            <Text style={styles.startButtonText}>Start Shopping</Text>
            <Icon name="arrow-forward" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        {/* Features Preview */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.featureItem}>
            <Icon name="camera-alt" size={20} color={COLORS.ROYAL_BLUE} />
            <Text style={styles.featureText}>Smart Product Detection</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="local-offer" size={20} color={COLORS.YELLOW} />
            <Text style={styles.featureText}>Real-time Offers</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="psychology" size={20} color={COLORS.ROYAL_BLUE} />
            <Text style={styles.featureText}>AI Shopping Assistant</Text>
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.ROYAL_BLUE,
    marginTop: 16,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    fontWeight: '500',
  },
  buttonSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: COLORS.ROYAL_BLUE,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
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
  startButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  featuresSection: {
    flex: 1,
    paddingTop: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 16,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    marginLeft: 12,
  },
});

export default HomeScreen; 