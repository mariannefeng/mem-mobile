
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import useFetch from '../../hook/useFetch';
import { COLORS, SIZES } from '../../constants';
import { BookCard } from '../shared/BookCard';

export const Books = ({ navigation }) => {
    const { data, isLoading, error, refetch } = useFetch("GET", "books");

    useEffect(() => {
        if (refetch) {
            const unsubscribe = navigation.addListener('focus', () => {
                refetch();
            });

            return unsubscribe;
        }
    }, [navigation]);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.white} />
            ) : error ? (
                <Text>Something went wrong trying to get books</Text>
            ) : <View style={styles.booksWrapper}>
                <BookCard />
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <BookCard book={item} />
                    )} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    booksWrapper: {
        padding: SIZES.medium
    }
})