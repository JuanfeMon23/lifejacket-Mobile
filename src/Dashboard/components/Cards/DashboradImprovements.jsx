import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native'
import { styles } from './DashboardSalesCard';
import { getDashboardImprovementsCardRequest } from '../../api/Dashboard';
import Icon from 'react-native-vector-icons/FontAwesome5';

export  function DashboradImprovementsCard() {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
      const fetchTotalAmount = async () => {
        try {
          const response = await getDashboardImprovementsCardRequest();
          const data = response.data;
          if (data.length > 0) {
            const formattedTotalAmount = formatCurrency(data[0].totalAmount);
            setTotalAmount(formattedTotalAmount);
          } else {
            setTotalAmount('0');
          }
        } catch (error) {
          console.log( error.response.data.message);
          setTotalAmount('0');
        }
      };
  
      fetchTotalAmount();
    }, []);
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(amount);
    };

  return (
    <View style={{
      backgroundColor: '#0FE19E',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 100,
      borderRadius: 10,
      marginBottom: 10
    }}>
      <View style={styles.container}>
        <Text style={styles.value}>{totalAmount}</Text>
        <Icon style={styles.icon} name='tools'/>
      </View>
        <Text style={styles.text}>Mejoras del mes</Text>
    </View>
  )
}
