# Android Developer Documentation (Curated)

> Source: https://developer.android.com/ | Fetched: 2026-06-15
> Curated for Content Passport Android app development
> Total: 98 pages | 1.6MB

## Tech Stack Mapping

| Technology | Status | Doc Path |
|------------|--------|----------|
| Kotlin 1.9.22 | Active | `kotlin/` |
| Coroutines | Active | `kotlin/coroutines-best-practices.md` |
| Flow | Active | `kotlin/flow.md` |
| Jetpack Compose | Active | `compose/` |
| Material3 | Active | `compose/designsystems-material3.md` |
| Navigation Compose | Active | `compose/navigation.md` |
| CameraX | Active | `camerax/` |
| OkHttp3 | Active | `networking/` |
| Google Sign-In | Active | `authentication/` |
| Location (Fused) | Active | `location/` |
| Coil (image loading) | Active | (no official docs — see GitHub README) |
| ExifInterface | Active | `camera/camera-enumeration.md` |
| SHA-256 Crypto | Active | `cryptography/` |
| SplashScreen API | Active | `build/` |
| Room DB | Planned | `storage/` |
| SQLDelight | Planned | (external: sqldelight.github.io) |
| Sui Kotlin SDK | Planned | (see sui-docs) |
| Seal Encryption | Planned | (see seal-docs) |

## Directory Structure

```
android-docs/
├── kotlin/                          # Kotlin language
│   ├── coroutines-best-practices.md # Coroutines best practices
│   └── flow.md                      # Kotlin Flow
│
├── compose/                         # Jetpack Compose
│   ├── compose.md                   # Compose overview
│   ├── mental-model.md              # Recomposition model
│   ├── modifiers.md                 # Modifiers
│   ├── state.md                     # State management
│   ├── state-hoisting.md            # State hoisting
│   ├── lists.md                     # Lazy lists
│   ├── performance.md               # Performance optimization
│   ├── stability.md                 # Stability (parameters)
│   ├── architecture.md              # Architecture patterns
│   ├── testing.md                   # Compose testing
│   ├── navigation.md                # Navigation Compose
│   ├── layouts.md                   # Layout system
│   ├── layouts-basics.md            # Layout basics
│   ├── designsystems-material3.md   # Material3 design system
│   └── components/                  # UI components
│       ├── components.md
│       ├── button.md
│       ├── card.md
│       ├── dialog.md
│       ├── scaffold.md
│       ├── slider.md
│       ├── snackbar.md
│       ├── switch.md
│       └── tabs.md
│
├── camerax/                         # CameraX camera
│   ├── camerax.md                   # CameraX overview
│   ├── architecture.md              # Architecture
│   ├── preview.md                   # Preview
│   └── video-capture.md             # Video capture
│
├── networking/                      # Networking
│   ├── connectivity.md              # Connectivity overview
│   └── connecting.md                # Network connection
│
├── security/                        # Security
│   ├── security.md                  # Security overview
│   ├── cryptography.md              # Cryptography APIs
│   ├── keystore.md                  # Android Keystore
│   ├── security-config.md           # Network Security Config
│   └── topic-security.md            # Security topics
│
├── authentication/                  # Authentication
│   ├── sign-in.md                   # Sign-In overview
│   ├── credential-manager.md        # Credential Manager
│   ├── credential-manager-siwg.md   # SIWG (Sign in with Google)
│   └── passkeys.md                  # Passkeys
│
├── location/                        # Location services
│   ├── training-location.md         # Location overview
│   ├── retrieve-current.md          # Get current location
│   ├── request-updates.md           # Location updates
│   ├── background-location.md       # Background location
│   └── permissions-runtime.md       # Runtime permissions
│
├── storage/                         # Data storage
│   ├── data-storage.md              # Storage overview
│   ├── room.md                      # Room DB
│   ├── room-relationships.md        # Room relationships
│   ├── sqlite.md                    # SQLite
│   └── shared-preferences.md        # SharedPreferences
│
├── build/                           # Build
│   ├── build.md                     # Build overview
│   ├── gradle-plugin.md             # Gradle Plugin releases
│   ├── gradle-tips.md               # Gradle tips
│   ├── agp-8-1-0.md                 # AGP 8.1.0 release notes
│   ├── dependencies.md              # Dependency management
│   ├── app-signing.md               # App signing
│   └── past-releases.md             # Past releases
│
├── testing/                         # Testing
│   ├── testing.md                   # Testing overview
│   ├── fundamentals.md              # Testing fundamentals
│   ├── unit-testing.md              # Unit testing
│   └── instrumented-tests.md        # Instrumented tests
│
├── architecture/                    # Architecture
│   ├── architecture-recommendations.md  # Architecture recommendations
│   ├── viewmodel.md                 # ViewModel
│   └── livedata.md                  # LiveData
│
├── background/                      # Background work
│   ├── background.md                # Background overview
│   ├── workmanager.md               # WorkManager
│   ├── getting-started-work.md      # WorkManager getting started
│   ├── WorkManager-ref.md           # WorkManager API reference
│   ├── Worker-ref.md                # Worker API reference
│   └── ListenableWorker-ref.md      # ListenableWorker API reference
│
├── permissions/                     # Permissions
│   ├── permissions.md               # Permissions overview
│   └── requesting.md                # Requesting permissions
│
├── compatibility/                   # Compatibility
│   ├── android-14.md
│   ├── android-13.md
│   ├── android-12.md
│   ├── android-11.md
│   ├── android-10.md
│   └── android-oreo.md
│
└── media/                           # Media
    └── exoplayer.md                 # ExoPlayer
```

## Quick Reference (Project-Related)

| Topic | Path |
|-------|------|
| Compose state management | `compose/state.md`, `compose/state-hoisting.md` |
| Compose layouts | `layouts.md`, `layouts-basics.md` |
| Navigation | `compose/navigation.md` |
| CameraX setup | `camerax/architecture.md` |
| CameraX preview/capture | `camerax/preview.md` |
| Network connection | `networking/connecting.md` |
| Cryptography (SHA-256) | `security/cryptography.md` |
| Keystore (key management) | `security/keystore.md` |
| Network security | `security/security-config.md` |
| Google Sign-In | `authentication/sign-in.md`, `credential-manager-siwg.md` |
| Get location | `location/retrieve-current.md` |
| Location permissions | `location/permissions-runtime.md` |
| Room DB | `storage/room.md` |
| WorkManager | `background/workmanager.md` |
| Compose testing | `compose/testing.md` |
| Gradle build | `build/build.md` |
| App signing | `build/app-signing.md` |
