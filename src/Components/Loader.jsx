import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { lightTheme } from '../global/theme'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size="large" 
        color={lightTheme.primary} 
      />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})