import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import useFetch from '../../hook/useFetch';
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS, SIZES, API_URL } from '../../constants/index'
import React, { useState } from 'react';
import axios from 'axios';

const Entry = ({ item }) => (
  <View style={styles.entryContainer}>
    {(item.type === 'image/jpeg' || item.type === 'image/png') && <Image
      source={{ uri: item.content }}
      style={styles.img} />}

    {item.type === 'text' && <Text>{item.content}</Text>}
  </View>
)

const Feed = ({ items }) => {
  const [entries, setEntries] = useState(items);

  return (<SwipeListView
    disableRightSwipe
    data={entries}
    keyExtractor={item => item?.id}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => {
      return <Entry item={item} />
    }}
    onRightAction={async (rowID, rowMap) => {
      try {
        const options = {
          method: 'DELETE',
          url: `${API_URL}/books/1/entries/${rowID}`,

        };
        const resp = await axios.request(options);
        if (resp.status == 200) {
          const newEntries = entries.filter((i) => i.id !== rowID);
          setEntries(newEntries);
        }
      } catch (error) {
        console.log('error deleting entry', error);
      }
    }}
    rightActivationValue={-150}
    renderHiddenItem={() => (
      <View style={styles.rowBack}>
        <Text>deleting...</Text>
      </View>
    )}
  />)
}

export const ViewFeed = ({ navigation }) => {
  const { data, isLoading, error, refetch } = useFetch("GET", "books/1");

  React.useEffect(() => {
    if (refetch) {
      const unsubscribe = navigation.addListener('focus', () => {
        refetch();
      });

      return unsubscribe;
    }
  }, [navigation]);

  return (
    <View style={styles.viewContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.white} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : <Feed items={data['entries']} />}
    </View>)
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  viewContainer: {
    marginHorizontal: SIZES.small,
    marginBottom: SIZES.medium,
  },
  entryContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    marginTop: SIZES.medium,
    gap: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  img: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  }
})