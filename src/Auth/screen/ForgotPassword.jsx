import React from 'react'
import { EmailForm } from '../components/EmailForm'
import { TokenForm } from '../components/TokenForm'
import { View, Text, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import { styles } from './Login'
import { useNavigation } from '@react-navigation/native';


export  function ForgotPassword() {
  const navigation = useNavigation()
  return (
    <View style={{ alignItems : 'center',
    justifyContent : 'center'}}>
        <TouchableOpacity style={{marginTop : 30, justifyContent: 'flex-end', alignSelf: 'flex-end', marginRight: 8}} onPress={() => navigation.navigate('Unauthenticated', { screen: 'Inicio de sesión' })}>
          <Text style={{fontWeight: 'bold', color: '#1e40af'}}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <View style={{width : 300}}>
        <Text style={{}}>Verifica el correo electrónico en el cual inicias sesión en el aplicativo
          para enviarte un token de recuperación</Text>
      </View>
      <EmailForm/>
      <TokenForm/>
    </View>
  )
}
