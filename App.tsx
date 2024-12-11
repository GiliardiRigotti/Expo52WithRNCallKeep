import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
	PermissionsAndroid,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import RNCallKeep from "react-native-callkeep";
import * as Crypto from "expo-crypto";

const options = {
	ios: {
		appName: "My app name",
	},
	android: {
		alertTitle: "Permissions required",
		alertDescription: "This application needs to access your phone accounts",
		cancelButton: "Cancel",
		okButton: "ok",
		imageName: "phone_account_icon",
		additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
		// Required to get audio in background when using Android 11
		foregroundService: {
			channelId: "com.giliardi.expo52",
			channelName: "Foreground service for my app",
			notificationTitle: "My app is running on background",
			notificationIcon: "Path to the resource icon of the notification",
		},
	},
};

RNCallKeep.setup(options).then((accepted) => {});

export default function App() {
	const startCall = () => {
		const uuid = Crypto.randomUUID();
		try {
			RNCallKeep.displayIncomingCall(uuid, "00000", "000000", "number", false);
			console.log(uuid);
		} catch (error) {
			console.log(error);
		}

		/* RNCallKeep.startCall('99800870-a236-40d8-a550-294179ff6959', '0000000000', 'Jhon', 'number', false);
    RNCallKeep.updateDisplay('99800870-a236-40d8-a550-294179ff6959', 'Jhon', '0000000000') */
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={startCall} style={styles.button}>
				<Text style={styles.title}>Start Call</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		width: "80%",
		height: 50,
		borderRadius: 10,
		backgroundColor: "#d2d2d2",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 25,
		fontWeight: "700",
		color: "black",
	},
});
