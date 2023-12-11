import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { DashboardSales } from '../components/Graphics/DashboardSales'
import { DashboardImprovements } from '../components/Graphics/DashboardImprovements'
import { DashboardPurchases } from '../components/Graphics/DashboardPurchases'
import { DashboardExchanges } from '../components/Graphics/DashboardExchanges'
import { DashboardSalesCard } from '../components/Cards/DashboardSalesCard'
import { DashboardVehiclesCard } from '../components/Cards/DashboardVehicles'
import { DashboardPurchasesCard } from '../components/Cards/DashboardPurchasesCard'
import { DashboradImprovementsCard } from '../components/Cards/DashboradImprovements'
import { DashboardExchnagesCard } from '../components/Cards/DashboardExchnagesCard'
import Icon from 'react-native-vector-icons/AntDesign'
import { useAuth } from '../../Auth/context/AuthContext'


export  function Dashboard() {
  const {logout} = useAuth();

  function handleLogout(){
    logout()
  }
  return (
    <ScrollView>
        <View style={{  
       flexDirection: 'row',
        alignItems: 'center' 
    }}>
      <Text style={{fontWeight: '700', marginTop: 50, marginLeft: 30, fontSize: 50}}>Dashboard</Text>
        <TouchableOpacity style={{
          backgroundColor : '#252525',
          width: 50,
          height: 50,
          borderRadius: 20,
          padding:10,
          marginTop: 10,
          marginLeft: 80
        }}  onPress={handleLogout}>
            <Icon style={{ color: 'white', fontSize: 30}}  name='logout'/>
        </TouchableOpacity>
        </View>


        
        <DashboardSales/>
        <DashboardImprovements/>
        <DashboardPurchases/>
        <DashboardExchanges/>
        <View style={{
          marginTop:10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <DashboardSalesCard/>
          <DashboardVehiclesCard/>
          <DashboardPurchasesCard/>
          <DashboradImprovementsCard/>
          <DashboardExchnagesCard/>
          
        </View>
    </ScrollView>
  )
}


