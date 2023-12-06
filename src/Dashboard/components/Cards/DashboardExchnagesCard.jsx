import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native'
import { styles } from './DashboardSalesCard';
import { getDashboardExchangesCardRequest } from '../../api/Dashboard';

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
        <Text style={styles.text}>Intercambios del mes</Text>
        <Text styles={styles.value}>{totalExchanges}</Text>
    </View>
  )
}
