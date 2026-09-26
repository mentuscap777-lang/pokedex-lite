import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";

const PokemonDetailScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { pokemon, loading, error } = usePokemonDetail(name);
  const { width } = useWindowDimensions();
  const tamañoImagen = width > 600 ? 220 : 150;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>No se pudo cargar el Pokémon.</Text>
        {error && <Text>{error}</Text>}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {pokemon.sprites.front_default && (
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: tamañoImagen, height: tamañoImagen }}
          />
        )}
      </View>

      <Text style={styles.id}>#{pokemon.id}</Text>
      <Text style={styles.title}>{pokemon.name}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Información</Text>
        <Text style={styles.infoText}>Altura: {pokemon.height}</Text>
        <Text style={styles.infoText}>Peso: {pokemon.weight}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Tipos</Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <View key={type.slot} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type.type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        {pokemon.stats.map((stat) => (
          <View key={stat.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{stat.stat.name}</Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  container: {
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  id: {
    fontSize: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginVertical: 8,
  },
  infoCard: {
    width: "100%",
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeBadge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  typeText: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statName: {
    textTransform: "capitalize",
    fontSize: 15,
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default PokemonDetailScreen;
