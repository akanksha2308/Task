import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import dayjs from 'dayjs';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddList from '../components/AddList';

const Home = () => {
  const navigation = useNavigation();
  const [taskList, setTaskList] = useState([]);
  const [showAddListView, setShowAddListView] = useState(false);

  const fetchData = async () => {
    const list = await AsyncStorage.getItem('list');
    const sortedList = JSON.parse(list).sort((item1, item2) => {
      return dayjs(item2.createdAt) - dayjs(item1.createdAt);
    });
    setTaskList(sortedList);
    setShowAddListView(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerCenter: () => {
        return <Text style={styles.headerCenterStyle}>Trello</Text>;
      },
      headerRight: () => (
        <Pressable onPress={() => setShowAddListView(true)}>
          <Text style={styles.headerRightStyle}>Add list</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.main}>
      {showAddListView ? <AddList refresh={fetchData} /> : null}
      <FlatList
        data={taskList}
        renderItem={({item}) => (
          <ListItem {...item} key={item.id} refresh={fetchData} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#00CED1'},
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  headerRightStyle: {
    color: '#00CED1',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  headerCenterStyle: {
    color: '#00CED1',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
