import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { MOCK_AI_CONVERSATION } from '../constants/mockData';

interface MrWaltScreenProps {
  navigation: any;
}

const MrWaltScreen: React.FC<MrWaltScreenProps> = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState(MOCK_AI_CONVERSATION);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      setConversation([...conversation, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! I'm here to help with your shopping experience. Is there anything specific you'd like to know about our products or offers?",
          isUser: false,
          timestamp: new Date(),
        };
        setConversation(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.ROYAL_BLUE} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.aiAvatar}>
            <Icon name="smart-toy" size={24} color={COLORS.WHITE} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Mr. Walt</Text>
            <Text style={styles.headerSubtitle}>AI Shopping Assistant</Text>
          </View>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.onlineIndicator} />
        </View>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {conversation.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageContainer,
                msg.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              {!msg.isUser && (
                <View style={styles.aiMessageAvatar}>
                  <Icon name="smart-toy" size={16} color={COLORS.WHITE} />
                </View>
              )}
              <View style={[
                styles.messageBubble,
                msg.isUser ? styles.userBubble : styles.aiBubble,
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}>
                  {msg.text}
                </Text>
                <Text style={styles.messageTime}>
                  {formatTime(msg.timestamp)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message..."
              placeholderTextColor={COLORS.SECONDARY_TEXT}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <Icon 
                name="send" 
                size={20} 
                color={message.trim() ? COLORS.WHITE : COLORS.GRAY} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARY_TEXT,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.SECONDARY_TEXT,
  },
  statusIndicator: {
    padding: 8,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.SUCCESS,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  aiMessageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: COLORS.ROYAL_BLUE,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: COLORS.WHITE,
  },
  aiMessageText: {
    color: COLORS.PRIMARY_TEXT,
  },
  messageTime: {
    fontSize: 12,
    color: COLORS.SECONDARY_TEXT,
    alignSelf: 'flex-end',
  },
  inputSection: {
    padding: 16,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.LIGHT_GRAY,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.PRIMARY_TEXT,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.ROYAL_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.LIGHT_GRAY,
  },
});

export default MrWaltScreen; 