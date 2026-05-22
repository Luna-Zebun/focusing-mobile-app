import React, {useState} from "react";
import { View, StyleSheet , Vibration ,Text } from  "react-native";
import {Countdown} from "../components/Countdown";
import {RoundedButton} from "../components/RoundedButton";
import {Timing} from "./Timing";
import {spacing} from "../utils/sizes";
import { useKeepAwake } from 'expo-keep-awake';
import { colors} from "../utils/colors";
import { ProgressBar } from 'react-native-paper'

export const Timer = ({focusSubject,clearSubject ,onTimerEnd}) =>{
  useKeepAwake();
  const [isStarted , setIsStarted]=useState(false)
  const [ progress, setProgress]=useState(1)
  const [minutes, setMinutes]= useState(0.2)

  const onEnd = (rest) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    rest();
    onTimerEnd(focusSubject);
  }
  const ONE_SECOND_IN_MS = 1000;
    const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1* ONE_SECOND_IN_MS,
    1* ONE_SECOND_IN_MS,
    1* ONE_SECOND_IN_MS,
  ];
  return(
  <View style = {styles.container}>
    <View style={ styles.countdown}>
       <Countdown 
       minutes={minutes}
       onProgress={(progress)=>setProgress(progress)}
       isPaused={!isStarted}
       onEnd={onEnd}  />
      <View style = {{paddingTop:spacing.xxl}}> 
        <Text style={styles.title}> Focusing on  </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
    </View>

    <View  style={ { padding:spacing.lg}}>
      <ProgressBar
      progress={progress}
       color={colors.progressbar} style={{hight:spacing.sm}} />
    </View>

    <View style={ styles.timingWrapper}>
      <Timing onChangeTime={setMinutes} /> 
    </View>



    <View style={ styles.buttonWrapper}>
       {!isStarted && (<RoundedButton size={90} title="start" onPress={()=>{setIsStarted(true)}} />)}
       {isStarted && (<RoundedButton size={90} title="pause" onPress={()=>{setIsStarted(false)}} />)}
    </View>

    <View style = {styles.clearSubjectWrapper}>
      <RoundedButton size={50}  title="-" onPress={clearSubject}/>
    </View>
  </View>
  
)}

const styles = StyleSheet.create({
  container:{
    flex:1,
    },
  countdown:{
    flex:0.5,
    alignItems:"center",
    justifyContent:"center",
  },
  buttonWrapper:{
    flex: 0.3,
    padding:15,
    justifyContent:"center",
    alignItems:"center"
  },
  timingWrapper:{
    flex:0.1,
    paddingTop: spacing.xl,
    flexDirection:"row"
  },
  clearSubjectWrapper:{
    flexDirection:"row",
    justifyContent:"center"
  },
  title:{
    color: colors.white,
    fontWeight:"bold",
    textAlign:"center"
  },
  task:{
   color: colors.white,
   textAlign:"center"
  }
})