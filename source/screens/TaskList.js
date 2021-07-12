import React, {useLayoutEffect, useEffect, useState, useCallback} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import TaskListItem from '../components/TaskListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {useFocusEffect} from '@react-navigation/native';

const Sort = data => {
  return data.sort((item1, item2) => {
    return dayjs(item2.createdAt) - dayjs(item1.createdAt);
  });
};

const TaskList = ({route, navigation}) => {
  const {title} = route.params;
  const [tasks, setTasks] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerCenter: () => {
        return <Text style={styles.titleTextStyle}>{title}</Text>;
      },
    });
  }, [navigation, title]);

  const fetchData = useCallback(async () => {
    const list = await AsyncStorage.getItem(`${title}`);
    const sortedList = Sort(JSON.parse(list));
    setTasks(sortedList);
  }, [title]);

  useFocusEffect(() => {
    fetchData();
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.main}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TaskListItem
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
            id={item.id}
            key={item.id}
            refresh={fetchData}
            taskTitle={title}
          />
        )}
        extraData={tasks}
      />
      <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('add-task', {title})}>
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000',
    alignContent: 'center',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  titleTextStyle: {color: '#00CED1', fontSize: 24, fontWeight: 'bold'},
});

export default TaskList;
