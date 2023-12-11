import React,{useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';



export  function Login() {
    const {control,handleSubmit,formState: { errors }} = useForm();
    const {login, isAutenticated} = useAuth();
    const navigation = useNavigation();

    const onSubmit = (data) => {
        login(data)
        navigation.navigate('Authenticated', { screen: 'Dashboard' })
    }

  return (
    <View style={styles.global}>
    <View style={styles.topSide}>
        <Icon name='car' style={styles.icon}/>
    </View>
    <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>

        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Correo electrónico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userEmail"
      />
      {errors.userEmail && <Text style={{ color: 'red' }}>Campo requerido</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Contraseña"
            onBlur={onBlur}
            secureTextEntry={true}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userPassword"
      />
      {errors.userPassword && <Text style={{ color: 'red' }}>Campo requerido</Text>}

      <TouchableOpacity style={{marginTop : 10, justifyContent: 'flex-end', alignSelf: 'flex-end', marginRight:35}} onPress={() => navigation.navigate('PasswordRecovery', { screen: 'Send' })}>
          <Text style={{fontWeight: 'bold', color: '#1e40af'}}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Ingresar</Text>
        </TouchableOpacity>



    </View>
</View>
  )
}

export const styles = StyleSheet.create({
    global : {
        backgroundColor : '#f1f1f1',
        flex : 1
    },
    container : {
        alignItems : 'center',
        justifyContent : 'center',
    },
    topSide : {
        backgroundColor : '#1e40af',
        width: '100%',
        height: '35%', 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20
    },
    title : {
        fontSize : 50,
        fontWeight : 'bold',
        color: '#1e40af',
        marginTop: 30
    },
    textInput : {
        width: '80%',
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor : '#fff'
    },
    button : {
      width: 150,
      height: 40,
      marginTop: 20,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: '#1e40af',
      borderColor: '#1e40af',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textButton : {
      alignItems: 'center',
      color: 'white',
      fontWeight : 'bold',
      fontSize: 17,
      textAlign: 'center'
    },
    icon : {
        color: 'white',
        fontSize: 150,
        alignItems: 'flex-end',
        position: 'relative',
        top: 15,
        left: 220
    }
})
