import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import QRCodeScanner from 'expo-qrcode-scanner';
import { BarCodeScanner } from "expo-barcode-scanner";


const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleScanSuccess = (scanData) => {
    console.log("QR Code Scanned:", scanData);
    // You can navigate or process the scanned data here
  };

  const handleScanFail = () => {
    console.log("Failed to scan QR Code.");
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting Camera Permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>
          No access to camera. Please enable camera permissions in settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onScanSuccess={handleScanSuccess}
        onScanFail={handleScanFail}
        style={styles.scanner}
        scanningInfinitely={true} // Continuous scanning
        minSize={150}
        maxSize={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanner: {
    flex: 1,
    width: "100%",
  },
});

export default QrScanner;