import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

export const BookCard = ({ book, navigation }) => {
    return <View style={styles.bookCard}>{
        book ? <Text style={styles.bookCardText}>{book.name}</Text> :
            <TouchableOpacity onPress={() => { navigation.navigate('CreateBook') }} >
                <Text>add new thing button</Text>
            </TouchableOpacity>
    }</View>
}

const styles = StyleSheet.create({
    bookCard: {
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: SIZES.small,
        padding: SIZES.small,
        marginBottom: SIZES.medium
    },
    bookCardText: {
        fontSize: SIZES.large,
        textAlign: 'right',
    }
})