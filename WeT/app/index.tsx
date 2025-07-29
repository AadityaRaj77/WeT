import { Text, View, Button, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput placeholder="Enter City" style={{ borderWidth: 1, borderColor: "blue", padding: 10, margin: 10, borderRadius: 10 }} />
        <TouchableOpacity
  style={{
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
</TouchableOpacity>
        <Text style={{fontSize:40, fontWeight:"semibold", justifyContent:'center', textAlign:"center",
        }}>Weather</Text>
        <View style={styles.info}>
          <Text style={styles.infohead}>Temperature</Text>
          <Text style={styles.maininfo}>69 C</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infohead}>Humidity</Text>
          <Text style={styles.maininfo}>69%</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infohead}>Wind</Text>
          <Text style={styles.maininfo}>69 km/hr</Text>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  info: {
    backgroundColor: 'blue',
    margin:10,
    justifyContent:'center',
    padding: 24
  },
  infohead: {
    fontSize: 24,
    color:'white',
    fontWeight: 'medium',
    textAlign:'center'
  },
  maininfo:{
    fontSize: 28,
    color:'white',
    fontWeight: 'bold',
    textAlign:'center'
  }
});
