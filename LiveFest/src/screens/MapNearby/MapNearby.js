import { View } from "react-native"
import NearbyPoints from "../../components/NearbyPoints/NearbyPoints"
import Carrosel from "../../components/Carrosel/Carrosel"
import api from "../../service/service"
import { useEffect, useState } from "react"

export const MapNearby = () => {
  const [dataEvents, setDataEvents] = useState(null)

async function getEvents (){
  await api.get("/Events")
    .then((response)=>{
      // console.log(response)
      setDataEvents(response.data)
    }
  )

}
useEffect(()=>{ getEvents()},[])
  return(
    <View style={{flex:1}}> 
     {
      dataEvents!==null ?
       <NearbyPoints
        events={dataEvents}
      /> 
      :
      <></>
       
      }     
    </View>
  )
}