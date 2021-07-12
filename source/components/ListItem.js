import React, {useEffect} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItem = props => {
  const {title, id, refresh} = props;
  const navigation = useNavigation();

  useEffect(() => {
    const setData = async () => {
      const list = await AsyncStorage.getItem('list');
      const filteredList = JSON.parse(list).filter(item => item.id === id);
      await AsyncStorage.setItem(
        `${title}`,
        JSON.stringify(filteredList[0].data),
      );
    };
    setData();
  });

  const onDeleteList = async () => {
    try {
      const list = await AsyncStorage.getItem('list');
      const updatedList = JSON.parse(list).filter(item => item.title !== title);
      await AsyncStorage.setItem('list', JSON.stringify(updatedList));
      refresh();
    } catch (e) {}
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('task-list', {title})}
      style={styles.container}>
      <Text style={styles.titleTextStyle}>{title}</Text>
      <Pressable onPress={onDeleteList}>
        <Text style={styles.deleteTextStyle}>Delete</Text>
      </Pressable>
    </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  deleteTextStyle: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ListItem;
