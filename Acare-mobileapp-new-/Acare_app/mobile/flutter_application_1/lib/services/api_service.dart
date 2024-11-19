// api_service.dart

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String _baseUrl = "http://localhost:3000";

  // Fetch predefined alerts from the backend
  Future<List<String>> getPredefinedAlerts() async {
    final url = Uri.parse('$_baseUrl/predefinedAlerts');
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        return data.map((alert) => alert['alertMessage'] as String).toList();
      } else {
        throw Exception("Failed to load predefined alerts");
      }
    } catch (error) {
      debugPrint("Error fetching predefined alerts: $error");
      return [];
    }
  }

  // Send selected alert along with driver_id to the backend
  Future<bool> sendEmergencyAlert(String alertMessage) async {
    final prefs = await SharedPreferences.getInstance();
    final driverId = prefs.getString('driver_id');

    if (driverId == null) {
      debugPrint("Driver ID not found in SharedPreferences");
      return false;
    }

    final url = Uri.parse('$_baseUrl/sendAlert');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'alertMessage': alertMessage,
          'driver_id': driverId, // Include driver_id in request body
        }),
      );

      if (response.statusCode == 201) {
        debugPrint("Alert sent successfully");
        return true;
      } else {
        debugPrint("Failed to send alert: ${response.statusCode}");
        return false;
      }
    } catch (error) {
      debugPrint("Error sending alert: $error");
      return false;
    }
  }
}
