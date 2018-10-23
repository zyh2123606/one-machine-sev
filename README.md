# one-machine-sev
react-native一体机混合模型开发
# android离线打包apk文件(windows系统)
1、生成签名秘钥
# keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

2、将my-release-key.keystore文件放在android/app项目文件夹中的目录下。
3、编辑文件~/.gradle/gradle.properties或android/gradle.properties，并添加以下内容（替换*****为正确的密钥库密码，别名和密钥密码）
# MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
# MYAPP_RELEASE_KEY_ALIAS=my-key-alias
# MYAPP_RELEASE_STORE_PASSWORD=*****
# MYAPP_RELEASE_KEY_PASSWORD=*****

4、编辑android/app/build.gradle项目文件夹中的文件，然后添加签名配置，
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}

5、只需在终端中运行以下命令：

$ cd android
$ ./gradlew assembleRelease

生成的APK可以在下面找到android/app/build/outputs/apk/app-release.apk，并且可以随时分发。

测试应用的发布版本
在将发布版本上载到Play商店之前，请确保彻底测试。首先卸载已安装的任何先前版本的应用程序。使用以下方法将其安装在设备上

$ react-native run-android --variant=release
请注意，--variant=release仅在您按上述方式设置签名时才可用。

您可以终止所有正在运行的打包程序实例，因为所有框架和JavaScript代码都捆绑在APK的资产中。

由ABI拆分APK以减小文件大小
默认情况下，生成的APK具有x86和ARMv7a CPU架构的本机代码。这样可以更轻松地共享几乎在所有Android设备上运行的APK。但是，这有一个缺点，即任何设备上都会有一些未使用的本机代码，导致不必要的更大的APK。

您可以通过更改android / app / build.gradle中的以下行为每个CPU创建一个APK：

- ndk {
-   abiFilters "armeabi-v7a", "x86"
- }
- def enableSeparateBuildPerCPUArchitecture = false
+ def enableSeparateBuildPerCPUArchitecture = true
将这些文件上传到支持设备定位的市场，例如Google Play和Amazon AppStore，用户将自动获得相应的APK。如果您要上传到其他市场，例如APKFiles，它不支持单个应用的多个APK，请更改以下行以创建默认的通用APK，其中包含两个CPU的二进制文件。

- universalApk false  // If true, also generate a universal APK
+ universalApk true  // If true, also generate a universal APK
启用Proguard以减小APK的大小（可选）
Proguard是一种可以略微减小APK大小的工具。它通过剥离应用程序未使用的部分React Native Java字节码（及其依赖项）来实现此目的。

重要提示：如果您启用了Proguard，请务必彻底测试您的应用。Proguard通常需要特定于您正在使用的每个本机库的配置。见app/proguard-rules.pro。

要启用Proguard，请编辑android/app/build.gradle：

/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
