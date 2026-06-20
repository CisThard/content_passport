<!-- Source: https://developer.android.com/reference/androidx/work/WorkManager -->

* [ Android Developers ](<https://developer.android.com/>)
  * [ Develop ](<https://developer.android.com/develop>)
  * [ API reference ](<https://developer.android.com/reference>)


Stay organized with collections  Save and categorize content based on your preferences. 

# WorkManager

Artifact: [androidx.work:work-runtime](</jetpack/androidx/releases/work>)

[View Source](<https://cs.android.com/search?q=file:androidx/work/WorkManager.kt+class:androidx.work.WorkManager>)

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)

* * *

[Kotlin](</reference/kotlin/androidx/work/WorkManager> "View this page in Kotlin") |Java
[code] 
    public abstract class [WorkManager](</reference/androidx/work/WorkManager>)
[/code]

* * *

WorkManager is the recommended library for persistent work. Scheduled work is guaranteed to execute sometime after its `[Constraints](</reference/androidx/work/Constraints>)` are met. WorkManager allows observation of work status and the ability to create complex chains of work.

WorkManager uses an underlying job dispatching service when available based on the following criteria:

  * Uses JobScheduler for API 23+

  * Uses a custom AlarmManager + BroadcastReceiver implementation for API 14-22


All work must be done in a `[ListenableWorker](</reference/androidx/work/ListenableWorker>)` class. A simple implementation, `[Worker](</reference/androidx/work/Worker>)`, is recommended as the starting point for most developers. With the optional dependencies, you can also use `CoroutineWorker` or `RxWorker`. All background work is given a maximum of ten minutes to finish its execution. After this time has expired, the worker will be signalled to stop.

There are two types of work supported by WorkManager: `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` and `[PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>)`. You can enqueue requests using WorkManager as follows:
[code] 
    WorkManager workManager = WorkManager.getInstance(Context);  
    workManager.enqueue(new OneTimeWorkRequest.Builder(FooWorker.class).build());
[/code]

A `[WorkRequest](</reference/androidx/work/WorkRequest>)` has an associated id that can be used for lookups and observation as follows:
[code] 
    WorkRequest request = new OneTimeWorkRequest.Builder(FooWorker.class).build();  
    workManager.enqueue(request);  
    LiveData<WorkInfo> status = workManager.getWorkInfoByIdLiveData(request.getId());  
    status.observe(...);
[/code]

You can also use the id for cancellation:
[code] 
    WorkRequest request = new OneTimeWorkRequest.Builder(FooWorker.class).build();  
    workManager.enqueue(request);  
    workManager.cancelWorkById(request.getId());
[/code]

You can chain work as follows:
[code] 
    WorkRequest request1 = new OneTimeWorkRequest.Builder(FooWorker.class).build();  
    WorkRequest request2 = new OneTimeWorkRequest.Builder(BarWorker.class).build();  
    WorkRequest request3 = new OneTimeWorkRequest.Builder(BazWorker.class).build();  
    workManager.beginWith(request1, request2).then(request3).enqueue();
[/code]

Each call to `[beginWith](</reference/androidx/work/WorkManager#beginWith\(androidx.work.OneTimeWorkRequest\)>)` returns a `[WorkContinuation](</reference/androidx/work/WorkContinuation>)` upon which you can call `[WorkContinuation.then](</reference/androidx/work/WorkContinuation#then\(androidx.work.OneTimeWorkRequest\)>)` with a single `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` or a list of `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` to chain further work. This allows for creation of complex chains of work. For example, to create a chain like this:
[code] 
             A  
             |  
       +----------+  
       |          |  
       B          C  
       |  
    +----+  
    |    |  
    D    E
[/code]

you would enqueue them as follows:
[code] 
    WorkContinuation continuation = workManager.beginWith(A);  
    continuation.then(B).then(D, E).enqueue();  // A is implicitly enqueued here  
    continuation.then(C).enqueue();
[/code]

Work is eligible for execution when all of its prerequisites are complete. If any of its prerequisites fail or are cancelled, the work will never run.

WorkRequests can accept `[Constraints](</reference/androidx/work/Constraints>)`, inputs (see `[Data](</reference/androidx/work/Data>)`), and backoff criteria. WorkRequests can be tagged with human-readable Strings (see `[WorkRequest.Builder.addTag](</reference/androidx/work/WorkRequest.Builder#addTag\(kotlin.String\)>)`), and chains of work can be given a uniquely-identifiable name (see `[beginUniqueWork](</reference/androidx/work/WorkManager#beginUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,androidx.work.OneTimeWorkRequest\)>)`).

### Initializing WorkManager

By default, WorkManager auto-initializes itself using a built-in `ContentProvider`. ContentProviders are created and run before the `Application` object, so this allows the WorkManager singleton to be setup before your code can run in most cases. This is suitable for most developers. However, you can provide a custom `[Configuration](</reference/androidx/work/Configuration>)` by using `[Configuration.Provider](</reference/androidx/work/Configuration.Provider>)` or `[WorkManager.initialize](</reference/androidx/work/WorkManager#initialize\(android.content.Context,androidx.work.Configuration\)>)`.

### Renaming and Removing ListenableWorker Classes

Exercise caution in renaming classes derived from `[ListenableWorker](</reference/androidx/work/ListenableWorker>)`s. WorkManager stores the class name in its internal database when the `[WorkRequest](</reference/androidx/work/WorkRequest>)` is enqueued so it can later create an instance of that worker when constraints are met. Unless otherwise specified in the WorkManager `[Configuration](</reference/androidx/work/Configuration>)`, this is done in the default `[WorkerFactory](</reference/androidx/work/WorkerFactory>)` which tries to reflectively create the ListenableWorker object. Therefore, renaming or removing these classes is dangerous - if there is pending work with the given class, it will fail permanently if the class cannot be found. If you are using a custom WorkerFactory, make sure you properly handle cases where the class is not found so that your code does not crash.

In case it is desirable to rename a class, implement a custom WorkerFactory that instantiates the right ListenableWorker for the old class name.

## Summary

### Nested types  
  
---  
`public enum [WorkManager.UpdateResult](</reference/androidx/work/WorkManager.UpdateResult>) extends [Enum](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-enum/index.html>)` An enumeration of results for `[WorkManager.updateWork](</reference/androidx/work/WorkManager#updateWork\(androidx.work.WorkRequest\)>)` method.  
  
### Public methods  
  
---  
`final @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  `[beginUniqueWork](</reference/androidx/work/WorkManager#beginUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,androidx.work.OneTimeWorkRequest\)>)(  
    @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request  
)` This method allows you to begin unique chains of work for situations where you only want one chain with a given name to be active at a time.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  `[beginUniqueWork](</reference/androidx/work/WorkManager#beginUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,kotlin.collections.List\)>)(  
    @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests  
)` This method allows you to begin unique chains of work for situations where you only want one chain with a given name to be active at a time.  
`final @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  `[beginWith](</reference/androidx/work/WorkManager#beginWith\(androidx.work.OneTimeWorkRequest\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request)` Begins a chain with one or more `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`s, which can be enqueued together in the future using `[WorkContinuation.enqueue](</reference/androidx/work/WorkContinuation#enqueue\(\)>)`.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  `[beginWith](</reference/androidx/work/WorkManager#beginWith\(kotlin.collections.List\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests)` Begins a chain with one or more `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`s, which can be enqueued together in the future using `[WorkContinuation.enqueue](</reference/androidx/work/WorkContinuation#enqueue\(\)>)`.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[cancelAllWork](</reference/androidx/work/WorkManager#cancelAllWork\(\)>)()` Cancels all unfinished work.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[cancelAllWorkByTag](</reference/androidx/work/WorkManager#cancelAllWorkByTag\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)` Cancels all unfinished work with the given tag.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[cancelUniqueWork](</reference/androidx/work/WorkManager#cancelUniqueWork\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)` Cancels all unfinished work in the work chain with the given name.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[cancelWorkById](</reference/androidx/work/WorkManager#cancelWorkById\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)` Cancels work with the given id if it isn't finished.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [PendingIntent](<https://developer.android.com/reference/android/app/PendingIntent.html>)` |  `[createCancelPendingIntent](</reference/androidx/work/WorkManager#createCancelPendingIntent\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)` Creates a `[PendingIntent](<https://developer.android.com/reference/android/app/PendingIntent.html>)` which can be used to cancel a `[WorkRequest](</reference/androidx/work/WorkRequest>)` with the given `id`.  
`final @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[enqueue](</reference/androidx/work/WorkManager#enqueue\(androidx.work.WorkRequest\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>) request)` Enqueues one item for background processing.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[enqueue](</reference/androidx/work/WorkManager#enqueue\(kotlin.collections.List\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>)> requests)` Enqueues one or more items for background processing.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[enqueueUniquePeriodicWork](</reference/androidx/work/WorkManager#enqueueUniquePeriodicWork\(kotlin.String,androidx.work.ExistingPeriodicWorkPolicy,androidx.work.PeriodicWorkRequest\)>)(  
    @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingPeriodicWorkPolicy](</reference/androidx/work/ExistingPeriodicWorkPolicy>) existingPeriodicWorkPolicy,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>) request  
)` This method allows you to enqueue a uniquely-named `[PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>)`, where only one PeriodicWorkRequest of a particular name can be active at a time.  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[enqueueUniqueWork](</reference/androidx/work/WorkManager#enqueueUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,androidx.work.OneTimeWorkRequest\)>)(  
    @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request  
)` This method allows you to enqueue `work` requests to a uniquely-named `[WorkContinuation](</reference/androidx/work/WorkContinuation>)`, where only one continuation of a particular name can be active at a time.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[enqueueUniqueWork](</reference/androidx/work/WorkManager#enqueueUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,kotlin.collections.List\)>)(  
    @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
    @[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests  
)` This method allows you to enqueue `work` requests to a uniquely-named `[WorkContinuation](</reference/androidx/work/WorkContinuation>)`, where only one continuation of a particular name can be active at a time.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Configuration](</reference/androidx/work/Configuration>)` |  `[getConfiguration](</reference/androidx/work/WorkManager#getConfiguration\(\)>)()` The `[Configuration](</reference/androidx/work/Configuration>)` instance that `[WorkManager](</reference/androidx/work/WorkManager>)` was initialized with.  
`static @[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager](</reference/androidx/work/WorkManager>)` |  `~~[getInstance](</reference/androidx/work/WorkManager#getInstance\(\)>)~~()` **This method is deprecated.** Use the overload receiving Context  
`static @[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager](</reference/androidx/work/WorkManager>)` |  `[getInstance](</reference/androidx/work/WorkManager#getInstance\(android.content.Context\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context)` Retrieves the `default` singleton instance of `[WorkManager](</reference/androidx/work/WorkManager>)`.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Long](<https://developer.android.com/reference/java/lang/Long.html>)>` |  `[getLastCancelAllTimeMillis](</reference/androidx/work/WorkManager#getLastCancelAllTimeMillis\(\)>)()` Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the last time all work was cancelled.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Long](<https://developer.android.com/reference/java/lang/Long.html>)>` |  `[getLastCancelAllTimeMillisLiveData](</reference/androidx/work/WorkManager#getLastCancelAllTimeMillisLiveData\(\)>)()` Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the last time all work was cancelled.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[WorkInfo](</reference/androidx/work/WorkInfo>)>` |  `[getWorkInfoById](</reference/androidx/work/WorkManager#getWorkInfoById\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)` Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for a given work id.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<[WorkInfo](</reference/androidx/work/WorkInfo>)>` |  `[getWorkInfoByIdFlow](</reference/androidx/work/WorkManager#getWorkInfoByIdFlow\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)` Gets a `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for a given work id.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<[WorkInfo](</reference/androidx/work/WorkInfo>)>` |  `[getWorkInfoByIdLiveData](</reference/androidx/work/WorkManager#getWorkInfoByIdLiveData\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)` Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for a given work id.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfos](</reference/androidx/work/WorkManager#getWorkInfos\(androidx.work.WorkQuery\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery)` Gets the `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work referenced by the `[WorkQuery](</reference/androidx/work/WorkQuery>)` specification.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosByTag](</reference/androidx/work/WorkManager#getWorkInfosByTag\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)` Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work for a given tag.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosByTagFlow](</reference/androidx/work/WorkManager#getWorkInfosByTagFlow\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)` Gets a `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work for a given tag.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosByTagLiveData](</reference/androidx/work/WorkManager#getWorkInfosByTagLiveData\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)` Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work for a given tag.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosFlow](</reference/androidx/work/WorkManager#getWorkInfosFlow\(androidx.work.WorkQuery\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery)` Gets the `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work referenced by the `[WorkQuery](</reference/androidx/work/WorkQuery>)` specification.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosForUniqueWork](</reference/androidx/work/WorkManager#getWorkInfosForUniqueWork\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)` Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work in a work chain with a given unique name.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosForUniqueWorkFlow](</reference/androidx/work/WorkManager#getWorkInfosForUniqueWorkFlow\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)` Gets a `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work in a work chain with a given unique name.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosForUniqueWorkLiveData](</reference/androidx/work/WorkManager#getWorkInfosForUniqueWorkLiveData\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)` Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work in a work chain with a given unique name.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  `[getWorkInfosLiveData](</reference/androidx/work/WorkManager#getWorkInfosLiveData\(androidx.work.WorkQuery\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery)` Gets the `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work referenced by the `[WorkQuery](</reference/androidx/work/WorkQuery>)` specification.  
`static void` |  `[initialize](</reference/androidx/work/WorkManager#initialize\(android.content.Context,androidx.work.Configuration\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context, @[NonNull](</reference/androidx/annotation/NonNull>) [Configuration](</reference/androidx/work/Configuration>) configuration)` Used to do a one-time initialization of the `[WorkManager](</reference/androidx/work/WorkManager>)` singleton with a custom `[Configuration](</reference/androidx/work/Configuration>)`.  
`static boolean` |  `[isInitialized](</reference/androidx/work/WorkManager#isInitialized\(\)>)()` Provides a way to check if `[WorkManager](</reference/androidx/work/WorkManager>)` is initialized in this process.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  `[pruneWork](</reference/androidx/work/WorkManager#pruneWork\(\)>)()` Prunes all eligible finished work from the internal database.  
`abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager.UpdateResult](</reference/androidx/work/WorkManager.UpdateResult>)>` |  `[updateWork](</reference/androidx/work/WorkManager#updateWork\(androidx.work.WorkRequest\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>) request)` Updates the work with the new specification.  
  
## Public methods

### beginUniqueWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>) [beginUniqueWork](</reference/androidx/work/WorkManager#beginUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,androidx.work.OneTimeWorkRequest\)>)(  
        @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request  
    )
[/code]

This method allows you to begin unique chains of work for situations where you only want one chain with a given name to be active at a time. For example, you may only want one sync operation to be active. If there is one pending, you can choose to let it run or replace it with your new work.

The `uniqueWorkName` uniquely identifies this set of work.

If this method determines that new work should be enqueued and run, all records of previous work with `uniqueWorkName` will be pruned. If this method determines that new work should NOT be run, then the entire chain will be considered a no-op.

If any work in the chain fails or is cancelled, all of its dependent work inherits that state and will never run. This is particularly important if you are using `APPEND` as your `[ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>)`.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  A unique name which for this chain of work  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy` |  An `[ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>)`  
`@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request` |  The `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` to enqueue. `REPLACE` ensures that if there is pending work labelled with `uniqueWorkName`, it will be cancelled and the new work will run. `KEEP` will run the new sequence of work only if there is no pending work labelled with `uniqueWorkName`. `APPEND` will create a new sequence of work if there is no existing work with `uniqueWorkName`; otherwise, `work` will be added as a child of all leaf nodes labelled with `uniqueWorkName`.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  A `[WorkContinuation](</reference/androidx/work/WorkContinuation>)` that allows further chaining  
  
### beginUniqueWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>) [beginUniqueWork](</reference/androidx/work/WorkManager#beginUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,kotlin.collections.List\)>)(  
        @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests  
    )
[/code]

This method allows you to begin unique chains of work for situations where you only want one chain with a given name to be active at a time. For example, you may only want one sync operation to be active. If there is one pending, you can choose to let it run or replace it with your new work.

The `uniqueWorkName` uniquely identifies this set of work.

If this method determines that new work should be enqueued and run, all records of previous work with `uniqueWorkName` will be pruned. If this method determines that new work should NOT be run, then the entire chain will be considered a no-op.

If any work in the chain fails or is cancelled, all of its dependent work inherits that state and will never run. This is particularly important if you are using `APPEND` as your `[ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>)`.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  A unique name which for this chain of work  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy` |  An `[ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>)`; see below for more information  
`@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests` |  One or more `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` to enqueue. `REPLACE` ensures that if there is pending work labelled with `uniqueWorkName`, it will be cancelled and the new work will run. `KEEP` will run the new sequence of work only if there is no pending work labelled with `uniqueWorkName`. `APPEND` will create a new sequence of work if there is no existing work with `uniqueWorkName`; otherwise, `work` will be added as a child of all leaf nodes labelled with `uniqueWorkName`.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  A `[WorkContinuation](</reference/androidx/work/WorkContinuation>)` that allows further chaining  
  
### beginWith

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>) [beginWith](</reference/androidx/work/WorkManager#beginWith\(androidx.work.OneTimeWorkRequest\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request)
[/code]

Begins a chain with one or more `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`s, which can be enqueued together in the future using `[WorkContinuation.enqueue](</reference/androidx/work/WorkContinuation#enqueue\(\)>)`.

If any work in the chain fails or is cancelled, all of its dependent work inherits that state and will never run.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request` |  One or more `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` to start a chain of work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  A `[WorkContinuation](</reference/androidx/work/WorkContinuation>)` that allows for further chaining of dependent `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`  
  
### beginWith

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>) [beginWith](</reference/androidx/work/WorkManager#beginWith\(kotlin.collections.List\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests)
[/code]

Begins a chain with one or more `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`s, which can be enqueued together in the future using `[WorkContinuation.enqueue](</reference/androidx/work/WorkContinuation#enqueue\(\)>)`.

If any work in the chain fails or is cancelled, all of its dependent work inherits that state and will never run.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests` |  One or more `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` to start a chain of work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkContinuation](</reference/androidx/work/WorkContinuation>)` |  A `[WorkContinuation](</reference/androidx/work/WorkContinuation>)` that allows for further chaining of dependent `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`  
  
### cancelAllWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [cancelAllWork](</reference/androidx/work/WorkManager#cancelAllWork\(\)>)()
[/code]

Cancels all unfinished work. **Use this method with extreme caution!** By invoking it, you will potentially affect other modules or libraries in your codebase. It is strongly recommended that you use one of the other cancellation methods at your disposal.

Upon cancellation, `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` returned by `[ListenableWorker.startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)` will be cancelled. Also `[ListenableWorker.onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)` will be invoked for any affected workers.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the cancelAllWork has completed  
  
### cancelAllWorkByTag

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [cancelAllWorkByTag](</reference/androidx/work/WorkManager#cancelAllWorkByTag\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)
[/code]

Cancels all unfinished work with the given tag. Note that cancellation is a best-effort policy and work that is already executing may continue to run. Upon cancellation, `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` returned by `[ListenableWorker.startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)` will be cancelled. Also `[ListenableWorker.onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)` will be invoked for any affected workers.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag` |  The tag used to identify the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the cancelAllWorkByTag has completed  
  
### cancelUniqueWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [cancelUniqueWork](</reference/androidx/work/WorkManager#cancelUniqueWork\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)
[/code]

Cancels all unfinished work in the work chain with the given name. Note that cancellation is a best-effort policy and work that is already executing may continue to run. Upon cancellation, `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` returned by `[ListenableWorker.startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)` will be cancelled. Also `[ListenableWorker.onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)` will be invoked for any affected workers.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  The unique name used to identify the chain of work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the cancelUniqueWork has completed  
  
### cancelWorkById

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [cancelWorkById](</reference/androidx/work/WorkManager#cancelWorkById\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)
[/code]

Cancels work with the given id if it isn't finished. Note that cancellation is a best-effort policy and work that is already executing may continue to run. Upon cancellation, `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` returned by `[ListenableWorker.startWork](</reference/androidx/work/ListenableWorker#startWork\(\)>)` will be cancelled. Also `[ListenableWorker.onStopped](</reference/androidx/work/ListenableWorker#onStopped\(\)>)` will be invoked for any affected workers.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id` |  The id of the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the cancelWorkById has completed  
  
### createCancelPendingIntent

Added in [2.3.0](</jetpack/androidx/releases/work#2.3.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [PendingIntent](<https://developer.android.com/reference/android/app/PendingIntent.html>) [createCancelPendingIntent](</reference/androidx/work/WorkManager#createCancelPendingIntent\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)
[/code]

Creates a `[PendingIntent](<https://developer.android.com/reference/android/app/PendingIntent.html>)` which can be used to cancel a `[WorkRequest](</reference/androidx/work/WorkRequest>)` with the given `id`.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id` |  The `[WorkRequest](</reference/androidx/work/WorkRequest>)` id.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [PendingIntent](<https://developer.android.com/reference/android/app/PendingIntent.html>)` |  The `[PendingIntent](<https://developer.android.com/reference/android/app/PendingIntent.html>)` that can be used to cancel the `[WorkRequest](</reference/androidx/work/WorkRequest>)`.  
  
### enqueue

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public final @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [enqueue](</reference/androidx/work/WorkManager#enqueue\(androidx.work.WorkRequest\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>) request)
[/code]

Enqueues one item for background processing.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>) request` |  The `[WorkRequest](</reference/androidx/work/WorkRequest>)` to enqueue  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the enqueue has completed  
  
### enqueue
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [enqueue](</reference/androidx/work/WorkManager#enqueue\(kotlin.collections.List\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>)> requests)
[/code]

Enqueues one or more items for background processing.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>)> requests` |  One or more `[WorkRequest](</reference/androidx/work/WorkRequest>)` to enqueue  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the enqueue has completed  
  
### enqueueUniquePeriodicWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [enqueueUniquePeriodicWork](</reference/androidx/work/WorkManager#enqueueUniquePeriodicWork\(kotlin.String,androidx.work.ExistingPeriodicWorkPolicy,androidx.work.PeriodicWorkRequest\)>)(  
        @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingPeriodicWorkPolicy](</reference/androidx/work/ExistingPeriodicWorkPolicy>) existingPeriodicWorkPolicy,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>) request  
    )
[/code]

This method allows you to enqueue a uniquely-named `[PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>)`, where only one PeriodicWorkRequest of a particular name can be active at a time. For example, you may only want one sync operation to be active. If there is one pending, you can choose to let it run or replace it with your new work.

The `uniqueWorkName` uniquely identifies this PeriodicWorkRequest.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  A unique name which for this operation  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ExistingPeriodicWorkPolicy](</reference/androidx/work/ExistingPeriodicWorkPolicy>) existingPeriodicWorkPolicy` |  An `[ExistingPeriodicWorkPolicy](</reference/androidx/work/ExistingPeriodicWorkPolicy>)`  
`@[NonNull](</reference/androidx/annotation/NonNull>) [PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>) request` |  A `[PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>)` to enqueue. `REPLACE` ensures that if there is pending work labelled with `uniqueWorkName`, it will be cancelled and the new work will run. `KEEP` will run the new PeriodicWorkRequest only if there is no pending work labelled with `uniqueWorkName`.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the enqueue has completed  
  
### enqueueUniqueWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [enqueueUniqueWork](</reference/androidx/work/WorkManager#enqueueUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,androidx.work.OneTimeWorkRequest\)>)(  
        @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request  
    )
[/code]

This method allows you to enqueue `work` requests to a uniquely-named `[WorkContinuation](</reference/androidx/work/WorkContinuation>)`, where only one continuation of a particular name can be active at a time. For example, you may only want one sync operation to be active. If there is one pending, you can choose to let it run or replace it with your new work.

The `uniqueWorkName` uniquely identifies this `[WorkContinuation](</reference/androidx/work/WorkContinuation>)`.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  A unique name which for this operation  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy` |  An `[ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>)`; see below for more information  
`@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>) request` |  The `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`s to enqueue. `REPLACE` ensures that if there is pending work labelled with `uniqueWorkName`, it will be cancelled and the new work will run. `KEEP` will run the new OneTimeWorkRequests only if there is no pending work labelled with `uniqueWorkName`. `APPEND` will append the OneTimeWorkRequests as leaf nodes labelled with `uniqueWorkName`.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the enqueue has completed  
  
### enqueueUniqueWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [enqueueUniqueWork](</reference/androidx/work/WorkManager#enqueueUniqueWork\(kotlin.String,androidx.work.ExistingWorkPolicy,kotlin.collections.List\)>)(  
        @[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy,  
        @[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests  
    )
[/code]

This method allows you to enqueue `work` requests to a uniquely-named `[WorkContinuation](</reference/androidx/work/WorkContinuation>)`, where only one continuation of a particular name can be active at a time. For example, you may only want one sync operation to be active. If there is one pending, you can choose to let it run or replace it with your new work.

The `uniqueWorkName` uniquely identifies this `[WorkContinuation](</reference/androidx/work/WorkContinuation>)`.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  A unique name which for this operation  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>) existingWorkPolicy` |  An `[ExistingWorkPolicy](</reference/androidx/work/ExistingWorkPolicy>)`  
`@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)> requests` |  `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)`s to enqueue. `REPLACE` ensures that if there is pending work labelled with `uniqueWorkName`, it will be cancelled and the new work will run. `KEEP` will run the new OneTimeWorkRequests only if there is no pending work labelled with `uniqueWorkName`. `APPEND` will append the OneTimeWorkRequests as leaf nodes labelled with `uniqueWorkName`.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the enqueue has completed  
  
### getConfiguration

Added in [2.8.0](</jetpack/androidx/releases/work#2.8.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Configuration](</reference/androidx/work/Configuration>) [getConfiguration](</reference/androidx/work/WorkManager#getConfiguration\(\)>)()
[/code]

The `[Configuration](</reference/androidx/work/Configuration>)` instance that `[WorkManager](</reference/androidx/work/WorkManager>)` was initialized with.

### getInstance

Added in [2.10.0](</jetpack/androidx/releases/work#2.10.0>)

Deprecated in [2.10.0](</jetpack/androidx/releases/work#2.10.0>)
[code] 
    public static @[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager](</reference/androidx/work/WorkManager>) ~~[getInstance](</reference/androidx/work/WorkManager#getInstance\(\)>)~~()
[/code]

**This method is deprecated.**  
Use the overload receiving Context

Retrieves the `default` singleton instance of `[WorkManager](</reference/androidx/work/WorkManager>)`.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager](</reference/androidx/work/WorkManager>)` |  The singleton instance of `[WorkManager](</reference/androidx/work/WorkManager>)`; this may be `null` in unusual circumstances where you have disabled automatic initialization and have failed to manually call `[initialize](</reference/androidx/work/WorkManager#initialize\(android.content.Context,androidx.work.Configuration\)>)`.  
  
Throws  
---  
`[IllegalStateException](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-illegal-state-exception/index.html>)` |  If WorkManager is not initialized properly as per the exception message.  
  
### getInstance

Added in [2.10.0](</jetpack/androidx/releases/work#2.10.0>)
[code] 
    public static @[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager](</reference/androidx/work/WorkManager>) [getInstance](</reference/androidx/work/WorkManager#getInstance\(android.content.Context\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context)
[/code]

Retrieves the `default` singleton instance of `[WorkManager](</reference/androidx/work/WorkManager>)`.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context` |  A `[Context](<https://developer.android.com/reference/android/content/Context.html>)` for on-demand initialization.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager](</reference/androidx/work/WorkManager>)` |  The singleton instance of `[WorkManager](</reference/androidx/work/WorkManager>)`; this may be `null` in unusual circumstances where you have disabled automatic initialization and have failed to manually call `[initialize](</reference/androidx/work/WorkManager#initialize\(android.content.Context,androidx.work.Configuration\)>)`.  
  
Throws  
---  
`[IllegalStateException](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-illegal-state-exception/index.html>)` |  If WorkManager is not initialized properly  
  
### getLastCancelAllTimeMillis

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Long](<https://developer.android.com/reference/java/lang/Long.html>)> [getLastCancelAllTimeMillis](</reference/androidx/work/WorkManager#getLastCancelAllTimeMillis\(\)>)()
[/code]

Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the last time all work was cancelled. This method is intended for use by library and module developers who have dependent data in their own repository that must be updated or deleted in case someone cancels their work without their prior knowledge.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Long](<https://developer.android.com/reference/java/lang/Long.html>)>` |  A `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the timestamp (`System#getCurrentTimeMillis()`) when `[cancelAllWork](</reference/androidx/work/WorkManager#cancelAllWork\(\)>)` was last invoked; this timestamp may be `0L` if this never occurred  
  
### getLastCancelAllTimeMillisLiveData

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Long](<https://developer.android.com/reference/java/lang/Long.html>)> [getLastCancelAllTimeMillisLiveData](</reference/androidx/work/WorkManager#getLastCancelAllTimeMillisLiveData\(\)>)()
[/code]

Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the last time all work was cancelled. This method is intended for use by library and module developers who have dependent data in their own repository that must be updated or deleted in case someone cancels their work without their prior knowledge.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [Long](<https://developer.android.com/reference/java/lang/Long.html>)>` |  A `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the timestamp (`System#getCurrentTimeMillis()`) when `[cancelAllWork](</reference/androidx/work/WorkManager#cancelAllWork\(\)>)` was last invoked; this timestamp may be `0L` if this never occurred  
  
### getWorkInfoById

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[WorkInfo](</reference/androidx/work/WorkInfo>)> [getWorkInfoById](</reference/androidx/work/WorkManager#getWorkInfoById\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)
[/code]

Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for a given work id.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id` |  The id of the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<[WorkInfo](</reference/androidx/work/WorkInfo>)>` |  A `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` associated with `id`; note that this `[WorkInfo](</reference/androidx/work/WorkInfo>)` may be `null` if `id` is not known to WorkManager  
  
### getWorkInfoByIdFlow

Added in [2.9.0](</jetpack/androidx/releases/work#2.9.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<[WorkInfo](</reference/androidx/work/WorkInfo>)> [getWorkInfoByIdFlow](</reference/androidx/work/WorkManager#getWorkInfoByIdFlow\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)
[/code]

Gets a `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for a given work id.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id` |  The id of the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<[WorkInfo](</reference/androidx/work/WorkInfo>)>` |  A `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` associated with `id`; note that this `[WorkInfo](</reference/androidx/work/WorkInfo>)` may be `null` if `id` is not known to WorkManager.  
  
### getWorkInfoByIdLiveData

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<[WorkInfo](</reference/androidx/work/WorkInfo>)> [getWorkInfoByIdLiveData](</reference/androidx/work/WorkManager#getWorkInfoByIdLiveData\(java.util.UUID\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id)
[/code]

Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for a given work id.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [UUID](<https://developer.android.com/reference/java/util/UUID.html>) id` |  The id of the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<[WorkInfo](</reference/androidx/work/WorkInfo>)>` |  A `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` associated with `id`; note that this `[WorkInfo](</reference/androidx/work/WorkInfo>)` may be `null` if `id` is not known to WorkManager.  
  
### getWorkInfos

Added in [2.4.0](</jetpack/androidx/releases/work#2.4.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfos](</reference/androidx/work/WorkManager#getWorkInfos\(androidx.work.WorkQuery\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery)
[/code]

Gets the `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work referenced by the `[WorkQuery](</reference/androidx/work/WorkQuery>)` specification.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery` |  The work query specification  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work referenced by this `[WorkQuery](</reference/androidx/work/WorkQuery>)`.  
  
### getWorkInfosByTag

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosByTag](</reference/androidx/work/WorkManager#getWorkInfosByTag\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)
[/code]

Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work for a given tag.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag` |  The tag of the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` list of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work tagged with `tag`  
  
### getWorkInfosByTagFlow

Added in [2.9.0](</jetpack/androidx/releases/work#2.9.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosByTagFlow](</reference/androidx/work/WorkManager#getWorkInfosByTagFlow\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)
[/code]

Gets a `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work for a given tag.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag` |  The tag of the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` list of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work tagged with `tag`  
  
### getWorkInfosByTagLiveData

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosByTagLiveData](</reference/androidx/work/WorkManager#getWorkInfosByTagLiveData\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag)
[/code]

Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work for a given tag.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) tag` |  The tag of the work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[LiveData](</reference/androidx/lifecycle/LiveData>)` list of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work tagged with `tag`  
  
### getWorkInfosFlow

Added in [2.9.0](</jetpack/androidx/releases/work#2.9.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosFlow](</reference/androidx/work/WorkManager#getWorkInfosFlow\(androidx.work.WorkQuery\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery)
[/code]

Gets the `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work referenced by the `[WorkQuery](</reference/androidx/work/WorkQuery>)` specification.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery` |  The work query specification  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work referenced by this `[WorkQuery](</reference/androidx/work/WorkQuery>)`.  
  
### getWorkInfosForUniqueWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosForUniqueWork](</reference/androidx/work/WorkManager#getWorkInfosForUniqueWork\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)
[/code]

Gets a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work in a work chain with a given unique name.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  The unique name used to identify the chain of work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work in the chain named `uniqueWorkName`  
  
### getWorkInfosForUniqueWorkFlow

Added in [2.9.0](</jetpack/androidx/releases/work#2.9.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosForUniqueWorkFlow](</reference/androidx/work/WorkManager#getWorkInfosForUniqueWorkFlow\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)
[/code]

Gets a `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work in a work chain with a given unique name.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  The unique name used to identify the chain of work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[Flow](<https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work in the chain named `uniqueWorkName`  
  
### getWorkInfosForUniqueWorkLiveData

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosForUniqueWorkLiveData](</reference/androidx/work/WorkManager#getWorkInfosForUniqueWorkLiveData\(kotlin.String\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName)
[/code]

Gets a `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work in a work chain with a given unique name.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [String](<https://developer.android.com/reference/java/lang/String.html>) uniqueWorkName` |  The unique name used to identify the chain of work  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work in the chain named `uniqueWorkName`  
  
### getWorkInfosLiveData

Added in [2.4.0](</jetpack/androidx/releases/work#2.4.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>> [getWorkInfosLiveData](</reference/androidx/work/WorkManager#getWorkInfosLiveData\(androidx.work.WorkQuery\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery)
[/code]

Gets the `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for all work referenced by the `[WorkQuery](</reference/androidx/work/WorkQuery>)` specification.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkQuery](</reference/androidx/work/WorkQuery>) workQuery` |  The work query specification  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [LiveData](</reference/androidx/lifecycle/LiveData>)<@[NonNull](</reference/androidx/annotation/NonNull>) [List](<https://developer.android.com/reference/java/util/List.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkInfo](</reference/androidx/work/WorkInfo>)>>` |  A `[LiveData](</reference/androidx/lifecycle/LiveData>)` of the `[List](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-list/index.html>)` of `[WorkInfo](</reference/androidx/work/WorkInfo>)` for work referenced by this `[WorkQuery](</reference/androidx/work/WorkQuery>)`.  
  
### initialize

Added in [2.10.0](</jetpack/androidx/releases/work#2.10.0>)
[code] 
    public static void [initialize](</reference/androidx/work/WorkManager#initialize\(android.content.Context,androidx.work.Configuration\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context, @[NonNull](</reference/androidx/annotation/NonNull>) [Configuration](</reference/androidx/work/Configuration>) configuration)
[/code]

Used to do a one-time initialization of the `[WorkManager](</reference/androidx/work/WorkManager>)` singleton with a custom `[Configuration](</reference/androidx/work/Configuration>)`. By default, this method should not be called because WorkManager is automatically initialized. To initialize WorkManager yourself, please follow these steps:

  * Disable `androidx.work.WorkManagerInitializer` in your manifest.

  * Invoke this method in `Application#onCreate` or a `ContentProvider`. Note that this method **must** be invoked in one of these two places or you risk getting a `NullPointerException` in `[getInstance](</reference/androidx/work/WorkManager#getInstance\(\)>)`.


This method throws an `[IllegalStateException](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-illegal-state-exception/index.html>)` when attempting to initialize in direct boot mode.

This method throws an exception if it is called multiple times.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Context](<https://developer.android.com/reference/android/content/Context.html>) context` |  A `[Context](<https://developer.android.com/reference/android/content/Context.html>)` object for configuration purposes. Internally, this class will call `[Context.getApplicationContext](<https://developer.android.com/reference/android/content/Context.html#getApplicationContext\(\)>)`, so you may safely pass in any Context without risking a memory leak.  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Configuration](</reference/androidx/work/Configuration>) configuration` |  The `[Configuration](</reference/androidx/work/Configuration>)` for used to set up WorkManager.  
  
See also  
---  
`[Configuration.Provider](</reference/androidx/work/Configuration.Provider>)` |  for on-demand initialization.  
  
### isInitialized

Added in [2.10.0](</jetpack/androidx/releases/work#2.10.0>)
[code] 
    public static boolean [isInitialized](</reference/androidx/work/WorkManager#isInitialized\(\)>)()
[/code]

Provides a way to check if `[WorkManager](</reference/androidx/work/WorkManager>)` is initialized in this process.

Returns  
---  
`boolean` |  `true` if `[WorkManager](</reference/androidx/work/WorkManager>)` has been initialized in this process.  
  
### pruneWork

Added in [1.0.0](</jetpack/androidx/releases/work#1.0.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>) [pruneWork](</reference/androidx/work/WorkManager#pruneWork\(\)>)()
[/code]

Prunes all eligible finished work from the internal database. Eligible work must be finished (`[WorkInfo.State.SUCCEEDED](</reference/androidx/work/WorkInfo.State#SUCCEEDED>)`, `[WorkInfo.State.FAILED](</reference/androidx/work/WorkInfo.State#FAILED>)`, or `[WorkInfo.State.CANCELLED](</reference/androidx/work/WorkInfo.State#CANCELLED>)`), with zero unfinished dependents.

**Use this method with caution** ; by invoking it, you (and any modules and libraries in your codebase) will no longer be able to observe the `[WorkInfo](</reference/androidx/work/WorkInfo>)` of the pruned work. You do not normally need to call this method - WorkManager takes care to auto-prune its work after a sane period of time. This method also ignores the `[OneTimeWorkRequest.Builder.keepResultsForAtLeast](</reference/androidx/work/OneTimeWorkRequest.Builder#keepResultsForAtLeast\(kotlin.Long,java.util.concurrent.TimeUnit\)>)` policy.

Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [Operation](</reference/androidx/work/Operation>)` |  An `[Operation](</reference/androidx/work/Operation>)` that can be used to determine when the pruneWork has completed  
  
### updateWork

Added in [2.8.0](</jetpack/androidx/releases/work#2.8.0>)
[code] 
    public abstract @[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager.UpdateResult](</reference/androidx/work/WorkManager.UpdateResult>)> [updateWork](</reference/androidx/work/WorkManager#updateWork\(androidx.work.WorkRequest\)>)(@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>) request)
[/code]

Updates the work with the new specification. A `[WorkRequest](</reference/androidx/work/WorkRequest>)` passed as parameter must have an id set with `[WorkRequest.Builder.setId](</reference/androidx/work/WorkRequest.Builder#setId\(java.util.UUID\)>)` that matches an id of the previously enqueued work.

It preserves enqueue time, e.g. if a work was enqueued 3 hours ago and had 6 hours long initial delay, after the update it would be still eligible for run in 3 hours, assuming that initial delay wasn't updated.

If the work being updated is currently running the returned ListenableFuture will be completed with `[UpdateResult.APPLIED_FOR_NEXT_RUN](</reference/androidx/work/WorkManager.UpdateResult#APPLIED_FOR_NEXT_RUN>)`. In this case the current run won't be interrupted and will continue to rely on previous state of the request, e.g. using old constraints, tags etc. However, on the next run, e.g. retry of one-time Worker or another iteration of periodic worker, the new worker specification will be used.

If the one time work that is updated is already finished the returned ListenableFuture will be completed with `[UpdateResult.NOT_APPLIED](</reference/androidx/work/WorkManager.UpdateResult#NOT_APPLIED>)`.

If update can be applied immediately, e.g. the updated work isn't currently running, the returned ListenableFuture will be completed with `[UpdateResult.APPLIED_IMMEDIATELY](</reference/androidx/work/WorkManager.UpdateResult#APPLIED_IMMEDIATELY>)`.

If the work with the given id (`request.getId()`) doesn't exist the returned ListenableFuture will be completed exceptionally with `[IllegalArgumentException](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-illegal-argument-exception/index.html>)`.

Worker type can't be changed, `[OneTimeWorkRequest](</reference/androidx/work/OneTimeWorkRequest>)` can't be updated to `[PeriodicWorkRequest](</reference/androidx/work/PeriodicWorkRequest>)` and otherwise, the returned ListenableFuture will be completed with `[IllegalArgumentException](<https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-illegal-argument-exception/index.html>)`.

Parameters  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [WorkRequest](</reference/androidx/work/WorkRequest>) request` |  the new specification for the work.  
  
Returns  
---  
`@[NonNull](</reference/androidx/annotation/NonNull>) [ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)<@[NonNull](</reference/androidx/annotation/NonNull>) [WorkManager.UpdateResult](</reference/androidx/work/WorkManager.UpdateResult>)>` |  a `[ListenableFuture](<https://guava.dev/releases/18.0/api/docs/com/google/common/util/concurrent/ListenableFuture.html>)` that will be successfully completed if the update was successful. The future will be completed with an exception if the work is already running or finished.  
  
Content and code samples on this page are subject to the licenses described in the [Content License](</license>). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-01-30 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-01-30 UTC."],[],[]]
