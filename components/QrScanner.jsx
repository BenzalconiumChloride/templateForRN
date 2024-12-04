import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission().then(({ granted }) => setHasPermission(granted));
    } else {
      setHasPermission(permission.granted);
    }
  }, [permission]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCameraActive(false); // Close the camera after scanning
    Alert.alert("QR Code Scanned!", `Type: ${type}\nData: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!cameraActive ? (
        <TouchableOpacity
          style={styles.openCameraButton}
          onPress={() => setCameraActive(true)}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      ) : (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <TouchableOpacity
            style={styles.closeCameraButton}
            onPress={() => setCameraActive(false)}
          >
            <Text style={styles.buttonText}>Close Camera</Text>
          </TouchableOpacity>
        </CameraView>
      )}
      {scanned && (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  openCameraButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  closeCameraButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#ff3333',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default QRScanner;
