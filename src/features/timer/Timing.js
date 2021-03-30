import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.buttonWrap}>
        <RoundedButton size={50} title="10" onPress={() => onChangeTime(10)} />
      </View>
      <View style={styles.buttonWrap}>
        <RoundedButton size={50} title="15" onPress={() => onChangeTime(15)} />
      </View>
      <View style={styles.buttonWrap}>
        <RoundedButton size={50} title="20" onPress={() => onChangeTime(20)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
  },
});
