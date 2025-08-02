import React, { useState } from "react";
import { API_KEY } from "@env";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Index() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<{
    temp: number;
    humidity: number;
    windSpeed: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);  

  const fetchWeather = async () => {
    if (!city.trim()) 
      return;
    else{
      setSearched(true);       
    setLoading(true);       
    setWeather(null);         
    Keyboard.dismiss();

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
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
    } catch {
      setWeather(null);
    } finally {
      setLoading(false);      
    }
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>WeT 💦</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" style={{ margin: 20 }} />}

        {weather ? (
          <>
            <View style={styles.info}>
              <Text style={styles.infoHead}>Temperature</Text>
              <Text style={styles.infoMain}>{weather.temp}°C</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHead}>Humidity</Text>
              <Text style={styles.infoMain}>{weather.humidity}%</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHead}>Wind</Text>
              <Text style={styles.infoMain}>{weather.windSpeed} m/s</Text>
            </View>
          </>
        ) : (
          searched && !loading && (
            <Text style={styles.prompt}>City not found</Text>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inner: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  info: {
    backgroundColor: "lightblue",
    marginVertical: 10,
    padding: 20,
    borderRadius: 8,
  },
  infoHead: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  infoMain: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  prompt: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  },
});
