import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../screen/Login';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export  function TokenForm() {
    const {control, handleSubmit, formState: { errors }} = useForm();
    const {verifyTokenPassword} = useAuth();
    const navigation = useNavigation()

    const onSubmit =  (data) => {
         verifyTokenPassword(data)
        navigation.navigate('PasswordRecovery', { screen : 'ResetPassword'})
    }

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: 'Campo requerido',
          minLength : { value: 200, message: 'Datos erróneos' }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ padding: 10,
                width : 300 ,
                marginTop: 15,
                borderRadius: 10,
                backgroundColor : '#fff'}}
            placeholder="Token"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="token"
      />
      {errors.token && <Text style={{ color: 'red' }}>{errors.token.message}</Text>}
      <TouchableOpacity style={{marginTop: 20,
      width: 150,
      height: 40,
      marginTop: 20,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: '#1e40af',
      borderColor: '#1e40af',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf : 'center'
        }} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
    </View>
  )
}
