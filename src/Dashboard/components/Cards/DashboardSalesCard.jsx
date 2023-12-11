import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getDashboardSalesCardRequest } from '../../api/Dashboard'
import Icon from 'react-native-vector-icons/FontAwesome5';

export  function DashboardSalesCard() {
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchTotalAmount = async () => {
          try {
            const response = await getDashboardSalesCardRequest();
            const data = response.data;
            if (data.length > 0) {
              const formattedTotalAmount = formatCurrency(data[0].totalAmount);
              setTotalAmount(formattedTotalAmount);
            } else {
              setTotalAmount('0');
            }
          } catch (error) {
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
    <View style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.value}>{totalAmount}</Text>
        <Icon style={styles.icon} name='money-bill-wave' />
      </View>
        <Text style={styles.text}>Ventas del mes</Text>
    </View>
  )
}


export const styles = StyleSheet.create({
    card : {
        backgroundColor: '#2A8AD1',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 100,
        borderRadius: 10,
        marginBottom: 10
    },
    container : {
       flexDirection: 'row',
        alignItems: 'center' 
    },
    text : {
      fontWeight : '800',
        color : 'white',
        fontSize : 20
    },
    value : {
        fontWeight: 'medium',
        color : 'white',
        fontSize : 20
    },
    icon : {
      fontWeight: 'medium',
      color : 'white',
      fontSize : 20,
      marginLeft: 20 
    }
})