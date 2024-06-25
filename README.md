# Orderbook Application

This React Native application displays real-time updates for cryptocurrency order books. It uses WebSocket connections to fetch and display bid and ask prices dynamically.

![Orderbook Application]('https://raw.githubusercontent.com/timomak/OrderbookApp/main/app-screenshot.png')

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (18.x or higher recommended)
- Yarn package manager
- React Native environment set up (including Android Studio or Xcode for emulator support)

## Installation

To install the Orderbook application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
2. Install the dependencies using Yarn:
   ```yarn install```

## Setting Up for iOS Development
For iOS development, you need to install CocoaPods dependencies:

1. Navigate to the iOS directory:
 ```cd ios```
 2. Install CocoaPods dependencies:
```pod install```
3. Return to the project root directory:
```cd ..```

Running the Application

To run the Orderbook application on a simulator/emulator, follow these steps:

### Android
Run the application:
```yarn android```

### iOS
Start the iOS simulator.
```yarn ios```

Once the application is running on your emulator or device, it will connect to the WebSocket server and start displaying live order book data for a pre-configured cryptocurrency market.
