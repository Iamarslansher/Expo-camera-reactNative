import { StyleSheet, View } from "react-native";
import CameraComponent from "./src/Camera";
import Gallery from "./src/Gallery";

export default function App() {
  return (
    <View style={styles.container}>
      <CameraComponent />
      {/* <Gallery /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
