<!-- Source: https://developer.android.com/topic/security -->

* [ Android Developers ](<https://developer.android.com/>)
  * [ Design & Plan ](<https://developer.android.com/design>)
  * [ App quality ](<https://developer.android.com/quality>)
  * [ Privacy & Security ](<https://developer.android.com/quality/privacy-and-security>)


Stay organized with collections  Save and categorize content based on your preferences. 

![](https://developer.android.com/static/images/quality/hero-images/privacy_security_highlighted.svg)

###  Design for Safety 

Android is secure by default and private by design. And Google Play designs policies and guidelines to create a safe ecosystem.

Design for privacy by focusing on minimization. Minimize permission requests, minimize location access, and minimize data visibility across apps.

Design for security by following best practices for encryption, integrity, and authentication.

Guide

###  [ Ensure user privacy ](<https://developer.android.com/privacy/best-practices>)

Provide transparency for users, give control over private data access, and treat data responsibly. 

Guide

###  [ Ensure app security ](<https://developer.android.com/topic/security/best-practices>)

Work with network communications, data storage, permissions, and app dependencies. 

Guide

###  [ Google Play requirements ](<https://developer.android.com/docs/quality-guidelines/core-app-quality#sc>)

Design for compliance with Google Play policies to improve the user experience and create a safer ecosystem. 

Guide

###  [ SDK best practices ](<https://developer.android.com/guide/practices/sdk-best-practices>)

Follow best practices for user safety, whether you're developing an app or creating an SDK. 

* * *

###  [ ![Android 11](/static/images/quality/privacy-and-security/Android11.svg) ](<https://developer.android.com/about/versions/11/privacy>)

  * Scoped storage enhancements
  * Separate request for background location
  * Data access auditing


[Learn more](<https://developer.android.com/about/versions/11/privacy>)

###  [ ![Android 12](/static/images/quality/privacy-and-security/Android12.svg) ](<https://developer.android.com/about/versions/12/behavior-changes-all#security-privacy>)

  * Approximate location
  * Privacy dashboard
  * Bluetooth permissions  
  


[Learn more](<https://developer.android.com/about/versions/12/behavior-changes-all#security-privacy>)

###  [ ![Android 13](/static/images/quality/privacy-and-security/Android13.svg) ](<https://developer.android.com/about/versions/13/features#privacy-security>)

  * Notification permission
  * Wi-Fi and storage permissions
  * Photo picker  
  


[Learn more](<https://developer.android.com/about/versions/13/features#privacy-security>)

[View cheat sheet](<https://developer.android.com/privacy/cheat-sheet>) [View codelab](<https://developer.android.com/codelabs/android-privacy-codelab>)

Guide

###  [ Minimize your permissions ](<https://developer.android.com/training/permissions/evaluating>)

Before you declare permissions in your app, consider whether you need to do. Learn how the system can help you. 

Guide

###  [ New photos & videos ](<https://developer.android.com/training/permissions/evaluating#take-photo>)

Send a request to the device's default camera app to take photos and videos, without requesting any camera-related permissions. 

Guide

###  [ Existing photos & videos ](<https://developer.android.com/training/data-storage/shared/photopicker>)

Use the system photo picker, which allows users to choose specific media items to share with your app. 

Guide

###  [ App-specific data ](<https://developer.android.com/training/data-storage/app-specific>)

Use the system-provided folder for app-specific information. Your app doesn't need any storage permissions to access this folder. 

Guide

###  [ Nearby devices ](<https://developer.android.com/training/permissions/evaluating#pair-over-bluetooth>)

Use companion device pairing to find nearby devices without declaring location permissions. 

Guide

###  [ Permission downgrading ](<https://developer.android.com/training/permissions/requesting#remove-access>)

If your app targets Android 13 or higher, the self-revoke APIs allow your app to revoke access to already-granted permissions that your app no longer requires. 

Guide

###  [ Location accuracy ](<https://developer.android.com/training/location/permissions#accuracy>)

Wait to upgrade to precise location until the user is actively using features that require precise location. 

Guide

###  [ Background location ](<https://developer.android.com/training/location/background>)

Foreground location should fulfil most of the use cases. Only use background location when there is no alternative. 

Guide

###  [ Nearby Bluetooth devices ](<https://developer.android.com/guide/topics/connectivity/bluetooth/permissions>)

If your app targets Android 12 or higher, many APIs for nearby Bluetooth devices don't require location access. 

Guide

###  [ Nearby Wi-Fi devices ](<https://developer.android.com/guide/topics/connectivity/wifi-permissions>)

If your app targets Android 13 or higher, many APIs for nearby Wi-Fi devices don't require location access. 

Guide

###  [ Package visibility ](<https://developer.android.com/training/package-visibility/declaring>)

If your app targets Android 11 or higher, declare the set of packages that you expect your app to interact with. 

Guide

###  [ Device identifiers ](<https://developer.android.com/training/articles/user-data-ids#common-use-cases>)

Use the appropriate user-resettable identifier for your app's use case. Starting in Android 12, the system restricts the set of device identifiers that apps can use. 

Guide

###  [ In-context permission requests ](<https://developer.android.com/training/permissions/requesting#workflow_for_requesting_permissions>)

Wait until the user is about to interact with the feature that requires a permission before requesting that permission. 

Policy

###  [ Prominent disclosure ](<https://support.google.com/googleplay/android-developer/answer/11150561>)

Learn when your app must provide separate, in-app disclosures to explain the reason for accessing particularly sensitive permissions. 

Guide

###  [ Permission rationale ](<https://developer.android.com/training/permissions/requesting#explain>)

Each time you request a permission, check whether you should show an educational UI to users. 

Guide

###  [ Data access ](<https://developer.android.com/guide/topics/data/audit-access>)

Use data access auditing APIs to detect when your app, or an SDK dependency, performs operations that are associated with a permission. 

Guide

###  [ Permission denials ](<https://developer.android.com/training/permissions/requesting#handle-denial>)

If the user denies a permission, your app should still work as well as it can without the permission. 

Policy

###  [ Data collection & sharing ](<https://developer.android.com/guide/topics/data/collect-share>)

In the Google Play Console, declare the types of user data that your app collects and shares. 

Feature

###  [ Camera & microphone indicators ](<https://developer.android.com/training/permissions/explaining-access#indicators>)

Starting in Android 12, the system shows an icon when an app accesses sensors that capture sensitive information. 

Feature

###  [ Clipboard access ](<https://developer.android.com/develop/ui/views/touch-and-input/copy-paste#PastingSystemNotifications>)

Starting in Android 12, users are notified each time an app reads clipboard data that originated from a different app. 

Feature

###  [ Privacy Dashboard ](<https://developer.android.com/training/permissions/explaining-access#privacy-dashboard>)

Starting in Android 12, the system provides an timeline view of permissions accessed by apps. 

Feature

###  [ Permission auto-revoke ](<https://developer.android.com/topic/performance/app-hibernation>)

On all devices running Android 11 or higher, and on many devices that run Android 6.0 or higher, the system automatically revokes permissions from unused apps. 

### Build apps to be secure by default

Android’s goal is to be the safest mobile platform in the world. We consistently invest in technologies that bolster the security of the platform, its apps, and the global Android ecosystem.

Guide

###  [ Protect against fraud and abuse ](<https://developer.android.com/google/play/integrity/overview>)

Use the Play Integrity API to detect potentially risky and fraudulent interactions, such as cheating and unauthorized access. 

Guide

###  [ Authenticate with Credential Manager ](<https://developer.android.com/training/sign-in/passkeys>)

Credential Manager is the modern Jetpack authentication library that supports passkeys, federated sign-in solutions such as Sign-in with Google, and legacy username/password authentication. 

Guide

###  [ Authenticate with biometrics ](<https://developer.android.com/training/sign-in/biometric-auth>)

Use the Jetpack Biometric library to take advantage of a device's biometric sensors when authenticating users in your app. 

Guide

###  [ Communicate securely ](<https://developer.android.com/training/articles/security-ssl>)

HTTPS and SSL provide secure protocols for transferring data between your app and servers. A number of common errors can lead to insecure data transfer. Check for these in your app. 

Guide

###  [ Encrypt your data ](<https://developer.android.com/topic/security/data>)

Where data is sensitive, encrypt it in the app's private storage to make it less accessible if the device is stolen and gets compromised. 

Guide

###  [ Be the first to know ](<https://developers.google.com/android/play-protect/starting-a-vdp>)

Set up a vulnerability disclosure program (VDP) to provide guidelines for security researchers to disclose any previously undetected vulnerabilities to you. 

[ ![](https://developer.android.com/static/images/cluster-illustrations/private-by-design-16-9.svg) ](<https://services.google.com/fb/forms/privacysandbox/>)

###  [ Help us design privacy preserving APIs for advertising ](<https://services.google.com/fb/forms/privacysandbox/>)

To contribute to the Privacy Sandbox effort or just follow along, sign up to receive regular updates. 

[Sign up](<https://services.google.com/fb/forms/privacysandbox/>) [Learn more](<https://developer.android.com/design-for-safety/privacy-sandbox>)

[ ![](https://developer.android.com/static/images/cluster-illustrations/quality-guidelines.svg) ](<https://developer.android.com/distribute/play-policies>)

Featured

### Google Play Policy

Google Play partners with you to deliver your apps and games safely to billions of people worldwide. Learn the latest policies, timeline, and implications for your apps.

[Learn more](<https://developer.android.com/distribute/play-policies>)

Content and code samples on this page are subject to the licenses described in the [Content License](</license>). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2025-01-14 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2025-01-14 UTC."],[],[]]
