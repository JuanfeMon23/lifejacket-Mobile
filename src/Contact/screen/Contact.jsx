import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTwo from 'react-native-vector-icons/FontAwesome5';
import { Linking } from 'react-native';

export  function Contact() {
  return (
    <View style={styles.container}>
      <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20
      }}>
        <Text style={styles.firstText}>Somos una compraventa de vehículos ubicada en Laureles, Medellín.</Text>
        <View>
          <Text style={styles.secondText}>Para mas información acerca de nuestros vehículos, selecciona uno de nuestros iconos de contacto.</Text>
        </View>
      </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection : 'row'
        }} >
          <Icon name='whatsapp' style={{
            backgroundColor: '#2DDF1F',
            color: 'white',
            fontSize: 80,
            width: '29%',
            borderRadius: 100,
            padding: 20,
            marginRight: 10
          }} onPress={() => Linking.openURL('whatsapp://send?phone=573006462561&text=Hola! Estoy interesado en un vehículo.')}/>
          <IconTwo name='envelope' style={{
              backgroundColor: '#DF2B1F',
              color: 'white',
              fontSize: 80,
              width: '29%',
              borderRadius: 100,
              padding: 15
          }} onPress={() => Linking.openURL('mailto:example@gmail.com?subject=Asunto&body=Hola! Estoy interesado en un vehículo.')}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignContent : 'center',
    justifyContent : 'center',
  },
  firstText : {

  },
  secondText : {
    marginTop: 10,
    backgroundColor : 'white',
    textAlign: 'justify',
    fontSize: 20,
    padding: 30
  }
})