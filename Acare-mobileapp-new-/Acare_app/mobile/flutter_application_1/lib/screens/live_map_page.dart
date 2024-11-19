import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MinimalMapPage extends StatefulWidget {
  const MinimalMapPage({super.key});

  @override
  _MinimalMapPageState createState() => _MinimalMapPageState();
}

class _MinimalMapPageState extends State<MinimalMapPage> {
  GoogleMapController? mapController;

  final LatLng _center = const LatLng(37.7749, -122.4194); // Default location (San Francisco)

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Minimal Map Page'),
      ),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(
          target: _center,
          zoom: 14.0,
        ),
        onMapCreated: (GoogleMapController controller) {
          mapController = controller;
        },
      ),
    );
  }
}
