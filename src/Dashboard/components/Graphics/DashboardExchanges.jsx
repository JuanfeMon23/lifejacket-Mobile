import React, {useState, useEffect} from 'react'
import {  View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { getDashboardExchangesRequest } from '../../api/Dashboard';
import { SelectList } from 'react-native-dropdown-select-list';

export  function DashboardExchanges() {
  const [filterByStatus, setFilterByStatus] = useState("");
  const [data, setData] = useState({ trueExchanges: [], falseExchanges: [] });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [selected, setSelected] = React.useState("");
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const result = await getDashboardExchangesRequest();
        setData(result.data);
        const uniqueYears = [...new Set(result.data.trueExchanges.concat(result.data.falseExchanges).map(item => item.year))];
        setYears(uniqueYears);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchExchanges();
  }, []);

  const prepareChartData = () => {
    const filteredData = filterByStatus ? data[`${filterByStatus}Exchanges`] : [];
    const monthlyExchanges = months.map(month => {
      const exchangesData = filteredData.find(item => monthNames[item.month] === month);
      return exchangesData ? parseFloat(String(exchangesData.totalAmount).replace('M', '')) : 0;
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

        const statusOptions = [
          { key: "Entrante", value: true },
          { key: "Saliente", value: false },
         ];
         
  return (
    <View style={styles.container} >
      <Text style={{
        fontWeight : 'bold',
        color : '#252525',
        fontSize: 20
      }}>Dinero  en intercambios</Text>
        <View style={{        flexDirection: 'row',
        alignItems: 'center'}}>
          <SelectList
                setSelected={(val) => handleStatusChange(val)}
                data={statusOptions.map((status) => ({key : status.key, value : status.value}))}
                save="value"
                boxStyles={{height: 50, width:150, marginBottom: 5, zIndex: 1000, elevation: 1000, marginRight: 10}}
                inputStyles={{ fontSize: 20}}
                dropdownStyles={{backgroundColor: 'white'}}
                dropdownItemStyles={{height: 40}}
                dropdownTextStyles={{color: 'black', backgroundColor: '#1e40af'}}
                placeholder="Estado"
                />
            <SelectList
              setSelected={(val) => setSelectedYear(val)}
              data={years.map((year) => ({ key: year, value: year }))}
              save="value"
              boxStyles={{height: 50, width:150, marginBottom: 5, zIndex: 1000, elevation: 1000}}
              inputStyles={{ fontSize: 20}}
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
