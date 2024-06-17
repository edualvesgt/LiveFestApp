import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputSearchStyle } from "./Style";
import { useState } from "react";
import moment from "moment";



export default function InputSearch({
  dataEvents
}) {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [listEvent, setListEvent] = useState(dataEvents);
  // console.log("data eventos input",dataEvents)
  
  // const dataSelectInput = () =>{    
  //   if(listEvent!== undefined && listEvent !== null){
  //     return listEvent.map(data =>{
  //       return {
  //         label: `${data.eventName}, ${moment(data.date).format("DD/MM/YYYY")}, ${data.address.city}`,
  //         value: data.id
  //       };
  //     })
  //   }
  // }

  // const renderLabel = ({ value, isFocus }) => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && { color: '#956ADF' }]}>
  //         Eventos e locais
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  const filterEvents = (text) => {
    const filteredEvents = dataEvents.filter(event => 
      event.eventName.toLowerCase().includes(text.toLowerCase()) ||
      event.address.city.toLowerCase().includes(text.toLowerCase())
    );
    setListEvent(filteredEvents);
    setValue(text);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Text style={styles.item}>
        {`${item.eventName}, ${moment(item.date).format("DD/MM/YYYY")}, ${item.address.city}`}
      </Text>
    </TouchableOpacity>
  );
  return (
    <>
      {/* {renderLabel()} */}
      <TextInput
        style={[styles.input, isFocus && { borderColor: '#956ADF' }]}
        placeholder="Buscar eventos ou cidades"
        value={value}
        onChangeText={(text) => filterEvents(text)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <FlatList
        data={listEvent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </>
    // <View style={styles.container}>
    //   {renderLabel({ value, isFocus })}
    //   <InputSearchStyle
    //     isFocus={isFocus}
    //     value={value}
    //     setIsFocus={setIsFocus}
    //     setValue={setValue}
    //     data={dataSelectInput()}
    //     style={[styles.dropdown, isFocus && { borderColor: '#956ADF' }]}
    //   />
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    width: "100%"
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