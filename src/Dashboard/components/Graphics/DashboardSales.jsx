import React, {useState, useEffect} from 'react'
import {  View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { SelectList } from 'react-native-dropdown-select-list';
import { getDashboardSalesRequest } from '../../api/Dashboard';



export  function DashboardSales() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];



  useEffect(() => {
    const fetchSales = async () => {
        const result = await getDashboardSalesRequest();
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
    return salesData ? parseFloat(salesData.totalAmount.replace('M', '')) : 0;
  });
 
  return monthlySales;
 };


    const chartConfig = {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(15, 162, 225, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      };


      const handleYearChange = (value) => {
        setSelectedYear(parseInt(value));
      };


  return (
    <View style={styles.container} >
      <View style={{  
       flexDirection: 'row',
        alignItems: 'center' 
    }}>
      <Text style={{
        fontWeight : 'bold',
        color : '#252525',
        fontSize: 20,
        marginRight: 3
      }}>Dinero generado en ventas</Text>
          <SelectList
            setSelected={(val) => setSelectedYear(val)}
            data={years.map((year) => ({ key: year, value: year }))}
            save="value"
            boxStyles={{height: 50, width:150, marginBottom: 5, zIndex: 1000, elevation: 1000}}
            inputStyles={{color: 'black', fontSize: 20}}
            dropdownStyles={{backgroundColor: 'white'}}
            dropdownItemStyles={{height: 40}}
            dropdownTextStyles={{color: 'black'}}
            placeholder="Seleccionar año"
          />
      </View>

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