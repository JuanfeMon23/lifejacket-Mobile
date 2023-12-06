import React, {useState, useEffect} from 'react'
import {  View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import RNPickerSelect from 'react-native-picker-select';
import { getDashboardExchangesRequest } from '../../api/Dashboard';

export  function DashboardExchanges() {
    const [data, setData] = useState([]);
    const [filterByStatus, setFilterByStatus] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    useEffect(() => {
        const fetchSales = async () => {
            const result = await getDashboardExchangesRequest();
            setData(result.data);
            const uniqueYears = [...new Set(result.data.map(item => item.year))];
            setYears(uniqueYears);
        }
        fetchSales();
    }, []);
    
    const prepareChartData = () => {
        const filteredData = data.filter(item => item.year === selectedYear && item.exchangeCashPriceStatus.toString() === filterByStatus);
        const monthlyExchanges = months.map(month => {
            const exchangesData = filteredData.find(item => monthNames[item.month] === month);
            return exchangesData ? exchangesData.totalAmount : 0;
        });

        return monthlyExchanges;
    };

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(98, 15, 225, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        };
  
  
        const handleYearChange = (value) => {
          setSelectedYear(parseInt(value));
        };

        const handleStatusChange = (value) => {
            setFilterByStatus(value);
        };

  return (
    <View style={styles.container} >
      <Text style={{
        fontWeight : 'bold',
        color : '#252525',
        fontSize: 20
      }}>Dinero  en intercambios</Text>
            <RNPickerSelect
            onValueChange={(filterByStatus) => setFilterByStatus(filterByStatus)}
            placeholder={{
                label: "Estado",
                value: null,
            }}
            items={[
                { label: "Entrante", value: "entrante" },
                { label: "Saliente", value: "saliente" },
            ]}
            textInputProps={{
                style: {
                  color: 'black',
                },
              }}
            />
        <RNPickerSelect
          onValueChange={(value) => handleYearChange(value)}
          items={years.map((year) => ({ label: year.toString(), value: year }))}
          placeholder={{
            label: "Seleccionar año",
            value: null,
          }}
        />
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
