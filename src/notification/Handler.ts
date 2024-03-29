import PushNotification, { ReceivedNotification } from 'react-native-push-notification';

class NotificationHandler {
    attachRegister = (Handler: any) => this.onRegister = Handler;

    attachNotification = (Handler: any) => this.onNotification = Handler;

    onNotification = (notification: Omit<ReceivedNotification, "userInfo">) => { }

    onRegister = (token: { os: string, token: string }) => { }

    onRegistrationError = (err: any) => console.log(err);
}

const Handler = new NotificationHandler();

PushNotification.configure({
    onRegister: Handler.onRegister.bind(Handler),
    onNotification: Handler.onNotification.bind(Handler),
    onRegistrationError: Handler.onRegistrationError.bind(Handler),
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});

export default Handler;
