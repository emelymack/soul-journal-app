import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { lightTheme } from '../../global/theme'
import { useState } from 'react';

const NewEntryScreen = () => {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [entryText, setEntryText] = useState("");

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);


  return (
    <ScrollView style={styles.container}>
      <Text>NewEntryScreen</Text>
    </ScrollView>
  )
}

export default NewEntryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.background
  }
})