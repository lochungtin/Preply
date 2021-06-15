import moment from 'moment';
import { PushNotificationPermissions } from 'react-native';
import PushNotification, { PushNotificationObject, PushNotificationScheduledLocalObject, ReceivedNotification } from 'react-native-push-notification';

import { repeats } from '../data/repeats';
import { tags } from '../data/tags';
import { TodoType } from '../types';
import { keygen } from '../utils/keygen';

import Handler from './Handler';

export default class NotifService {

    constructor(onRegister: any, onNotification: any) {
        let channelConfig = {
            channelId: 'PreplyRepeatNotifs',
            channelName: 'PreplyRepeatNotifs',
            channelDescription: "Todo Reminders",
            soundName: "default",
            importance: 4,
            vibrate: true,
        };

        PushNotification.createChannel(channelConfig, (created: boolean) => { console.log('new channel: ' + created) });

        Handler.attachRegister(onRegister);
        Handler.attachNotification(onNotification);

        // Clear badge number at start
        PushNotification.getApplicationIconBadgeNumber((number: number) => {
            if (number > 0)
                PushNotification.setApplicationIconBadgeNumber(0);
        });
    }

    abandonPermissions = () => PushNotification.abandonPermissions();

    cancelAll = () => PushNotification.cancelAllLocalNotifications();

    cancelNotif = (id: string) => PushNotification.cancelLocalNotifications({ id });

    checkPermission = (callback: (perms: PushNotificationPermissions) => void) =>
        PushNotification.checkPermissions(callback);

    getScheduledLocalNotifications = (callback: (notifs: PushNotificationScheduledLocalObject[]) => void) =>
        PushNotification.getScheduledLocalNotifications(callback);

    requestPermissions = () => PushNotification.requestPermissions();

    scheduleNotif = (payload: TodoType): string => {
        let repeatType: string | undefined = repeats[parseInt(payload.repeatKey.substring(4))].handlerName;
        let color: string = tags[parseInt(payload.tagKey.substring(4))].color;

        let timestamp: moment.Moment = moment(`${payload.date} ${payload.time}`, 'DD-MM-YYYY LT')
            .subtract(5, 'minute');

        // add time if on repeat and time set for first notif has passed
        if (timestamp.isBefore(moment())) {
            console.log(timestamp.toString());
            switch (payload.repeatKey) {
                case 'rep:1':
                    timestamp.add(1, 'day');
                    break;
                case 'rep:2':
                    timestamp.add(1, 'week');
                    break;
                case 'rep:3':
                    timestamp.add(1, 'month');
                    break;
                default:
                    return '';
            }
        }        

        let id: number = parseInt(keygen(), 16);
        PushNotification.localNotificationSchedule({
            color,
            id,
            repeatType,
            date: new Date(timestamp.toString()),
            message: payload.title,
            title: 'You have a todo in 5 minutes',

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

        return id.toString();
    }
}
