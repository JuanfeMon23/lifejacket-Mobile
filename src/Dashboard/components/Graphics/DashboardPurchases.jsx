import React, {useState, useEffect} from 'react'
import {  View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import RNPickerSelect from 'react-native-picker-select';
import { getDashboardPurchasesRequest } from '../../api/Dashboard';

export  function DashboardPurchases() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);
  
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    useEffect(() => {
        const fetchSales = async () => {
            const result = await getDashboardPurchasesRequest();
            setData(result.data);
            const uniqueYears = [...new Set(result.data.map(item => item.year))];
            setYears(uniqueYears);
        }
        fetchSales();
    }, []);
    
    const prepareChartData = () => {
       const filteredData = data.filter(item => item.year === selectedYear);
       const monthlySales = months.map(month => {
           const salesData = filteredData.find(item => monthNames[item.month] === month);
           return salesData ? salesData.totalAmount : 0;
       });
    
       return monthlySales;
    };

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(209, 225, 15 , ${opacity})`,
        style: {
          borderRadius: 16,
        },
        };
  
  
        const handleYearChange = (value) => {
          setSelectedYear(value);
        };

  return (
    <View style={styles.container} >
        <RNPickerSelect
          onValueChange={(value) => handleYearChange(value)}
          items={years.map((year) => ({ label: year, value: year }))}
          placeholder={{
            label: "Seleccionar año",
            value: null,
          }}
          style={{
            inputAndroid: {
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: 'purple',
              borderRadius: 8,
              color: 'black',
              paddingRight: 30, 
          }}}
        />
      <Text style={{
        fontWeight : 'bold',
        color : '#252525',
        fontSize: 20
      }}>Dinero invertido en compras</Text>

      <LineChart
        verticalLabelRotation={90}
        data={{
            labels: months,
            datasets: [{
                data: prepareChartData()
            }]
        }}
        width={Dimensions.get('window').width - 50}
        height={340}
        yAxisSuffix={''}
        yAxisInterval={1} 
        chartConfig={chartConfig}
        bezier
        style={{
            borderRadius: 16
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent : 'center',
        flex :  1,
        marginTop: 10,
    },
    graphic : {
        borderRadius: 20,
    }
});

const monthNames = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
};
