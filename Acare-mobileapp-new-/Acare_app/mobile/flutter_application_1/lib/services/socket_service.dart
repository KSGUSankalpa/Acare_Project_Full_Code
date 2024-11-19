// mobile-app/lib/services/socket_service.dart
import 'package:socket_io_client/socket_io_client.dart' as IO;

IO.Socket socket = IO.io('http://localhost:3000', <String, dynamic>{
  'transports': ['websocket'],
});

void startSocketConnection() {
  socket.onConnect((_) {
    print('Connected to backend');

    // Listen for destination notifications from the web app
    socket.on('sendDestination', (data) {
      // Handle received destination notification
      print("Received destination: $data");
      // You can add logic here to store notifications in a provider or state management
    });
  });
}
