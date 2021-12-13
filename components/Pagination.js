import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Pagination({ gotoNextPage, gotoPrevPage}) {
    return (
        <View style={styles.pagination}>
            {gotoPrevPage && <TouchableOpacity onPress={gotoPrevPage}><Text> Anterior </Text></TouchableOpacity>}
            {gotoNextPage && <TouchableOpacity onPress={gotoNextPage}><Text> Siguiente </Text></TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    pagination: {
      flexDirection: 'row',
      width: '100%',
      height: '4%',
      marginBottom:30,
      backgroundColor: 'purple',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderRadius: 7
      },
    
  });