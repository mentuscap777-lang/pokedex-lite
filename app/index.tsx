import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import { usePokemonList } from "../hooks/usePokemonList";

const HomeScreen = () => {
  const { pokemons, loading, error } = usePokemonList(20);
  const { width } = useWindowDimensions();

  const columnas = width > 600 ? 3 : width > 380 ? 2 : 1;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Ocurrió un error:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      key={columnas}
      data={pokemons}
      numColumns={columnas}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.list}
      columnWrapperStyle={columnas > 1 ? styles.columnWrapper : undefined}
      renderItem={({ item, index }) => (
        <Link href={`/pokemon/${item.name}`} asChild>
          <Pressable style={styles.card}>
            <View style={styles.numberCircle}>
              <Text style={styles.numberText}>#{index + 1}</Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.seeMore}>Ver detalle →</Text>
          </Pressable>
        </Link>
      )}
    />
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
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  list: {
    padding: 16,
  },
  columnWrapper: {
    gap: 12,
  },
  card: {
    flex: 1,
    minHeight: 130,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  numberCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  numberText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  seeMore: {
    marginTop: 8,
    fontSize: 13,
  },
});

export default HomeScreen;
