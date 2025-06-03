import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../BasedeDatos/Firebase';

export default function RegistrarCliente() {
  const navigation = useNavigation();
  const route = useRoute();
  const cliente = route.params?.cliente;

  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');

  useEffect(() => {
    if (cliente) {
      setCedula(cliente.nuevacedula);
      setNombres(cliente.nuevosnombres);
      setApellidos(cliente.nuevosapellidos);
      setFechaNacimiento(cliente.nuevafechanac);
      setSexo(cliente.nuevosexo);
    }
  }, [cliente]);

  const guardarCliente = async () => {
    if (!cedula || !nombres) {
      Alert.alert("Error", "Cédula y nombres son obligatorios.");
      return;
    }

    const data = {
      nuevacedula: cedula,
      nuevosnombres: nombres,
      nuevosapellidos: apellidos,
      nuevafechanac: fechaNacimiento,
      nuevosexo: sexo,
    };

    try {
      if (cliente && cliente.id) {
        // Edito cliente existente
        const ref = doc(db, 'clientes', cliente.id);
        await updateDoc(ref, data);
        Alert.alert("Cliente actualizado");
      } else {
        // Nuevo cliente
        await addDoc(collection(db, 'clientes'), data);
        Alert.alert("Cliente guardado");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error guardando cliente:", error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Registro de Datos de Clientes</Text>

      <Text style={styles.label}>Cédula:</Text>
      <TextInput
        style={styles.input}
        value={cedula}
        onChangeText={setCedula}
        placeholder="Ej: 365-130995-0002H"
      />

      <Text style={styles.label}>Nombres:</Text>
      <TextInput
        style={styles.input}
        value={nombres}
        onChangeText={setNombres}
        placeholder="Ej: Juan Carlos"
      />

      <Text style={styles.label}>Apellidos:</Text>
      <TextInput
        style={styles.input}
        value={apellidos}
        onChangeText={setApellidos}
        placeholder="Ej: Pérez López"
      />

      <Text style={styles.label}>Fecha de nacimiento:</Text>
      <TextInput
        style={styles.input}
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={sexo}
          onValueChange={(itemValue) => setSexo(itemValue)}
        >
          <Picker.Item label="Seleccione..." value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
      </View>

      <View style={styles.botonSeparado}>
        <Button
          title={cliente ? "Actualizar" : "Guardar"}
          onPress={guardarCliente}
          color="green"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fdeaf2',
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  botonSeparado: {
    marginBottom: 15,
  },
});