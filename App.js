import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { Timer } from './src/features/timer/timer';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const STATUSES = {
    COMPLETED: 1,
    CANCELLED: 2,
  };

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    backgroundColor: '#0000cd',
  },
});
