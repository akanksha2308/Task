import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';

const AddTask = ({navigation, route}) => {
  const {title} = route.params;
  const [task, setTask] = useState({
    title: '',
    createdAt: new Date(),
    description: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerCenter: () => {
        return <Text style={styles.header}>Add task</Text>;
      },
    });
  }, [navigation]);

  const onAddTask = async () => {
    if (!task.title) {
      Alert.alert('Please enter task title!');
      return;
    }
    if (!task.description) {
      Alert.alert('Please enter task description!');
      return;
    }
    try {
      const list = await AsyncStorage.getItem(`${title}`);
      const filteredList = JSON.parse(list);
      const updatedTaksList = [
        ...filteredList,
        {...task, id: Math.random().toString()},
      ];
      await AsyncStorage.setItem(`${title}`, JSON.stringify(updatedTaksList));
      setTimeout(() => navigation.navigate('task-list', {title}), 1000);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Title</Text>
      <TextInput
        value={task.title}
        placeholder="title"
        style={styles.titleInput}
        onChangeText={text => setTask({...task, title: text})}
      />
      <Text style={styles.textStyle}>Description</Text>

      <TextInput
        value={task.description}
        placeholder="description"
        style={styles.titleInput}
        onChangeText={text => setTask({...task, description: text})}
      />
      <Text style={styles.textStyle}>Created At</Text>
      <View style={styles.titleInput}>
        <Text>{dayjs(task.createdAt).format('ddd, D MMM')}</Text>
      </View>
      <View style={styles.datePickerContainer}>
        <DatePicker
          date={task.createdAt}
          style={styles.datePicker}
          onDateChange={date => setTask({...task, createdAt: date})}
          minimumDate={new Date()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonStyle} onPress={onAddTask}>
          <Text style={styles.buttonTextStyle}>Submit</Text>
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('task-list')}>
          <Text style={styles.buttonTextStyle}>Go to task list</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00CED1',
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 30,
    marginTop: 16,
    color: 'white',
  },
  titleInput: {
    fontSize: 16,
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  header: {color: '#00CED1', fontSize: 24, fontWeight: 'bold'},
  buttonTextStyle: {
    fontSize: 18,
    color: '#00CED1',
  },
  buttonStyle: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  datePicker: {
    backgroundColor: 'white',
    elevation: 2,
  },
});

export default AddTask;
