import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

class JourneyScreen extends StatefulWidget {
  @override
  _JourneyScreenState createState() => _JourneyScreenState();
}

class _JourneyScreenState extends State<JourneyScreen> {
  GoogleMapController? mapController;
  LatLng? destination;
  LocationData? currentLocation;
  Location location = Location();
  Set<Polyline> polylines = {};
  Marker? currentLocationMarker;

  @override
  void initState() {
    super.initState();
    _getLocation();
  }

  Future<void> _getLocation() async {
    bool _serviceEnabled;
    PermissionStatus _permissionGranted;

    _serviceEnabled = await location.serviceEnabled();
    if (!_serviceEnabled) {
      _serviceEnabled = await location.requestService();
      if (!_serviceEnabled) {
        return;
      }
    }

    _permissionGranted = await location.hasPermission();
    if (_permissionGranted == PermissionStatus.denied) {
      _permissionGranted = await location.requestPermission();
      if (_permissionGranted != PermissionStatus.granted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Location permission is required to track journey.')),
        );
        return;
      }
    }

    location.onLocationChanged.listen((LocationData locationData) {
      if (mounted) {
        setState(() {
          currentLocation = locationData;
          _updateMarker(locationData);
        });
      }
    });

    currentLocation = await location.getLocation();
    if (mounted) {
      setState(() {
        _updateMarker(currentLocation!);
      });
    }
  }

  void _updateMarker(LocationData locationData) {
    final LatLng currentLatLng = LatLng(locationData.latitude!, locationData.longitude!);
    setState(() {
      currentLocationMarker = Marker(
        markerId: MarkerId("currentLocation"),
        position: currentLatLng,
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueBlue),
      );
    });

    if (mapController != null) {
      mapController!.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(target: currentLatLng, zoom: 14.0),
        ),
      );
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
    if (currentLocation != null) {
      _updateMarker(currentLocation!);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Live Journey'),
        leading: BackButton(
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: currentLocation == null
          ? Center(child: CircularProgressIndicator())
          : GoogleMap(
              onMapCreated: _onMapCreated,
              initialCameraPosition: CameraPosition(
                target: LatLng(currentLocation!.latitude!, currentLocation!.longitude!),
                zoom: 14.0,
              ),
              markers: currentLocationMarker != null ? {currentLocationMarker!} : {},
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
              polylines: polylines,
            ),
    );
  }
}