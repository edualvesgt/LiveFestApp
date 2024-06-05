import { StyleSheet, Text, View } from "react-native";
import { InputSearchStyle } from "./Style";
import { useState } from "react";

dataSelect = [
  { label: 'Raça Negra, 08 de Junho de 2024, Vibra São Paulo ', value: '1' },
  { label: 'Roupa Nova,  08 de Junho de 2024, Espaço Unimed', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
]


export default function InputSearch() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = ({value, isFocus}) => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: '#956ADF' }]}>
          Eventos e locais
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel({value,isFocus})}
      <InputSearchStyle
        isFocus={isFocus}
        value={value}
        setIsFocus={setIsFocus}
        setValue={setValue}
        data={dataSelect}
        style={[styles.dropdown, isFocus && { borderColor: '#956ADF' }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#956ADF',
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 8,

  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  }
});