import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native'
import { styles } from './DashboardSalesCard';
import { getDashboardExchangesCardRequest } from '../../api/Dashboard';
import Icon from 'react-native-vector-icons/Fontisto';

export  function DashboardExchnagesCard() {
  const [totalExchanges, setTotalExchanges] = useState(0);

  useEffect(() => {
    const fetchTotalExchanges = async () => {
      try {
        const response = await getDashboardExchangesCardRequest();
        const data = response.data;
        if (data.length > 0) {
          setTotalExchanges(data[0].totalExchanges);
        } else {
          setTotalExchanges(0);
        }
      } catch (error) {
        console.error('Error al obtener datos de intercambios por cantidad de dinero:', error);
        setTotalExchanges(0);
      }
    };

    fetchTotalExchanges();
  }, []);
  
  return (
    <View style={{
      backgroundColor: '#780FE1',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 100,
      borderRadius: 10,
      marginBottom: 10
    }}>
      <View style={styles.container}>
        <Text style={styles.value}>{totalExchanges}</Text> 
        <Icon style={styles.icon} name='arrow-swap'/>
      </View>
        <Text style={styles.text}>Intercambios del mes</Text>
    </View>
  )
}
