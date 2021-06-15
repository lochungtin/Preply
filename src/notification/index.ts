import moment from 'moment';
import { PushNotificationPermissions } from 'react-native';
import PushNotification, { PushNotificationObject, PushNotificationScheduledLocalObject, ReceivedNotification } from 'react-native-push-notification';

import Handler from './Handler';

export default class NotifService {
    lastId: number = 0;
    lastChannelCounter: number = 0;

    constructor(onRegister: any, onNotification: any) {
        let channelConfig = {
            channelId: 'PreplyRepeatNotifs',
            channelName: 'PreplyRepeatNotifs',
            channelDescription: "Todo Reminders",
            soundName: "default",
            importance: 4,
            vibrate: true,
        };

        PushNotification.createChannel(channelConfig, (created: boolean) => { });

        Handler.attachRegister(onRegister);
        Handler.attachNotification(onNotification);

        // Clear badge number at start
        PushNotification.getApplicationIconBadgeNumber((number: number) => {
            if (number > 0)
                PushNotification.setApplicationIconBadgeNumber(0);
        });
    }

    abandonPermissions = () => PushNotification.abandonPermissions();

    cancelNotif = (id: string) => PushNotification.cancelLocalNotifications({ id });

    checkPermission = (callback: (perms: PushNotificationPermissions) => void) =>
        PushNotification.checkPermissions(callback);

    getScheduledLocalNotifications = (callback: (notifs: PushNotificationScheduledLocalObject[]) => void) =>
        PushNotification.getScheduledLocalNotifications(callback);

    requestPermissions = () => PushNotification.requestPermissions();

    scheduleNotif = (timestamp: string, color: string, message: string, repeatType: any) => {
        console.log('scheduled notif for: ' + timestamp);
        PushNotification.localNotificationSchedule({
            color,
            message,
            repeatType,
            date: new Date(timestamp),
            id: this.lastId++,
            title: 'You have a todo in 5 minutes',
            playSound: true,
            soundName: 'default',

            // other properties
            channelId: 'PreplyRepeatNotifs',
            ticker: 'PreplyTicker',
            autoCancel: true,
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_notification',
            vibrate: true,
            vibration: 300,
            group: 'PreplyGroup',
        });
        return this.lastId;
    }
}
