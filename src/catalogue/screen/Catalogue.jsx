import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getVehiclesRequest } from '../api/catalogue'
import Icon from 'react-native-vector-icons/FontAwesome5';

export  function Catalogue() {
 const  [vehicles, setVehicles] = useState([])

 useEffect(() => {
  const totalVehicles = async () => {
    try {
      const response = await getVehiclesRequest();
      setVehicles(response.data)
    } catch (error) {
      
    }
  }
  totalVehicles()
 }, [])
  return (
    <View style={styles.contanier}>
      {vehicles.filter(vehicle => vehicle.vehicleStatus === "true").map((vehicles) => (
        <View key={vehicles.idVehicle} style={styles.card} >
            <View style={{
              justifyContent : 'start',
              marginLeft: 20,
              marginTop:10
            }}>
              {vehicles.vehicleType === "Carros" ? <Icon style={styles.icon} name='car'/>
              : <Icon style={styles.icon} name='motorcycle'/> }
            </View>

            <View style={{flexDirection : 'column',
            marginLeft: 30,
            marginTop: 15
          }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <Text style={styles.titles}>{vehicles.brand}  </Text>
                <Text style={styles.titles}>{vehicles.line}</Text>
              </View>  

              <View style={{
                flexDirection: 'row',
              }}> 
                <Text>Modelo </Text>
                <Text>{vehicles.model}</Text>
              </View>
            </View>  
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  contanier : {
    marginTop: 10,
    width: 370,
    height: 80,
    borderRadius: 10,
    marginLeft:12
  },
  icon : {
    fontSize: 50
  },
  card : {
    backgroundColor :  'white',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  titles : {
    fontWeight : '800',
    fontSize : 20
  }

})
