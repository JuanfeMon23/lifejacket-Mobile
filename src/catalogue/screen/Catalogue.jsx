import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput  } from 'react-native'
import { getVehiclesRequest } from '../api/catalogue'
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchIcon from 'react-native-vector-icons/EvilIcons'

export  function Catalogue() {
 const  [vehicles, setVehicles] = useState([])
 const [searchText, setSearchText] = useState("");

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

 const filteredVehicles = vehicles.filter(vehicle => 
  vehicle.vehicleStatus === "true" && 
  (vehicle.brand.toLowerCase().includes(searchText.toLowerCase()) || 
  vehicle.line.toLowerCase().includes(searchText.toLowerCase()))
 ); 

  return (
    <View>
      <Text style={{fontWeight: '700', marginLeft: 15, marginTop: 50, marginBottom: 20, fontSize: 50}}>Catálogo</Text>
      <View style={{width: 350, alignSelf: 'center' }}>
        <TextInput
          style={{height: 40, borderRadius: 10, padding : 10, backgroundColor: 'white' }}
          onChangeText={text => setSearchText(text)}
          placeholder='Buscar por marca o linea...'
          value={searchText}
        />
      </View>
    {filteredVehicles.length === 0 ? 
      <Text>No hay datos registrados</Text> : 
      filteredVehicles.map((vehicles) => (
          <View key={vehicles.idVehicle} style={styles.card} >
              <View style={{
                alignSelf: 'center',
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
    marginTop: 50,
    marginBottom: 10, 
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
    marginBottom: 10,
    alignSelf: 'center',
    width :350
  },
  titles : {
    fontWeight : '800',
    fontSize : 20
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
 },
 searchIcon: {
    padding: 10,
 },
 input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
 },

})
