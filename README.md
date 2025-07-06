# SamSentinel - Smart Self-Checkout Cart System

A React Native mobile app for smart self-checkout at retail stores like Walmart, featuring AI-powered shopping assistance and real-time product detection.

## 🎨 Design Theme

- **Walmart's Official Color Palette:**
  - Royal Blue: #0071ce
  - Yellow: #ffc220
  - White: #ffffff

## 📱 Features

### 1. **Home/Splash Screen**
- SamSentinel logo and branding
- "Start Shopping" button to begin the experience
- Feature preview (Smart Detection, Real-time Offers, AI Assistant)
- Floating Mr. Walt AI assistant button

### 2. **Smart Scan Screen**
- Camera view placeholder for product detection
- Dynamic product list with real-time updates
- Offers tab showing live discounts and promotions
- "Done Shopping" button to proceed to billing

### 3. **Final Bill Screen**
- Complete itemized bill with quantities and prices
- ML Weight Check status (success/error indicators)
- Total calculation with savings breakdown
- "Proceed to Checkout" button

### 4. **Mr. Walt AI Assistant**
- Persistent floating AI button on all screens
- Chat interface with mock conversation
- Real-time shopping assistance and recommendations
- Offer suggestions based on cart contents

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- React Native CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SamSentinel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Run the app**

   **For iOS:**
   ```bash
   npx react-native run-ios
   ```

   **For Android:**
   ```bash
   npx react-native run-android
   ```

## 📁 Project Structure

```
SamSentinel/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── MrWaltButton.tsx
│   │   └── ProductCard.tsx
│   ├── constants/           # App constants and mock data
│   │   ├── colors.ts
│   │   └── mockData.ts
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/            # Main app screens
│   │   ├── HomeScreen.tsx
│   │   ├── ScanScreen.tsx
│   │   ├── FinalBillScreen.tsx
│   │   └── MrWaltScreen.tsx
│   └── types/              # TypeScript type definitions
│       └── index.ts
├── App.tsx                 # Main app component
└── README.md
```

## 🎯 Demo Features

### Mock Data Included:
- **Products:** Organic Bananas, Whole Milk, Chicken Breast, Bread, Coca Cola
- **Offers:** Flash sales, bundle deals, clearance items
- **AI Conversation:** Sample chat with Mr. Walt showing shopping assistance
- **ML Weight Check:** Simulated weight verification system

### User Flow:
1. **Start** → Home screen with app introduction
2. **Scan** → Camera view with product detection simulation
3. **Review** → Final bill with ML weight check
4. **Assist** → AI chat with Mr. Walt (accessible from any screen)

## 🛠 Tech Stack

- **Framework:** React Native 0.80.1
- **Language:** TypeScript
- **Navigation:** React Navigation v6
- **Icons:** React Native Vector Icons
- **UI:** Custom components with Walmart color scheme

## 🎨 UI/UX Highlights

- **Clean, Professional Design:** Retail-tech inspired interface
- **Mobile-First:** Optimized for mobile shopping experience
- **Accessibility:** High contrast colors and clear typography
- **Consistent Branding:** Walmart color palette throughout
- **Intuitive Navigation:** Seamless flow between screens

## 🔮 Future Enhancements

- Real camera integration for product detection
- Barcode scanning functionality
- Payment processing integration
- Real-time inventory updates
- Advanced AI recommendations
- Multi-language support
- Offline mode support

## 📄 License

This project is created for demonstration purposes in hackathon environments.

---

**Built with ❤️ for smart retail experiences** 