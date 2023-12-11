import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native'
import { styles } from './DashboardSalesCard'
import { getDashboardPurchasesCardRequest } from '../../api/Dashboard'
import Icon from 'react-native-vector-icons/Feather';

export  function DashboardPurchasesCard() {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await getDashboardPurchasesCardRequest();
        const data = response.data;
        if (data.length > 0) {
          const formattedTotalAmount = formatCurrency(data[0].totalAmount);
          setTotalAmount(formattedTotalAmount);
        } else {
          setTotalAmount('0');
        }
      } catch (error) {
        console.error('Error al obtener datos de ventas por cantidad de dinero:', error);
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
      backgroundColor: '#E1DE0F',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 100,
      borderRadius: 10,
      marginBottom: 10
    }}>
      <View style={styles.container}>
        <Text style={styles.value}>{totalAmount}</Text>
        <Icon style={styles.icon} name='shopping-cart'/>
      </View>
        <Text style={styles.text}>Compras del mes</Text>
    </View>
  )
}
