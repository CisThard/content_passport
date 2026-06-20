<!-- Source: https://developer.android.com/reference/androidx/work/Worker -->

* [ Android Developers ](<https://developer.android.com/>)
  * [ Develop ](<https://developer.android.com/develop>)
  * [ API reference ](<https://developer.android.com/reference>)


Stay organized with collections  Save and categorize content based on your preferences. 

# Worker

Artifact: [androidx.work:work-runtime](</jetpack/androidx/releases/work>)

[View Source](<https://cs.android.com/search?q=file:androidx/work/Worker.kt+class:androidx.work.Worker>)

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)

* * *

[Kotlin](</reference/kotlin/androidx/work/Worker> "View this page in Kotlin") |Java
[code] 
    public abstract class [Worker](</reference/androidx/work/Worker>) extends [ListenableWorker](</reference/androidx/work/ListenableWorker>)
[/code]

[java.lang.Object](<https://developer.android.com/reference/java/lang/Object.html>)  
---  
   ↳ | [androidx.work.ListenableWorker](</reference/androidx/work/ListenableWorker>)  
  |    ↳ | [androidx.work.Worker](</reference/androidx/work/Worker>)  
  
Known direct subclasses 

[WorkManagerScheduler.SchedulerWorker](</reference/androidx/media3/exoplayer/workmanager/WorkManagerScheduler.SchedulerWorker>)

`[WorkManagerScheduler.SchedulerWorker](</reference/androidx/media3/exoplayer/workmanager/WorkManagerScheduler.SchedulerWorker>)` |  A `[Worker](</reference/androidx/work/Worker>)` that starts the target service if the requirements are met.  
---|---  
  
* * *

A class that performs work synchronously on a background thread provided by `[WorkManager](</reference/androidx/work/WorkManager>)`.

Worker classes are instantiated at runtime by WorkManager and the .doWork method is called on a pre-specified background thread (see `[Configuration.executor](</reference/androidx/work/Configuration#executor\(\)>)`). This method is for **synchronous** processing of your work, meaning that once you return from that method, the Worker is considered to be finished and will be destroyed. If you need to do your work asynchronously or call asynchronous APIs, you should use `[ListenableWorker](</reference/androidx/work/ListenableWorker>)`.

In case the work is preempted for any reason, the same instance of Worker is not reused. This means that .doWork is called exactly once per Worker instance. A new Worker is created if a unit of work needs to be rerun.

A Worker is given a maximum of ten minutes to finish its execution and return a `[androidx.work.ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)`. After this time has expired, the Worker will be signalled to stop.

## Summary

### Public constructors  
  
---  
`[Worker](</reference/androidx/work/Worker#Worker\(android.content.Context,androidx.work.WorkerParameters\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context, @[NonNull](</reference/androidx/annotation/NonNull>) [WorkerParameters](</reference/androidx/work/WorkerParameters>) workerParams)`  
  
### Public methods  
  
---  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)` |  `@[WorkerThread](</reference/androidx/annotation/WorkerThread>)  
[doWork](</reference/androidx/work/Worker#doWork\(\)>)()` Override this method to do your actual background processing.  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` |  `@[WorkerThread](</reference/androidx/annotation/WorkerThread>)  
[getForegroundInfo](</reference/androidx/work/Worker#getForegroundInfo\(\)>)()` An instance of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` if the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is important to the user.  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>)>` |  `[getForegroundInfoAsync](</reference/androidx/work/Worker#getForegroundInfoAsync\(\)>)()` Return an instance of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` if the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is important to the user.  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>)>` |  `[getForegroundInfoAsync](</reference/androidx/work/Worker#getForegroundInfoAsync\(\)>)()`  
`final @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)>` |  `[startWork](</reference/androidx/work/Worker#startWork\(\)>)()` Override this method to start your actual background processing.  
  
### Inherited methods  
  
---  
From [androidx.work.ListenableWorker](</reference/androidx/work/ListenableWorker>) | `final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Context](<https://developer.android.com/reference/android/content/Context.html>)` |  `[getApplicationContext](</reference/androidx/work/ListenableWorker#getApplicationContext\(\)>)()`  
---|---  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>)` |  `[getId](</reference/androidx/work/ListenableWorker#getId\(\)>)()`  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>)` |  `[getInputData](</reference/androidx/work/ListenableWorker#getInputData\(\)>)()`  
`final @[Nullable](<https://jspecify.dev/docs/api/org/jspecify/annotations/Nullable.html>) [Network](<https://developer.android.com/reference/android/net/Network.html>)` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 28)  
[getNetwork](</reference/androidx/work/ListenableWorker#getNetwork\(\)>)()`  
`final @[IntRange](</reference/androidx/annotation/IntRange>)(from = 0) int` |  `[getRunAttemptCount](</reference/androidx/work/ListenableWorker#getRunAttemptCount\(\)>)()`  
`final int` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 31)  
[getStopReason](</reference/androidx/work/ListenableWorker#getStopReason\(\)>)()`  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Set](<https://developer.android.com/reference/java/util/Set.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>)>` |  `[getTags](</reference/androidx/work/ListenableWorker#getTags\(\)>)()`  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>)>` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 24)  
[getTriggeredContentAuthorities](</reference/androidx/work/ListenableWorker#getTriggeredContentAuthorities\(\)>)()`  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Uri](<https://developer.android.com/reference/android/net/Uri.html>)>` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 24)  
[getTriggeredContentUris](</reference/androidx/work/ListenableWorker#getTriggeredContentUris\(\)>)()`  
`final boolean` |  `[isStopped](</reference/androidx/work/ListenableWorker#isStopped\(\)>)()`  
`void` |  `[onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)()` This method is invoked when this Worker has been told to stop.  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Void](<https://developer.android.com/reference/java/lang/Void.html>)>` |  `[setForegroundAsync](</reference/androidx/work/ListenableWorker#setForegroundAsync\(androidx.work.ForegroundInfo\)>)(@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>) foregroundInfo)` This specifies that the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is long-running or otherwise important.  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Void](<https://developer.android.com/reference/java/lang/Void.html>)>` |  `[setProgressAsync](</reference/androidx/work/ListenableWorker#setProgressAsync\(androidx.work.Data\)>)(@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>) data)` Updates `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` progress.  
  
## Public constructors

### Worker

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public [Worker](</reference/androidx/work/Worker#Worker\(android.content.Context,androidx.work.WorkerParameters\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context, @[NonNull](</reference/androidx/annotation/NonNull>) [WorkerParameters](</reference/androidx/work/WorkerParameters>) workerParams)
[/code]

## Public methods

### doWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    @[WorkerThread](</reference/androidx/annotation/WorkerThread>)  
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>) [doWork](</reference/androidx/work/Worker#doWork\(\)>)()
[/code]

Override this method to do your actual background processing. This method is called on a background thread - you are required to **synchronously** do your work and return the `[androidx.work.ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)` from this method. Once you return from this method, the Worker is considered to have finished what its doing and will be destroyed. If you need to do your work asynchronously on a thread of your own choice, see `[ListenableWorker](</reference/androidx/work/ListenableWorker>)`.

A Worker has a well defined [execution window](<https://d.android.com/reference/android/app/job/JobScheduler>) to finish its execution and return a `[androidx.work.ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)`. After this time has expired, the Worker will be signalled to stop.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)` |  The `[androidx.work.ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)` of the computation; note that dependent work will not execute if you use `[androidx.work.ListenableWorker.Result.failure](</reference/androidx/work/ListenableWorker.Result#failure\(\)>)` or `[androidx.work.ListenableWorker.Result.failure](</reference/androidx/work/ListenableWorker.Result#failure\(\)>)`  
  
### getForegroundInfo

Added in [2.8.0](</jetpack/androidx/releases/work#2.8.0>)
[code] 
    @[WorkerThread](</reference/androidx/annotation/WorkerThread>)  
    public @[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>) [getForegroundInfo](</reference/androidx/work/Worker#getForegroundInfo\(\)>)()
[/code]

An instance of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` if the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is important to the user. In this case, WorkManager provides a signal to the OS that the process should be kept alive while this work is executing.

Prior to Android S, WorkManager manages and runs a foreground service on your behalf to execute the WorkRequest, showing the notification provided in the `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)`. To update this notification subsequently, the application can use `[android.app.NotificationManager](<https://developer.android.com/reference/android/app/NotificationManager.html>)`.

Starting in Android S and above, WorkManager manages this WorkRequest using an immediate job.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` |  A `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` instance if the WorkRequest is marked immediate. For more information look at `[WorkRequest.Builder.setExpedited](</reference/androidx/work/WorkRequest.Builder#setExpedited\(androidx.work.OutOfQuotaPolicy\)>)`.  
  
Throws  
---  
`[IllegalStateException](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-illegal-state-exception/index.html>)` |  if it is not overridden and worker tries to go to foreground  
  
### getForegroundInfoAsync
[code] 
    public @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>)> [getForegroundInfoAsync](</reference/androidx/work/Worker#getForegroundInfoAsync\(\)>)()
[/code]

Return an instance of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` if the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is important to the user. In this case, WorkManager provides a signal to the OS that the process should be kept alive while this work is executing. 

Prior to Android S, WorkManager manages and runs a foreground service on your behalf to execute the WorkRequest, showing the notification provided in the `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)`. To update this notification subsequently, the application can use `[android.app.NotificationManager](<https://developer.android.com/reference/android/app/NotificationManager.html>)`. 

Starting in Android S and above, WorkManager manages this WorkRequest using an immediate job.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>)>` |  A `com.google.common.util.concurrent.ListenableFuture` of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` instance if the WorkRequest is marked immediate. For more information look at `[setExpedited](</reference/androidx/work/WorkRequest.Builder#setExpedited\(androidx.work.OutOfQuotaPolicy\)>)`.  
  
### getForegroundInfoAsync
[code] 
    public @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>)> [getForegroundInfoAsync](</reference/androidx/work/Worker#getForegroundInfoAsync\(\)>)()
[/code]

### startWork
[code] 
    public final @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)> [startWork](</reference/androidx/work/Worker#startWork\(\)>)()
[/code]

Override this method to start your actual background processing. This method is called on the main thread. 

A ListenableWorker has a well defined [execution window](<https://d.android.com/reference/android/app/job/JobScheduler>) to to finish its execution and return a `[Result](</reference/androidx/work/ListenableWorker.Result>)`. After this time has expired, the worker will be signalled to stop and its `com.google.common.util.concurrent.ListenableFuture` will be cancelled. 

The future will also be cancelled if this worker is stopped for any reason (see `[onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)`).

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)>` |  A `com.google.common.util.concurrent.ListenableFuture` with the `[Result](</reference/androidx/work/ListenableWorker.Result>)` of the computation. If you cancel this Future, WorkManager will treat this unit of work as failed.  
  
Content and code samples on this page are subject to the licenses described in the [Content License](</license>). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-02-19 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-02-19 UTC."],[],[]]
