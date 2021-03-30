import React, { useState } from "react";
import { Text, StyleSheet, View, Vibration, Platform } from "react-native";
import { CountDown } from "../../components/CountDown";
import { RoundedButton } from "../../components/RoundedButton";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";
import { useKeepAwake } from "expo-keep-awake";

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          onEnd={onEnd}
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
        />
      </View>
      <View style={{ paddingTop: 24 }}>
        <Text style={styles.title}>Focusing On: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{ paddingTop: 15 }}>
        <ProgressBar style={styles.bar} progress={progress} />
      </View>

      <View style={styles.buttonWrap}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrap}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            size={80}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="start"
            size={80}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "#fff",
    textAlign: "center",
  },
  task: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  countdown: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrap: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "center",
  },
  bar: {
    height: 10,
    backgroundColor: "#ff0000",
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
