import React from "react";
import {View, Text , StyleSheet , FlatList} from "react-native";
import {colors} from "../utils/colors";
import {fontSizes, spacing} from "../utils/sizes"

export const FocusHistory = ({history}) => {
  if (!history || !history.length) return <Text style={styles.title}> we haven't focused on anything yet!</Text>;
  const renderItem = ({item}) => <Text style = {styles.item}> - {item}</Text>
  return(
        <View style ={styles.container}> 
          <Text style={styles.title}> things we've focused on : </Text>
          <FlatList data={history} renderItem={renderItem} />
        </View>
  )
}
const styles = StyleSheet.create({

  container:{
    flex:1
  },
  title:{
    color:colors.white,
    fontSize:fontSizes.md,
    padding: spacing.md,
    fontWeight:"bold"
  },
  item:{
    color: colors.white,
    fontSize:fontSizes.md,
    fontWeight:"blod"
  }
})