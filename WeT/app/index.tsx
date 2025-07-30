import { useState } from "react";
import { Text, View, Button, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Index() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<{
    temp: number;
    humidity: number;
    windSpeed: number;
  } | null>(null);
  const [loading, setLoading] = useState(false)
  const API_KEY = '48ab7588f7de2ea964d935e8edd1fe10';
  const fetchWeather = async() => {
    if(city.trim() !== ""){
      Keyboard.dismiss()
      try{
        const res = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
        const json = await res.json();
        if (res.ok) {
          setWeather({
            temp: json.main.temp,                       
            humidity: json.main.humidity,               
            windSpeed: json.wind.speed,                
          });
        } else {
          setWeather(null);
        }
      } catch (e) {
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }
      };
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput placeholder="Enter City" value={city}
          onChangeText={setCity} style={{ borderWidth: 1, borderColor: "blue", padding: 10, margin: 10, borderRadius: 10 }} />
        <TouchableOpacity
  style={{
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  }}
>
  <Text onPress={fetchWeather} style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
</TouchableOpacity>
{loading && <ActivityIndicator size="large" style={{ margin: 20 }} />}
        {weather? (
          <>
          <Text style={{fontSize:40, fontWeight:"semibold", justifyContent:'center', textAlign:"center",
          }}>Weather</Text>
          <View style={styles.info}>
            <Text style={styles.infohead}>Temperature</Text>
            <Text style={styles.maininfo}>{weather.temp}°C</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infohead}>Humidity</Text>
            <Text style={styles.maininfo}>{weather.humidity}%</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infohead}>Wind</Text>
            <Text style={styles.maininfo}>{weather.windSpeed} m/s</Text>
          </View></> 
        ): !loading && (
          <Text style={styles.prompt}>City not found or enter a city above.</Text>
        )}
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
  },
  prompt: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  }
});
