import styled from "styled-components";
import {Dropdown} from 'react-native-element-dropdown';
import { useState } from "react";
import { StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 60,
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


export const InputSearchStyle = styled(Dropdown).attrs(props => ({
  placeholderStyle:styles.placeholderStyle,
  selectedTextStyle:styles.selectedTextStyle,
  inputSearchStyle:styles.inputSearchStyle,
  iconStyle:styles.iconStyle,
  data:[["dsadas"],["dsadsadas"]],
  search: true,
  maxHeight:300,
  labelField:"label",
  valueField:"value",
  placeholder:!props.isFocus ? 'Selecione um item' : '...',
  searchPlaceholder:"Pesquisar...",
  value:props.value,
  onFocus:props.onFocus,
  onBlur:props.onBlur,
  onChange:item => {
    props.setValue(item.value); // Supondo que setValue seja uma função prop
    props.setIsFocus(false); // Supondo que setIsFocus seja uma função prop
  },
  renderLeftIcon:() => (
    <AntDesign
      style={styles.icon}
      color={props.isFocus ? 'blue' : 'black'}
      name="Safety"
      size={20}
    />
  ),
}))`

`

