import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native'
import { getDashboardVehiclesRequest } from '../../api/Dashboard'
import { styles } from './DashboardSalesCard';
import IconCar from 'react-native-vector-icons/FontAwesome5';

export  function DashboardVehiclesCard() {
  const [totalVehicles, setTotalVehicles] = useState(0);

  useEffect(() => {
    const fetchTotalVehicles = async () => {
      try {
        const response = await getDashboardVehiclesRequest();
        setTotalVehicles(response.data.totalVehicles);
      } catch (error) {

      }
    };

    fetchTotalVehicles();
  }, []);

  return (
    <View style={{
      backgroundColor: '#DD311C',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 100,
      borderRadius: 10,
      marginBottom: 10
    }}>
      <View style={styles.container} >  
        <Text style={styles.value}>{totalVehicles}</Text>
        <IconCar style={styles.icon} name='car'/>
      </View>
        <Text style={styles.text}>Vehiculos activos</Text>
    </View>
  )
}
