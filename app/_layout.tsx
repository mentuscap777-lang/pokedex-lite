import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Pokedex Lite" }} />
      <Stack.Screen name="pokemon/[name]" options={{ title: "Detalle" }} />
    </Stack>
  );
};

export default RootLayout;
