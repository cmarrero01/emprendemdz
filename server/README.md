# POST /notifications/send

BASIC AUTENTICATION: mdz / 2015$

## DESCRIPTION:

Each push can include a large icon which is used to personalize each push. The location of the image may one of three types.

The first is the *drawables* folder in your app. This JSON sent from GCM:

```javascript
{
	"title": "Large Icon",
	"message": "Loaded from drawables folder",
	"image": "twitter"
}
```

Would look for the *twitter* image in the drawables folder and produce the following notification.

![2015-07-24 02 34 41](https://cloud.githubusercontent.com/assets/353180/8866903/2df48028-3190-11e5-8176-fe8b3f7c5aab.png)

The second is the *assets* folder in your app. This JSON sent from GCM:

```javascript
{
	"title": "Large Icon",
	"message": "Loaded from assets folder",
	"image": "www/image/logo.png"
}
```

Would look for the *logo.png* file in the assets/www/img folder. Since your apps www folder gets copied into the Android assets folder it is an excellent spot to store the images without needing to write a hook to copy them to the *drawables* folder. It produces the following notification.

![2015-07-24 02 20 02](https://cloud.githubusercontent.com/assets/353180/8866901/2df19052-3190-11e5-8c16-a355c59209f3.png)


The third is the remote *URL*. This JSON sent from GCM:

```javascript
{
	"title": "Large Icon",
	"message": "Loaded from URL",
	"image": "https://dl.dropboxusercontent.com/u/887989/antshot.png"
}
```

Produces the following notification.

![2015-07-24 02 17 55](https://cloud.githubusercontent.com/assets/353180/8866900/2df0ab06-3190-11e5-9a81-fdb85bb0f5a4.png)

## Sound

For Android there are two special values for sound you can use. The first is `default` which will play the phones default notification sound. Then second is `ringtone` which will play the phones default ringtone sound.

In order for your your notification to play a custom sound you will need to add the files to your Android project's `res/raw` directory. Then send the follow JSON from GCM:

```javascript
{
	"title": "Sound Test",
	"message": "Loaded res/raw",
	"soundname": "test"
}
```

*Note:* when you specify the custom sound file name omit the file's extension.

## Stacking

By default when using this plugin on Android each notification that your app receives will replace the previous notification in the shade.

If you want to see multiple notifications in the shade you will need to provide a notification ID as part of the push data sent to the app. For instance if you send:

```javascript
{
	"title": "Test Push",
	"message": "Push number 1"
}
```

Followed by:

```javascript
{
	"title": "Test Push",
	"message": "Push number 2"
}
```

You will only see "Push number 2" in the shade. However, if you send:

```javascript
{
	"title": "Test Push",
	"message": "Push number 1",
	"notId": 1
}
```

and:

```javascript
{
	"title": "Test Push",
	"message": "Push number 2",
	"notId": 2
}
```

You will only see both "Push number 1" and "Push number 2" in the shade.

## Inbox Stacking

A better alternative to stacking your notifications is to use the inbox style to have up to 8 lines of notification text in a single notification. If you send the following JSON from GCM you will see:

```javascript
{
	"title": "My Title",
	"message": "My first message",
	"style": "inbox",
	"summaryText": "There are %n% notifications"
}
```

It will produce a normal looking notification:

![2015-08-25 14 11 27](https://cloud.githubusercontent.com/assets/353180/9468840/c9c5d43a-4b11-11e5-814f-8dc995f47830.png)

But, if you follow it up with subsequent notifications like:

```javascript
{
	"title": "My Title",
	"message": "My second message",
	"style": "inbox",
	"summaryText": "There are %n% notifications"
}
```

You will get an inbox view so you can display multiple notifications in a single panel.

![2015-08-25 14 01 35](https://cloud.githubusercontent.com/assets/353180/9468727/2d658bee-4b11-11e5-90fa-248d54c8f3f6.png)

If you use `%n%` in the `summaryText` of the JSON coming down from GCM it will be replaced by the number of messages that are currently in the queue.

## Action Buttons

Your notification can include action buttons. If you wish to include an icon along with the button name they must be placed in the `res/drawable` directory of your Android project. Then you can send the following JSON from GCM:

```javascript
{
	"title": "AUX Scrum",
	"message": "Scrum: Daily touchbase @ 10am Please be on time so we can cover everything on the agenda.",
	"actions": [
		{ "icon": "emailGuests", "title": "EMAIL GUESTS", "callback": "app.emailGuests"},
		{ "icon": "snooze", "title": "SNOOZE", "callback": "app.snooze"},
	]
}
```

This will produce the following notification in your tray:

![action_combo](https://cloud.githubusercontent.com/assets/353180/9313435/02554d2a-44f1-11e5-8cd9-0aadd1e02b18.png)

If your users clicks on the main body of the notification your app will be opened. However if they click on either of the action buttons the app will open (or start) and the specified JavaScript callback will be executed. In this case it is `app.emailGuests` and `app.snooze` respectively.

## Led in Notifications

You can use a Led notifcation and choose the color of it. Just add a `ledColor` field in your notification in the ARGB format array:

```javascript
{
	"title": "Green LED",
	"message": "This is my message with a Green LED",
	"ledColor": [0, 0, 255, 0]
}
```

## Vibration Pattern in Notifications

You can set a Vibration Pattern for your notifications. Just add a `vibrationPattern` field in your notification:

```javascript
{
	"title": "Vibration Pattern",
	"message": "Device should wait for 2 seconds, vibrate for 1 second then be silent for 500 ms then vibrate for 500 ms",
	"vibrationPattern": [2000, 1000, 500, 500]
}
```

## Priority in Notifications

You can set a priority parameter for your notifications. Just add a `priority` field in your notification. -2: minimum, -1: low, 0: default , 1: high, 2: maximum priority:

```javascript
{
	"title": "This is a maximum priority Notification",
	"message": "This notification should appear in front of all others",
	"priority": 2
}
```

## Picture Messages

Perhaps you want to include a large picture in the notification that you are sending to your users. Luckily you can do that too by sending the following JSON from GCM.

```javascript
{
	"title": "Big Picture",
	"message": "This is my big picture message",
	"style": "picture",
	"picture": "http://36.media.tumblr.com/c066cc2238103856c9ac506faa6f3bc2/tumblr_nmstmqtuo81tssmyno1_1280.jpg",
	"summaryText": "The internet is built on cat pictures"
}
```

This will produce the following notification in your tray:

![2015-08-25 16 08 00](https://cloud.githubusercontent.com/assets/353180/9472260/3655fa7a-4b22-11e5-8d87-20528112de16.png)


## Background Notifications

On Android if you want your `on('notification')` event handler to be called when your app is in the background it is relatively simple.

First the JSON you send from GCM will need to include `"content-available": "1"`. This will tell the push plugin to call your `on('notification')` event handler no matter what other data is in the push notification.

```javascript
{
	"title": "Test Push",
	"message": "Push number 1",
	"info": "super secret info",
	"content-available": "1"
}
```

or


```javascript
{
	"info": "super secret info",
	"content-available": "1"
}
```

If do not want this type of behaviour just omit `"content-available": 1` from your push data and your `on('notification')` event handler will not be called.

# iOS Behaviour

## Sound

In order for your your notification to play a custom sound you will need to add the files to root of your iOS project. The files must be in the proper format. See the [Local and Remote Notification Programming Guide](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html#//apple_ref/doc/uid/TP40008194-CH103-SW6) for more info on proper file formats and how to convert existing sound files.

Then send the follow JSON from APNS:

```javascript
{
	"aps": {
		"alert": "Test sound",
		"sound": "sub.caf"
	}
}
```

## Background Notifications

On iOS if you want your `on('notification')` event handler to be called when your app is in the background you will need to do a few things.

First the JSON you send from APNS will need to include `"content-available": 1` to the `aps` object. The `"content-available": 1` property in your push message is a signal to iOS to wake up your app and give it up to 30 seconds of background processing. If do not want this type of behaviour just omit `"content-available": 1` from your push data.


For instance the following JSON:

```javascript
{
	"aps": {
		"alert": "Test background push",
		"content-available": 1
	}
}
```

will produce a notification in the notification shade and call your `on('notification')` event handler.

However if you want your `on('notification')` event handler called but no notification to be shown in the shader you would omit the `alert` property and send the following JSON to APNS:

```javascript
{
	"aps": {
		"data": "Test silent background push",
		"moredata": "Do more stuff",
		"content-available": 1
	}
}
```

If your users clicks on the main body of the notification your app will be opened. However if they click on either of the action buttons the app will open (or start) and the specified JavaScript callback will be executed.

# Real Examples for POST /notifications/send

```javascript
{
	"notification": {
		"title": "Test Push",
		"message": "Push number 1",
		"info": "super secret info",
		"content-available": "1"
	}
}

{
	"notification":{
		"title": "Todas las noticias en tu mano",
		"message": "Nueva aplicación de MDZOL, todo lo que buscabas en un solo lugar.",
		"summaryText": "Nueva aplicación de MDZOL, todo lo que buscabas en un solo lugar.",
		"icon": "icon",
		"style": "picture",
		"picture": "http://www.bolsamania.com/cine/wp-content/uploads/2015/07/216.jpg",
		"priority": 2,
		"actions": [
			{ "icon": "emailGuests", "title": "ESCRIBINOS", "callback": "app.emailGuests"},
			{ "icon": "snooze", "title": "OMITIR", "callback": "app.snooze"}
		],
		"image": "www/img/icon.png"
	}
}
```