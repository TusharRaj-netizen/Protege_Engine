import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from 'react-native';
import { theme } from '../theme';
import { useAppData, ChatMessage, uid } from '../context/AppData';
import { SectionTitle } from '../components/SectionTitle';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { getHealthAnswer } from '../utils/healthEngine';

const SUGGESTIONS = [
  'I have a fever',
  'My blood pressure is high',
  'I feel chest pain',
  'How to sleep better',
  'I feel dizzy',
];

export default function AssistantScreen() {
  const { chat, setChat } = useAppData();
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (chat.length === 0) {
      setChat([
        {
          id: uid(),
          role: 'bot',
          text: "Hello! I'm MediBot, your voice health assistant. Ask me about fever, blood pressure, diabetes, chest pain, sleep, falls, medicines and more. You can type or speak.",
          time: Date.now(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [chat]);

  const send = (textArg?: string) => {
    const text = (textArg ?? input).trim();
    if (!text) return;
    Keyboard.dismiss();
    const userMsg: ChatMessage = { id: uid(), role: 'user', text, time: Date.now() };
    const answer = getHealthAnswer(text);
    const botMsg: ChatMessage = { id: uid(), role: 'bot', text: answer, time: Date.now() + 1 };
    setChat([...chat, userMsg, botMsg]);
    setInput('');
    speak(answer);
  };

  const speak = (text: string) => {
    setSpeaking(true);
    Speech.speak(text, {
      language: 'en-US',
      pitch: 1,
      rate: 0.92,
      onDone: () => setSpeaking(false),
      onError: () => setSpeaking(false),
      onStopped: () => setSpeaking(false),
    });
  };

  const stopSpeaking = () => {
    Speech.stop();
    setSpeaking(false);
  };

  // Simulated voice input: tapping the mic lets the user dictate via the
  // keyboard's voice-to-text dictation on the input field.
  const startVoice = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setListening(true);
    setTimeout(() => setListening(false), 1500);
  };

  const clearChat = () => {
    setChat([
      {
        id: uid(),
        role: 'bot',
        text: 'Chat cleared. How can I help you with your health today?',
        time: Date.now(),
      },
    ]);
    stopSpeaking();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerRow}>
          <SectionTitle>🎙️ Health Assistant</SectionTitle>
          <TouchableOpacity onPress={clearChat}>
            <Text style={styles.clearBtn}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollRef}
          style={styles.chatArea}
          contentContainerStyle={{ padding: theme.spacing.md, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {chat.map((m) => (
            <View
              key={m.id}
              style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.botBubble]}
            >
              <Text style={[styles.bubbleText, m.role === 'user' ? styles.userText : styles.botText]}>
                {m.text}
              </Text>
              {m.role === 'bot' && (
                <TouchableOpacity style={styles.speakBtn} onPress={() => speak(m.text)}>
                  <Text style={styles.speakText}>{speaking ? '🔊 Speaking…' : '🔈 Listen'}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestions}>
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity key={s} style={styles.chip} onPress={() => send(s)}>
              <Text style={styles.chipText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.micBtn} onPress={startVoice}>
            <Text style={styles.micIcon}>{listening ? '🔴' : '🎤'}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask about your health…"
            placeholderTextColor="#9AA8A3"
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => send()}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
        {speaking && (
          <TouchableOpacity onPress={stopSpeaking} style={styles.stopBar}>
            <Text style={styles.stopText}>Tap to stop speaking</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md },
  clearBtn: { color: theme.colors.danger, fontSize: theme.font.normal, fontWeight: '600' },
  chatArea: { flex: 1 },
  bubble: { maxWidth: '88%', marginBottom: 12, padding: 14, borderRadius: 16 },
  userBubble: { backgroundColor: theme.colors.primary, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  botBubble: { backgroundColor: theme.colors.surface, alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: theme.colors.border },
  bubbleText: { fontSize: theme.font.medium, lineHeight: 24 },
  userText: { color: '#fff' },
  botText: { color: theme.colors.text },
  speakBtn: { marginTop: 8, alignSelf: 'flex-start' },
  speakText: { color: theme.colors.primary, fontSize: theme.font.small, fontWeight: '700' },
  suggestions: { paddingHorizontal: theme.spacing.md, maxHeight: 56 },
  chip: { backgroundColor: theme.colors.primaryLight, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16, marginRight: 8 },
  chipText: { color: theme.colors.primaryDark, fontSize: theme.font.normal, fontWeight: '600' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', padding: theme.spacing.md, gap: 8, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border },
  micBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  micIcon: { fontSize: 26 },
  input: { flex: 1, fontSize: theme.font.medium, color: theme.colors.text, maxHeight: 100, minHeight: 56, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  sendBtn: { backgroundColor: theme.colors.primary, borderRadius: 16, paddingHorizontal: 22, height: 56, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#fff', fontWeight: '700', fontSize: theme.font.normal },
  stopBar: { backgroundColor: theme.colors.dangerLight, padding: 10, alignItems: 'center' },
  stopText: { color: theme.colors.danger, fontWeight: '700', fontSize: theme.font.normal },
});