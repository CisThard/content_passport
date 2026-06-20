<!-- Source: https://developer.android.com/reference/androidx/work/ListenableWorker -->

* [ Android Developers ](<https://developer.android.com/>)
  * [ Develop ](<https://developer.android.com/develop>)
  * [ API reference ](<https://developer.android.com/reference>)


Stay organized with collections  Save and categorize content based on your preferences. 

# ListenableWorker

Artifact: [androidx.work:work-runtime](</jetpack/androidx/releases/work>)

[View Source](<https://cs.android.com/search?q=file:androidx/work/ListenableWorker.java+class:androidx.work.ListenableWorker>)

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)

* * *

[Kotlin](</reference/kotlin/androidx/work/ListenableWorker> "View this page in Kotlin") |Java
[code] 
    public abstract class [ListenableWorker](</reference/androidx/work/ListenableWorker>)
[/code]

Known direct subclasses 

[CoroutineWorker](</reference/androidx/work/CoroutineWorker>), [RemoteListenableDelegatingWorker](</reference/androidx/work/multiprocess/RemoteListenableDelegatingWorker>), [RemoteListenableWorker](</reference/androidx/work/multiprocess/RemoteListenableWorker>), [RxWorker](</reference/androidx/work/RxWorker>), [RxWorker](</reference/androidx/work/rxjava3/RxWorker>), [Worker](</reference/androidx/work/Worker>)

`[CoroutineWorker](</reference/androidx/work/CoroutineWorker>)` |  A `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` implementation that provides interop with Kotlin Coroutines.  
---|---  
`[RemoteListenableDelegatingWorker](</reference/androidx/work/multiprocess/RemoteListenableDelegatingWorker>)` |  A worker which can delegate to an instance of RemoteListenableWorker but importantly only constructs an instance of the RemoteListenableWorker in the remote process.  
`[RemoteListenableWorker](</reference/androidx/work/multiprocess/RemoteListenableWorker>)` |  Is an implementation of a `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` that can bind to a remote process.  
`[RxWorker](</reference/androidx/work/RxWorker>)` |  RxJava2 interoperability Worker implementation.  
`[RxWorker](</reference/androidx/work/rxjava3/RxWorker>)` |  RxJava3 interoperability Worker implementation.  
`[Worker](</reference/androidx/work/Worker>)` |  A class that performs work synchronously on a background thread provided by `[WorkManager](</reference/androidx/work/WorkManager>)`.  
  
Known indirect subclasses 

[RemoteCoroutineWorker](</reference/androidx/work/multiprocess/RemoteCoroutineWorker>), [WorkManagerScheduler.SchedulerWorker](</reference/androidx/media3/exoplayer/workmanager/WorkManagerScheduler.SchedulerWorker>)

`[RemoteCoroutineWorker](</reference/androidx/work/multiprocess/RemoteCoroutineWorker>)` |  An implementation of `[RemoteListenableWorker](</reference/androidx/work/multiprocess/RemoteListenableWorker>)` that can bind to a remote process.  
---|---  
`[WorkManagerScheduler.SchedulerWorker](</reference/androidx/media3/exoplayer/workmanager/WorkManagerScheduler.SchedulerWorker>)` |  A `[Worker](</reference/androidx/work/Worker>)` that starts the target service if the requirements are met.  
  
* * *

A class that can perform work asynchronously in `[WorkManager](</reference/androidx/work/WorkManager>)`. For most cases, we recommend using `[Worker](</reference/androidx/work/Worker>)`, which offers a simple synchronous API that is executed on a pre-specified background thread. 

ListenableWorker classes are instantiated at runtime by the `[WorkerFactory](</reference/androidx/work/WorkerFactory>)` specified in the `[Configuration](</reference/androidx/work/Configuration>)`. The `[startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)` method is called on the main thread. 

In case the work is preempted and later restarted for any reason, a new instance of ListenableWorker is created. This means that `startWork` is called exactly once per ListenableWorker instance. A new ListenableWorker is created if a unit of work needs to be rerun. 

A ListenableWorker is given a maximum of ten minutes to finish its execution and return a `[Result](</reference/androidx/work/ListenableWorker.Result>)`. After this time has expired, the worker will be signalled to stop and its `com.google.common.util.concurrent.ListenableFuture` will be cancelled. 

Exercise caution when [renaming or removing ListenableWorkers](</reference/androidx/work/WorkManager#worker_class_names>) from your codebase.

## Summary

### Nested types  
  
---  
`public abstract class [ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)` The result of a `[ListenableWorker](</reference/androidx/work/ListenableWorker>)`'s computation.  
  
### Public constructors  
  
---  
`[ListenableWorker](</reference/androidx/work/ListenableWorker#ListenableWorker\(android.content.Context,androidx.work.WorkerParameters\)>)(  
    @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Context](<https://developer.android.com/reference/android/content/Context.html>) appContext,  
    @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [WorkerParameters](</reference/androidx/work/WorkerParameters>) workerParams  
)`  
  
### Public methods  
  
---  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Context](<https://developer.android.com/reference/android/content/Context.html>)` |  `[getApplicationContext](</reference/androidx/work/ListenableWorker#getApplicationContext\(\)>)()` Gets the application `[android.content.Context](<https://developer.android.com/reference/android/content/Context.html>)`.  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)>` |  `[getForegroundInfoAsync](</reference/androidx/work/ListenableWorker#getForegroundInfoAsync\(\)>)()` Return an instance of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` if the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is important to the user.  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>)` |  `[getId](</reference/androidx/work/ListenableWorker#getId\(\)>)()` Gets the ID of the `[WorkRequest](</reference/androidx/work/WorkRequest>)` that created this Worker.  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>)` |  `[getInputData](</reference/androidx/work/ListenableWorker#getInputData\(\)>)()` Gets the input data.  
`final @[Nullable](<https://jspecify.dev/docs/api/org/jspecify/annotations/Nullable.html>) [Network](<https://developer.android.com/reference/android/net/Network.html>)` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 28)  
[getNetwork](</reference/androidx/work/ListenableWorker#getNetwork\(\)>)()` Gets the `[android.net.Network](<https://developer.android.com/reference/android/net/Network.html>)` to use for this Worker.  
`final @[IntRange](</reference/androidx/annotation/IntRange>)(from = 0) int` |  `[getRunAttemptCount](</reference/androidx/work/ListenableWorker#getRunAttemptCount\(\)>)()` Gets the current run attempt count for this work.  
`final int` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 31)  
[getStopReason](</reference/androidx/work/ListenableWorker#getStopReason\(\)>)()` Returns a reason why this worker has been stopped.  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Set](<https://developer.android.com/reference/java/util/Set.html>)<[String](<https://developer.android.com/reference/java/lang/String.html>)>` |  `[getTags](</reference/androidx/work/ListenableWorker#getTags\(\)>)()` Gets a `[java.util.Set](<https://developer.android.com/reference/java/util/Set.html>)` of tags associated with this Worker's `[WorkRequest](</reference/androidx/work/WorkRequest>)`.  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<[String](<https://developer.android.com/reference/java/lang/String.html>)>` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 24)  
[getTriggeredContentAuthorities](</reference/androidx/work/ListenableWorker#getTriggeredContentAuthorities\(\)>)()` Gets the list of content authorities that caused this Worker to execute.  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<[Uri](<https://developer.android.com/reference/android/net/Uri.html>)>` |  `@[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 24)  
[getTriggeredContentUris](</reference/androidx/work/ListenableWorker#getTriggeredContentUris\(\)>)()` Gets the list of content `[android.net.Uri](<https://developer.android.com/reference/android/net/Uri.html>)`s that caused this Worker to execute.  
`final boolean` |  `[isStopped](</reference/androidx/work/ListenableWorker#isStopped\(\)>)()` Returns `true` if this Worker has been told to stop.  
`void` |  `[onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)()` This method is invoked when this Worker has been told to stop.  
`final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[Void](<https://developer.android.com/reference/java/lang/Void.html>)>` |  `[setForegroundAsync](</reference/androidx/work/ListenableWorker#setForegroundAsync\(androidx.work.ForegroundInfo\)>)(@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>) foregroundInfo)` This specifies that the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is long-running or otherwise important.  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[Void](<https://developer.android.com/reference/java/lang/Void.html>)>` |  `[setProgressAsync](</reference/androidx/work/ListenableWorker#setProgressAsync\(androidx.work.Data\)>)(@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>) data)` Updates `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` progress.  
`abstract @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)>` |  `@[MainThread](</reference/androidx/annotation/MainThread>)  
[startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)()` Override this method to start your actual background processing.  
  
## Public constructors

### ListenableWorker

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public [ListenableWorker](</reference/androidx/work/ListenableWorker#ListenableWorker\(android.content.Context,androidx.work.WorkerParameters\)>)(  
        @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Context](<https://developer.android.com/reference/android/content/Context.html>) appContext,  
        @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [WorkerParameters](</reference/androidx/work/WorkerParameters>) workerParams  
    )
[/code]

Parameters  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Context](<https://developer.android.com/reference/android/content/Context.html>) appContext` |  The application `[Context](<https://developer.android.com/reference/android/content/Context.html>)`  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [WorkerParameters](</reference/androidx/work/WorkerParameters>) workerParams` |  Parameters to setup the internal state of this worker  
  
## Public methods

### getApplicationContext

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Context](<https://developer.android.com/reference/android/content/Context.html>) [getApplicationContext](</reference/androidx/work/ListenableWorker#getApplicationContext\(\)>)()
[/code]

Gets the application `[android.content.Context](<https://developer.android.com/reference/android/content/Context.html>)`.

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Context](<https://developer.android.com/reference/android/content/Context.html>)` |  The application `[android.content.Context](<https://developer.android.com/reference/android/content/Context.html>)`  
  
### getForegroundInfoAsync

Added in [2.7.0](</jetpack/androidx/releases/work#2.7.0>)
[code] 
    public @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)> [getForegroundInfoAsync](</reference/androidx/work/ListenableWorker#getForegroundInfoAsync\(\)>)()
[/code]

Return an instance of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` if the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is important to the user. In this case, WorkManager provides a signal to the OS that the process should be kept alive while this work is executing. 

Prior to Android S, WorkManager manages and runs a foreground service on your behalf to execute the WorkRequest, showing the notification provided in the `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)`. To update this notification subsequently, the application can use `[android.app.NotificationManager](<https://developer.android.com/reference/android/app/NotificationManager.html>)`. 

Starting in Android S and above, WorkManager manages this WorkRequest using an immediate job.

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)>` |  A `com.google.common.util.concurrent.ListenableFuture` of `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)` instance if the WorkRequest is marked immediate. For more information look at `[setExpedited](</reference/androidx/work/WorkRequest.Builder#setExpedited\(androidx.work.OutOfQuotaPolicy\)>)`.  
  
### getId

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) [getId](</reference/androidx/work/ListenableWorker#getId\(\)>)()
[/code]

Gets the ID of the `[WorkRequest](</reference/androidx/work/WorkRequest>)` that created this Worker.

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>)` |  The ID of the creating `[WorkRequest](</reference/androidx/work/WorkRequest>)`  
  
### getInputData

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>) [getInputData](</reference/androidx/work/ListenableWorker#getInputData\(\)>)()
[/code]

Gets the input data. Note that in the case that there are multiple prerequisites for this Worker, the input data has been run through an `[InputMerger](</reference/androidx/work/InputMerger>)`.

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>)` |  The input data for this work  
  
See also  
---  
`[setInputMerger](</reference/androidx/work/OneTimeWorkRequest.Builder#setInputMerger\(java.lang.Class<? extends androidx.work.InputMerger>\)>)` |   
  
### getNetwork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    @[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 28)  
    public final @[Nullable](<https://jspecify.dev/docs/api/org/jspecify/annotations/Nullable.html>) [Network](<https://developer.android.com/reference/android/net/Network.html>) [getNetwork](</reference/androidx/work/ListenableWorker#getNetwork\(\)>)()
[/code]

Gets the `[android.net.Network](<https://developer.android.com/reference/android/net/Network.html>)` to use for this Worker. This method returns `null` if there is no network needed for this work request.

Returns  
---  
`@[Nullable](<https://jspecify.dev/docs/api/org/jspecify/annotations/Nullable.html>) [Network](<https://developer.android.com/reference/android/net/Network.html>)` |  The `[android.net.Network](<https://developer.android.com/reference/android/net/Network.html>)` specified by the OS to be used with this Worker  
  
### getRunAttemptCount

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[IntRange](</reference/androidx/annotation/IntRange>)(from = 0) int [getRunAttemptCount](</reference/androidx/work/ListenableWorker#getRunAttemptCount\(\)>)()
[/code]

Gets the current run attempt count for this work. Note that for periodic work, this value gets reset between periods.

Returns  
---  
`@[IntRange](</reference/androidx/annotation/IntRange>)(from = 0) int` |  The current run attempt count for this work.  
  
### getStopReason

Added in [2.9.0](</jetpack/androidx/releases/work#2.9.0>)
[code] 
    @[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 31)  
    public final int [getStopReason](</reference/androidx/work/ListenableWorker#getStopReason\(\)>)()
[/code]

Returns a reason why this worker has been stopped. Return values match values of `JobParameters.STOP_REASON_*` constants, e.g. `[STOP_REASON_CONSTRAINT_CHARGING](<https://developer.android.com/reference/android/app/job/JobParameters.html#STOP_REASON_CONSTRAINT_CHARGING>)` or `[STOP_REASON_UNKNOWN](</reference/androidx/work/WorkInfo#STOP_REASON_UNKNOWN\(\)>)`

If a worker hasn't been stopped, `[STOP_REASON_NOT_STOPPED](</reference/androidx/work/WorkInfo#STOP_REASON_NOT_STOPPED\(\)>)` is returned.

### getTags

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Set](<https://developer.android.com/reference/java/util/Set.html>)<[String](<https://developer.android.com/reference/java/lang/String.html>)> [getTags](</reference/androidx/work/ListenableWorker#getTags\(\)>)()
[/code]

Gets a `[java.util.Set](<https://developer.android.com/reference/java/util/Set.html>)` of tags associated with this Worker's `[WorkRequest](</reference/androidx/work/WorkRequest>)`.

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Set](<https://developer.android.com/reference/java/util/Set.html>)<[String](<https://developer.android.com/reference/java/lang/String.html>)>` |  The `[java.util.Set](<https://developer.android.com/reference/java/util/Set.html>)` of tags associated with this Worker's `[WorkRequest](</reference/androidx/work/WorkRequest>)`  
  
See also  
---  
`[addTag](</reference/androidx/work/WorkRequest.Builder#addTag\(java.lang.String\)>)` |   
  
### getTriggeredContentAuthorities

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    @[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 24)  
    public final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<[String](<https://developer.android.com/reference/java/lang/String.html>)> [getTriggeredContentAuthorities](</reference/androidx/work/ListenableWorker#getTriggeredContentAuthorities\(\)>)()
[/code]

Gets the list of content authorities that caused this Worker to execute. See `JobParameters#getTriggeredContentAuthorities()` for relevant `JobScheduler` code.

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<[String](<https://developer.android.com/reference/java/lang/String.html>)>` |  The list of content authorities that caused this Worker to execute  
  
### getTriggeredContentUris

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    @[RequiresApi](</reference/androidx/annotation/RequiresApi>)(value = 24)  
    public final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<[Uri](<https://developer.android.com/reference/android/net/Uri.html>)> [getTriggeredContentUris](</reference/androidx/work/ListenableWorker#getTriggeredContentUris\(\)>)()
[/code]

Gets the list of content `[android.net.Uri](<https://developer.android.com/reference/android/net/Uri.html>)`s that caused this Worker to execute. See `JobParameters#getTriggeredContentUris()` for relevant `JobScheduler` code.

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [List](<https://developer.android.com/reference/java/util/List.html>)<[Uri](<https://developer.android.com/reference/android/net/Uri.html>)>` |  The list of content `[android.net.Uri](<https://developer.android.com/reference/android/net/Uri.html>)`s that caused this Worker to execute  
  
See also  
---  
`[addContentUriTrigger](</reference/androidx/work/Constraints.Builder#addContentUriTrigger\(android.net.Uri,boolean\)>)` |   
  
### isStopped

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final boolean [isStopped](</reference/androidx/work/ListenableWorker#isStopped\(\)>)()
[/code]

Returns `true` if this Worker has been told to stop. This could be because of an explicit cancellation signal by the user, or because the system has decided to preempt the task. In these cases, the results of the work will be ignored by WorkManager and it is safe to stop the computation. WorkManager will retry the work at a later time if necessary.

Returns  
---  
`boolean` |  `true` if the work operation has been interrupted  
  
### onStopped

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public void [onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)()
[/code]

This method is invoked when this Worker has been told to stop. At this point, the `com.google.common.util.concurrent.ListenableFuture` returned by the instance of `[startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)` is also cancelled. This could happen due to an explicit cancellation signal by the user, or because the system has decided to preempt the task. In these cases, the results of the work will be ignored by WorkManager. All processing in this method should be lightweight - there are no contractual guarantees about which thread will invoke this call, so this should not be a long-running or blocking operation.

### setForegroundAsync

Added in [2.3.0](</jetpack/androidx/releases/work#2.3.0>)
[code] 
    public final @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[Void](<https://developer.android.com/reference/java/lang/Void.html>)> [setForegroundAsync](</reference/androidx/work/ListenableWorker#setForegroundAsync\(androidx.work.ForegroundInfo\)>)(@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>) foregroundInfo)
[/code]

This specifies that the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is long-running or otherwise important. In this case, WorkManager provides a signal to the OS that the process should be kept alive if possible while this work is executing. 

Calls to `setForegroundAsync` *must* complete before a `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` signals completion by returning a `[Result](</reference/androidx/work/ListenableWorker.Result>)`. 

Under the hood, WorkManager manages and runs a foreground service on your behalf to execute this WorkRequest, showing the notification provided in `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)`. 

Calling `setForegroundAsync` will fail with an `[IllegalStateException](<https://developer.android.com/reference/java/lang/IllegalStateException.html>)` when the process is subject to foreground service restrictions. Consider using `[setExpedited](</reference/androidx/work/WorkRequest.Builder#setExpedited\(androidx.work.OutOfQuotaPolicy\)>)` and `[getForegroundInfoAsync](</reference/androidx/work/ListenableWorker#getForegroundInfoAsync\(\)>)` instead.

Parameters  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ForegroundInfo](</reference/androidx/work/ForegroundInfo>) foregroundInfo` |  The `[ForegroundInfo](</reference/androidx/work/ForegroundInfo>)`  
  
Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[Void](<https://developer.android.com/reference/java/lang/Void.html>)>` |  A `com.google.common.util.concurrent.ListenableFuture` which resolves after the `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` transitions to running in the context of a foreground `[android.app.Service](<https://developer.android.com/reference/android/app/Service.html>)`.  
  
### setProgressAsync

Added in [2.3.0](</jetpack/androidx/releases/work#2.3.0>)
[code] 
    public @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[Void](<https://developer.android.com/reference/java/lang/Void.html>)> [setProgressAsync](</reference/androidx/work/ListenableWorker#setProgressAsync\(androidx.work.Data\)>)(@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>) data)
[/code]

Updates `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` progress.

Parameters  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [Data](</reference/androidx/work/Data>) data` |  The progress `[Data](</reference/androidx/work/Data>)`  
  
Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[Void](<https://developer.android.com/reference/java/lang/Void.html>)>` |  A `com.google.common.util.concurrent.ListenableFuture` which resolves after progress is persisted. Cancelling this future is a no-op.  
  
### startWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    @[MainThread](</reference/androidx/annotation/MainThread>)  
    public abstract @[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)> [startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)()
[/code]

Override this method to start your actual background processing. This method is called on the main thread. 

A ListenableWorker has a well defined [execution window](<https://d.android.com/reference/android/app/job/JobScheduler>) to to finish its execution and return a `[Result](</reference/androidx/work/ListenableWorker.Result>)`. After this time has expired, the worker will be signalled to stop and its `com.google.common.util.concurrent.ListenableFuture` will be cancelled. 

The future will also be cancelled if this worker is stopped for any reason (see `[onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)`).

Returns  
---  
`@[NonNull](<https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[ListenableWorker.Result](</reference/androidx/work/ListenableWorker.Result>)>` |  A `com.google.common.util.concurrent.ListenableFuture` with the `[Result](</reference/androidx/work/ListenableWorker.Result>)` of the computation. If you cancel this Future, WorkManager will treat this unit of work as failed.  
  
Content and code samples on this page are subject to the licenses described in the [Content License](</license>). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-01-30 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-01-30 UTC."],[],[]]
