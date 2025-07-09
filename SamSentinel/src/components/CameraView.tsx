// components/CameraView.tsx
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraView = ({ onCapture }: { onCapture: (base64: string) => void }) => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      if (permission !== 'authorized') {
        console.error('Camera permission denied');
      }
    };
    requestPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current == null) return;
    const photo = await camera.current.takePhoto({ qualityPrioritization: 'speed' });
    onCapture(photo.path); // base64 not supported directly yet
  };

  return device ? (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraView;
