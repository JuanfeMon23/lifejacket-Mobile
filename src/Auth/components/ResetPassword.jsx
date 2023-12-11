import React from 'react'
import { useAuth } from '../context/AuthContext';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../screen/Login';
import { useNavigation } from '@react-navigation/native';

export  function ResetPassword() {
    const {resetPassword, newPassword } = useAuth();
    const {control,handleSubmit,formState: { errors }, getValues} = useForm();
    const navigation = useNavigation()

    const onSubmit = (data) => {
        resetPassword(newPassword.idUser, data)
    }

  return (
    <View style={{ alignItems : 'center',
    justifyContent : 'center'}}>
        <TouchableOpacity style={{marginTop : 30, justifyContent: 'flex-end', alignSelf: 'flex-end', marginRight: 8}} onPress={() => navigation.navigate('Unauthenticated', { screen: 'Inicio de sesión' })}>
          <Text style={{fontWeight: 'bold', color: '#1e40af'}}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Nueva contraseña</Text>
      <Controller
            control={control}
            rules={{
            required: 'Campo requerido',
            minLength: { value: 8, message: 'Debe tener al menos 8 caracteres' },
            pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message: 'Debe contener al menos una letra mayúscula y un carácter especial'
            }
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
            name="newUserPassword"
            />
            {errors.newUserPassword && <Text style={{ color: 'red' }}>{errors.newUserPassword.message}</Text>}

        
         <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Ingresar</Text>
        </TouchableOpacity>



    </View>
  )
}
