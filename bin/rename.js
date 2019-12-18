const prompt = require('prompt');
const util = require('util');
const exec = require('child_process').exec;
require('colors');

const run = async () => {
  const argv = require('minimist')(process.argv.slice(2));

  const schema = {
    properties: {
      appId: {
        pattern: /^[\w]+\.[\w\.]+$/,
        description: "Application ID (like com.example.reactstarter)\n",
        message: 'Invalid application ID.',
        required: true
      },
      name: {
        pattern: /^[\w]+$/,
        description: "Name (like reactstarter)\n",
        message: 'Invalid application name.',
        required: true
      },
      displayName: {
        pattern: /^[\w\s]+$/,
        description: "Display Name (like React Starter)\n",
        message: 'Invalid application name.',
        required: true
      },
    }
  };

  prompt.start();
  prompt.message = "Enter the";
  prompt.delimiter = ' ';
  prompt.override = {
    appId: argv['app-id'],
    name: argv.name,
    displayName: argv['display-name']
  }

  const old = {
    appId: argv['old-app-id'] || 'com.example.reactstarter',
    name: argv['old-name'] || 'reactstarter',
    displayName: argv['old-display-name'] || 'React Starter'
  };

  const now = await util.promisify(prompt.get)(schema);

  await renameAppId(old, now);
  await renameFiles(old, now);
  await renameName(old, now);
  await renameDisplayName(old, now);
};

const renameAppId = async (old, now) => {
  console.log(`Renaming the App Id from ${old.appId} to ${now.appId}...`.green);

  await sh(`find ./android \\( -type d -name .git -prune \\) -o -type f -exec sed -i '' 's/${old.appId}/${now.appId}/g' {} +`, {
    LC_ALL: 'C'
  });
}

const renameFiles = async(old, now) => {
  console.log(`Renaming ios/${old.name} files to ios/${now.name}...`.green);
  await mv(`ios/${old.name}`, `ios/${now.name}`);
  await mv(`ios/${old.name}-tvOS`, `ios/${now.name}-tvOS`);
  await mv(`ios/${old.name}-tvOSTests`, `ios/${now.name}-tvOSTests`);
  await mv(`ios/${old.name}.xcodeproj`, `ios/${now.name}.xcodeproj`);
  await mv(`ios/${old.name}.xcworkspace`, `ios/${now.name}.xcworkspace`);
  await mv(`ios/${old.name}Tests`, `ios/${now.name}Tests`);

  await mv(`ios/${now.name}Tests/${old.name}Tests.m`, `ios/${now.name}Tests/${now.name}Tests.m`);
  await mv(`ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${old.name}.xcscheme`, `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}.xcscheme`);
  await mv(`ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${old.name}-tvOS.xcscheme`, `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}-tvOS.xcscheme`);

  // await mv(`ios/Pods/Target Support Files/Pods-${old.name}`, `ios/Pods/Target Support Files/Pods-${now.name}`);
  // await mv(`ios/Pods/Target Support Files/Pods-${old.name}Tests`, `ios/Pods/Target Support Files/Pods-${now.name}Tests`);
  // await mv(`ios/Pods/Target Support Files/Pods-${old.name}-tvOS`, `ios/Pods/Target Support Files/Pods-${now.name}-tvOS`);
  // await mv(`ios/Pods/Target Support Files/Pods-${old.name}-tvOSTests`, `ios/Pods/Target Support Files/Pods-${now.name}-tvOSTests`);

  console.log(`Renaming android/${old.name} files to android/${now.name}...`.green);

  await mv(`android/app/src/main/java/com/${old.name}`, `android/app/src/main/java/com/${now.name}`);
}

const mv = async (oldPath, nowPath) => {
  console.log(`\tMoving ${oldPath} -> ${nowPath}`.dim);
  await sh(`mv ${oldPath} ${nowPath}`);
}

const renameName = async (old, now) => {
  console.log(`Renaming name ${old.name} to ${now.name}...`.green);

  await replace('return "__NAME__"', `android/app/src/main/java/com/${now.name}/MainActivity.java`, old, now, {singlequote: true});
  await replace("rootProject.name = '__NAME__'", 'android/settings.gradle', old, now);

  await replace("target '__NAME__", 'ios/Podfile', old, now);
  await replace("# Pods for __NAME__", 'ios/Podfile', old, now);
  await replace('moduleName:@"__NAME__"', `ios/${now.name}/AppDelegate.m`, old, now, {singlequote: true});

  await replace('@interface __NAME__Tests', `ios/${now.name}Tests/${now.name}Tests.m`, old, now);
  await replace('@implementation __NAME__Tests', `ios/${now.name}Tests/${now.name}Tests.m`, old, now);
  await replace('location = "group:__NAME__.xcodeproj', `ios/${now.name}.xcworkspace/contents.xcworkspacedata`, old, now, {singlequote: true});
  await replace('BuildableName = "__NAME__', `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}.xcscheme`, old, now, {singlequote: true});
  await replace('BlueprintName = "__NAME__', `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}.xcscheme`, old, now, {singlequote: true});
  await replace('ReferencedContainer = "container:__NAME__.', `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}.xcscheme`, old, now, {singlequote: true});
  await replace('BuildableName = "__NAME__', `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}-tvOS.xcscheme`, old, now, {singlequote: true});
  await replace('BlueprintName = "__NAME__', `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}-tvOS.xcscheme`, old, now, {singlequote: true});
  await replace('ReferencedContainer = "container:__NAME__.', `ios/${now.name}.xcodeproj/xcshareddata/xcschemes/${now.name}-tvOS.xcscheme`, old, now, {singlequote: true});
  await replace("__NAME__", `ios/${now.name}.xcodeproj/project.pbxproj`, old, now);
  
  await replace('"name": "__NAME__"', 'package.json', old, now, {singlequote: true});
  await replace('"name": "__NAME__"', 'app.json', old, now, {singlequote: true});
}

const renameDisplayName = async (old, now) => {
  console.log(`Renaming display name ${old.name} to ${now.name}...`.green);

  await replace('<string name="app_name">__DISPLAYNAME__<\\/string>', 'android/app/src/main/res/values/strings.xml', old, now, {singlequote: true});
  await replace('"displayName": "__DISPLAYNAME__"', 'app.json', old, now, {singlequote: true});

  await replace('text="__DISPLAYNAME__"', `ios/${now.name}/Base.lproj/LaunchScreen.xib`, old, now, {singlequote: true});
  await replace('<string>__DISPLAYNAME__<\\/string>', `ios/${now.name}/Info.plist`, old, now);
}

const replace = async (str, path, old, now, options = {}) => {
  const oldStr = str.replace(/__NAME__/, old.name).replace(/__DISPLAYNAME__/, old.displayName)
  const nowStr = str.replace(/__NAME__/, now.name).replace(/__DISPLAYNAME__/, now.displayName);

  let sed = `sed -i '' "s/${oldStr}/${nowStr}/g" ${path}`;

  if (options.singlequote) {
    sed = `sed -i '' 's/${oldStr}/${nowStr}/g' ${path}`;
  }

  console.log(`\tUpdating ${path}`.dim);
  await sh(sed, {LC_ALL: 'C'});  
}


const sh = (cmd, env) => {
  return new Promise((resolve, reject) => {
      const shell = exec(cmd, { env });

      shell.stdout.on('data', data => console.log(data));
      shell.stderr.on('data', data => console.log(data) );

      shell.on('exit', () => { resolve() } );
   });
}

run();

