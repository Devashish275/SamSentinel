// src/components/LiveCameraView.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function LiveCameraView() {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (device == null || !hasPermission) {
    return <Text style={styles.text}>Waiting for camera...</Text>;
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
    fontSize: 16,
  },
});
