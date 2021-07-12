import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const AddList = props => {
  const {refresh} = props;
  const [listTitle, setListTitle] = useState('');

  const onAddList = async () => {
    if (!listTitle) {
      return;
    }
    try {
      const list = await AsyncStorage.getItem('list');
      const id = list.length + 1;
      const updatedList = [
        ...JSON.parse(list),
        {
          id,
          title: listTitle,
          data: [],
          createdAt: dayjs().add(1, 'hour').toISOString(),
        },
      ];
      await AsyncStorage.setItem('list', JSON.stringify(updatedList));
      refresh();
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.closeButtonContainer}
        hitSlop={48}
        onPress={refresh}>
        <Text style={styles.closeButtonTextStyle}>Close</Text>
      </Pressable>
      <TextInput
        style={styles.textInputContainer}
        placeholder="Enter list title"
        value={listTitle}
        onChangeText={text => setListTitle(text)}
        placeholderTextColor="white"
        blurOnSubmit={true}
        onEndEditing={onAddList}
      />
      <View style={styles.buttonContainerStyle}>
        <Pressable style={styles.buttonStyle} onPress={onAddList}>
          <Text style={styles.buttonTextStyle}>Add List</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: '#7dd0d7',
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  textInputContainer: {
    margin: 8,
    backgroundColor: '#7dd0d7',
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 4,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 20,
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  closeButtonTextStyle: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonStyle: {
    padding: 6,
    borderRadius: 8,
  },
  buttonContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 8,
    right: 10,
    marginBottom: 10,
  },
});

export default AddList;
