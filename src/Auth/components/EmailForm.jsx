import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../screen/Login';
import { useAuth } from '../context/AuthContext';

export  function EmailForm() {
  const {control, handleSubmit, formState: { errors }} = useForm();
  const {passwordRecovery} = useAuth();

  const onSubmit = (data) => {
    passwordRecovery(data)
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          style={{ padding: 10,
            width : 300 ,
            marginTop: 15,
            borderRadius: 10,
            backgroundColor : '#fff'}}
            placeholder="Correo electrónico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userEmail"
      />
      {errors.userEmail && <Text style={{ color: 'red' }}>Campo requerido</Text>}
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
        }}  onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
    </View>
  )
}
