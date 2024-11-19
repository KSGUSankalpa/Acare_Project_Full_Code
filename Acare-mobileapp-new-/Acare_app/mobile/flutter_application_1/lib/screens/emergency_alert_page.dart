import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';

class EmergencyAlertPage extends StatefulWidget {
  const EmergencyAlertPage({super.key});

  @override
  _EmergencyAlertPageState createState() => _EmergencyAlertPageState();
}

class _EmergencyAlertPageState extends State<EmergencyAlertPage> {
  final ApiService _apiService = ApiService();
  List<String> _alerts = [];
  String? _selectedAlert;

  final Map<String, IconData> _alertIcons = {
    'Medical Emergency': Icons.medical_services_outlined,
    'Vehicle Breakdown': Icons.car_repair,
    'Accident': Icons.warning_amber_rounded,
    'Natural Disaster': Icons.storm,
    'Security Threat': Icons.security,
    'Fire Emergency': Icons.local_fire_department,
    // Add more mappings based on your alert types
  };

  @override
  void initState() {
    super.initState();
    _loadPredefinedAlerts();
  }

  void _loadPredefinedAlerts() async {
    try {
      List<String> alerts = await _apiService.getPredefinedAlerts();
      setState(() {
        _alerts = alerts;
      });
    } catch (e) {
      _showSnackBar('Failed to load alerts: $e', isError: true);
    }
  }

  void _sendAlert(String alert) async {
    final prefs = await SharedPreferences.getInstance();
    final driverId = prefs.getString('driver_id');

    if (driverId == null) {
      _showSnackBar('Driver ID not found. Please log in again.', isError: true);
      return;
    }

    try {
      bool success = await _apiService.sendEmergencyAlert(alert);
      if (success) {
        _showSnackBar('Emergency alert sent successfully', isError: false);
        setState(() {
          _selectedAlert = null;
        });
      } else {
        _showSnackBar('Failed to send alert. Please try again.', isError: true);
      }
    } catch (e) {
      _showSnackBar('Failed to send alert: $e', isError: true);
    }
  }

  void _showConfirmationDialog(String alert) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirm Emergency Alert'),
          content: Text('Are you sure you want to send a $alert alert?'),
          actions: [
            TextButton(
              child: const Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
                setState(() {
                  _selectedAlert = null;
                });
              },
            ),
            TextButton(
              child: const Text(
                'Send Alert',
                style: TextStyle(color: Colors.red),
              ),
              onPressed: () {
                Navigator.of(context).pop();
                _sendAlert(alert);
              },
            ),
          ],
        );
      },
    );
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.red[700] : Colors.green[700],
        behavior: SnackBarBehavior.floating,
        margin: const EdgeInsets.all(16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        title: const Text(
          'Emergency Alert',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Stack(
        children: [
          // Background image
          Positioned.fill(
            child: Image.asset(
              'assets/background.jpg', // Replace with your image asset path
              fit: BoxFit.cover,
            ),
          ),
          // Overlay for background dimming effect
          Positioned.fill(
            child: Container(
              color: const Color.fromARGB(255, 17, 0, 254).withOpacity(0.3),
            ),
          ),
          // Main content
          SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(1),
                    border: Border(
                      bottom: BorderSide(
                        color: Colors.grey[200]!,
                        width: 1,
                      ),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Select Emergency Type',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Tap an option to send emergency alert',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
                if (_alerts.isEmpty)
                  Expanded(
                    child: Center(
                      child: CircularProgressIndicator(
                        color: Colors.grey[800],
                      ),
                    ),
                  ),
                if (_alerts.isNotEmpty)
                  Expanded(
                    child: ListView.builder(
                      itemCount: _alerts.length,
                      padding: const EdgeInsets.all(16),
                      itemBuilder: (context, index) {
                        final alert = _alerts[index];
                        final isSelected = _selectedAlert == alert;

                        return Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: InkWell(
                            onTap: () {
                              setState(() {
                                _selectedAlert = alert;
                              });
                              _showConfirmationDialog(alert);
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                color: isSelected ? Colors.red[50] : Colors.white.withOpacity(1),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: isSelected ? Colors.red : Colors.grey[300]!,
                                  width: isSelected ? 2 : 1,
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.05),
                                    blurRadius: 10,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(12),
                                      decoration: BoxDecoration(
                                        color: isSelected
                                            ? Colors.red[100]
                                            : Colors.grey[100],
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      child: Icon(
                                        _alertIcons[alert] ?? Icons.error_outline,
                                        size: 24,
                                        color: isSelected
                                            ? Colors.red
                                            : Colors.blue[700],
                                      ),
                                    ),
                                    const SizedBox(width: 16),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            alert,
                                            style: TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.w600,
                                              color: isSelected
                                                  ? Colors.red
                                                  : Colors.black87,
                                            ),
                                          ),
                                          const SizedBox(height: 4),
                                          Text(
                                            'Tap to send alert',
                                            style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.grey[600],
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Icon(
                                      Icons.arrow_forward_ios,
                                      size: 18,
                                      color: isSelected ? Colors.red : Colors.grey[400],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
