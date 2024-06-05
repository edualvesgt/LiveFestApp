import { FlatList, StyleSheet, Text, View } from "react-native";
import { ContainerMarginStatusBar } from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { TextTitle } from "../../components/Texts/Texts";

export const Categories = () => {
  return (
    <>
      <ContainerMarginStatusBar justifyContent={"start"}>
        <StatusBar style="auto" />

        <View style={styles.ContainerImput}>
          <TextTitle>Categoria</TextTitle>
        </View>
        <View>
            <FlatList>
                
            </FlatList>
        </View>
      </ContainerMarginStatusBar>
    </>
  );
};

const styles = StyleSheet.create({
  ContainerImput: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
});
