import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import FeatureCard from '../components/FeatureCard';
import TodaysAdvisory from './TodaysAdvisory';
import { translations } from '../i18n/translations';

const HomeScreen = ({ navigation, route }) => {
  const { 
    user, 
    setUser, 
    lang, 
    setLang, 
    location, 
    isOffline, 
    setAppIsOffline 
  } = route.params;

  const t = translations[lang];

  const features = [
    { 
      id: 'soil', 
      title: t.soilAnalysis, 
      description: t.soilDesc, 
      icon: 'flask-outline',
      screen: 'SoilAnalysis'
    },
    { 
      id: 'pest', 
      title: t.pestDetection, 
      description: t.pestDesc, 
      icon: 'bug-outline',
      screen: 'PestDetector'
    },
    { 
      id: 'crop', 
      title: t.cropAdvisory, 
      description: t.cropDesc, 
      icon: 'leaf-outline',
      screen: 'CropAdvisory'
    },
    { 
      id: 'timeline', 
      title: t.cropTimeline, 
      description: t.timelineDesc, 
      icon: 'calendar-outline',
      screen: 'CropTimeline'
    },
    { 
      id: 'market', 
      title: t.marketTracking, 
      description: t.marketDesc, 
      icon: 'trending-up-outline',
      screen: 'Market'
    },
    { 
      id: 'schemes', 
      title: t.govtSchemes, 
      description: t.govtSchemesDesc, 
      icon: 'document-text-outline',
      screen: 'Schemes'
    },
    { 
      id: 'weather', 
      title: t.weatherAlerts, 
      description: t.weatherDesc, 
      icon: 'cloud-outline',
      screen: 'Weather'
    },
    { 
      id: 'feedback', 
      title: t.feedback, 
      description: t.feedbackDesc, 
      icon: 'chatbubble-outline',
      screen: 'Feedback'
    },
    { 
      id: 'profile', 
      title: t.myProfile, 
      description: t.myProfileDesc, 
      icon: 'person-outline',
      screen: 'Profile'
    },
    { 
      id: 'comparison', 
      title: t.appComparison, 
      description: t.appComparisonDesc, 
      icon: 'analytics-outline',
      screen: 'Comparison'
    },
  ];

  const navigateToFeature = (screen) => {
    navigation.navigate(screen, {
      user,
      setUser,
      lang,
      setLang,
      location,
      isOffline,
      setAppIsOffline
    });
  };

  const renderFeature = ({ item }) => (
    <View style={styles.featureItem}>
      <FeatureCard
        icon={item.icon}
        title={item.title}
        description={item.description}
        onPress={() => navigateToFeature(item.screen)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <TodaysAdvisory 
          location={location}
          user={user}
          lang={lang}
          setAppIsOffline={setAppIsOffline}
        />
        
        <View style={styles.featuresContainer}>
          <FlatList
            data={features}
            renderItem={renderFeature}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.featuresGrid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  featuresContainer: {
    marginTop: 16,
  },
  featuresGrid: {
    paddingBottom: 20,
  },
  featureItem: {
    flex: 1,
  },
});

export default HomeScreen;