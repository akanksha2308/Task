import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskListItem = props => {
  const {title, description, createdAt, id, refresh, taskTitle} = props;

  const onDelete = async () => {
    try {
      const list = await AsyncStorage.getItem(`${taskTitle}`);
      const updatedTaksList = JSON.parse(list).filter(item => item.id !== id);
      await AsyncStorage.setItem(
        `${taskTitle}`,
        JSON.stringify(updatedTaksList),
      );
      refresh();
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleTextStyle} numberOfLines={2}>
            {title}
          </Text>
        </View>
        <Pressable style={styles.buttonStyle} onPress={onDelete}>
          <Text style={styles.deleteTextStyle}>Delete</Text>
        </Pressable>
      </View>
      <View style={styles.innerBoxStyle}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTextStyle}>Description : </Text>
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.textStyle} numberOfLines={1}>
              {description}
            </Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateStyle}>
            {dayjs(createdAt).format('ddd, D MMM')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#7dd0d7',
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
  deleteTextStyle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: '#00CED1',
    fontSize: 16,
  },
  descriptionTextStyle: {
    color: '#000',
    fontSize: 12,
  },
  dateStyle: {
    color: '#fff',
    fontSize: 16,
  },
  dateContainer: {
    backgroundColor: '#ff9f1a',
    padding: 4,
    marginVertical: 8,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  titleTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 10,
  },
  innerBoxStyle: {
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  descriptionTextContainer: {flex: 1},
});

export default TaskListItem;
