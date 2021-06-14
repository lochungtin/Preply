import PushNotification, { ReceivedNotification } from 'react-native-push-notification';

class NotificationHandler {
    onNotification = (notification: Omit<ReceivedNotification, "userInfo">) => {
        console.log('NotificationHandler:', notification);

        if (typeof this.onNotification === 'function')
            this.onNotification(notification);
    }

    onRegister = (token: { os: string, token: string }) => {
        if (typeof this.onRegister === 'function')
            this.onRegister(token);
    }

    onAction = (notification: ReceivedNotification) => { }

    onRegistrationError = (err: any) => console.log(err);

    attachRegister = (handler: any) => this.onRegister = handler;

    attachNotification = (handler: any) => this.onNotification = handler;
}

const handler = new NotificationHandler();

PushNotification.configure({
    onRegister: handler.onRegister.bind(handler),

    onNotification: handler.onNotification.bind(handler),

    onAction: handler.onAction.bind(handler),

    onRegistrationError: handler.onRegistrationError.bind(handler),

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
});

export default handler;