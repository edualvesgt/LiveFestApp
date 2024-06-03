import styled from "styled-components";
import { Dropdown } from 'react-native-element-dropdown';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export const InputSearchStyle = styled(Dropdown).attrs(props => ({
  mode: "auto",
  placeholderStyle: styles.placeholderStyle,
  selectedTextStyle: styles.selectedTextStyle,
  inputSearchStyle: styles.inputSearchStyle,
  iconStyle: styles.iconStyle,
  data: props.data,
  search: true,
  maxHeight: 300,
  labelField: "label",
  valueField: "value",
  placeholder: !props.isFocus ? 'Eventos e locais' : '...',
  searchPlaceholder: "Pesquisar...",
  onFocus: () => { props.setIsFocus(true) },
  onBlur: () => { props.setIsFocus(false) },
  onChange: item => {
    props.setValue(item.value); // Supondo que setValue seja uma função prop
    props.setIsFocus(false); // Supondo que setIsFocus seja uma função prop
  },
  renderLeftIcon: () => (
    <Image
      source={require("../../../assets/TicketLiveFest.png")}
      style={{ height: '80%', width: 50, resizeMode: "contain" }}
    />
  ),
  renderRightIcon: () => {
    if (props.value) {
      return (
        <View style={{ width: 50, height: "100%", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              props.setValue(null)
            }}
            style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <Image
          source={require("../../../assets/magnifyingGlass.png")}
          style={{ height: '60%', width: 50, resizeMode: "contain" }}
        />
      )
    }
  }
}))`

`

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: "#000",
    fontFamily: "MontserratAlternates_500Medium"
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 20,
  },
});