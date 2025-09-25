import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { callGeminiAPI } from '../api/geminiAPI';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultDisplay from '../components/ResultDisplay';
import { globalStyles, colors } from '../constants/styles';
import { translations } from '../i18n/translations';

const SoilAnalysisScreen = ({ route }) => {
  const { user, lang, setAppIsOffline } = route.params;
  const t = translations[lang];
  
  const [n, setN] = useState('120');
  const [p, setP] = useState('50');
  const [k, setK] = useState('50');
  const [crop, setCrop] = useState(user.primaryCrop || 'Wheat');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');
    const prompt = `You are an expert agronomist. Based on the following soil data (Nitrogen: ${n} kg/ha, Phosphorus: ${p} kg/ha, Potassium: ${k} kg/ha) and previous crop being '${crop}', provide a detailed soil health analysis and fertilizer recommendations for a small-scale farmer in India. Structure your response with clear headings for "Soil Health Status", "Fertilizer Recommendation", and "General Advice". Keep the language simple and direct.`;
    const apiResult = await callGeminiAPI(prompt, null, setAppIsOffline);
    setResult(apiResult);
    setLoading(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.title}>{t.soilAnalysis}</Text>
          
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>{t.nitrogen}</Text>
            <TextInput
              style={globalStyles.input}
              value={n}
              onChangeText={setN}
              placeholder="Enter nitrogen level"
              keyboardType="numeric"
            />
          </View>

          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>{t.phosphorus}</Text>
            <TextInput
              style={globalStyles.input}
              value={p}
              onChangeText={setP}
              placeholder="Enter phosphorus level"
              keyboardType="numeric"
            />
          </View>

          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>{t.potassium}</Text>
            <TextInput
              style={globalStyles.input}
              value={k}
              onChangeText={setK}
              placeholder="Enter potassium level"
              keyboardType="numeric"
            />
          </View>

          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>{t.previousCrop}</Text>
            <TextInput
              style={globalStyles.input}
              value={crop}
              onChangeText={setCrop}
              placeholder="Enter previous crop"
            />
          </View>

          <TouchableOpacity 
            style={[globalStyles.button, loading && globalStyles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading ? t.analyzing : t.getAnalysis}
            </Text>
          </TouchableOpacity>
        </View>

        {loading && <LoadingSpinner />}
        
        {result && (
          <ResultDisplay 
            result={result} 
            lang={lang} 
            userPhone={user.phone} 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SoilAnalysisScreen;