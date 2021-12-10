import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function Pagination({ gotoNextPage, gotoPrevPage}) {
    return (
        <View>
            {gotoPrevPage && <TouchableOpacity onPress={gotoPrevPage}><Text>Anterior⬅</Text></TouchableOpacity>}
            {gotoNextPage && <TouchableOpacity onPress={gotoNextPage}><Text>Siguiente➡</Text></TouchableOpacity>}
        </View>
    )
}
