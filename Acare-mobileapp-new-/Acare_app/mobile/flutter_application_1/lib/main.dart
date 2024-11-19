import 'package:flutter/material.dart';
import 'package:flutter_application_1/screens/splash%20screen.dart';
import 'screens/login_screen.dart';
import 'screens/home_page.dart' as home;
import 'screens/emergency_alert_page.dart';
import 'screens/notification_page.dart';
import 'screens/JourneyScreen.dart';
import 'screens/ProfilePage.dart' as profile; // Import the SplashScreen

void main() {
  runApp(const LoginApp());
}

class LoginApp extends StatelessWidget {
  const LoginApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Driver App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.white,
        appBarTheme: const AppBarTheme(
          elevation: 0,
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => SplashScreen(), // Set SplashScreen as the initial route
        '/login': (context) => const LoginScreen(),
        '/home': (context) => home.HomePage(
            driverName:
                  ModalRoute.of(context)?.settings.arguments as String? ?? '',
            ),
        '/emergencyAlert': (context) =>const EmergencyAlertPage(),
        '/notifications': (context) => NotificationPage(),
        '/journey': (context) => JourneyScreen(),
        '/profile': (context) => const profile.ProfilePage(),
      },
    );
  }
}