const fs = require('fs');
const path = require('path');
const mustache = require("mustache");

const config = {
  pagesDir: '../../pages',
  componentsDir: '../../Components',
  reducerDir: '../../Redux/Reducers',
  reducersListDir: '../../Redux',
  storeDir: '../../Redux',
  defConstDir: '../../Definations'
};

const isAlreadyExist = (startPath, val, checkForDir) => {

  if (checkForDir) {
    val = val.replace(/\b\w/g, foo => foo.toUpperCase());
    return fs.existsSync(path.resolve(__dirname, `${startPath}/${val}`));
  }

}

const createFuncComponent = (answers) => {
  answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
  const funcDir = `${config.componentsDir}/${answers.fileName}`;
  const templatePath = '../templates/components/functional.mustache'
  const templateProps = {
    fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
    isHaveStyle: answers.isHaveStyle
  }
  const message = "Created new functional component";
  const indexDir = `${config.componentsDir}/index.ts`;
  const indexTemplate = '../templates/components/index.mustache';
  const indexMessage = "Component added to index.ts";

  createFile(funcDir);
  writeFile(`${funcDir}/index.tsx`, () => getTemplate(templatePath, templateProps), message);
  addIndex(indexDir, () => getTemplate(indexTemplate, templateProps), indexMessage);
  createInterface(answers);
}


const createClassComponent = (answers) => {
 const classDir = `${answers.isPage ? config.pagesDir : config.componentsDir}/${answers.fileName}`;
 
  const templatePath = '../templates/components/class.mustache';
  const templateProps = {
    fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
    isConnectStore: answers.isConnectStore, isHaveStyle: answers.isHaveStyle
  }
  const indexDir = `${config.componentsDir}/index.ts`;
  const message = "Added new class based component";
  const indexTemplate = '../templates/components/index.mustache';
  const indexMessage = "Component added to index.ts";

  createFile(classDir);
  writeFile(`${classDir}/index.tsx`, () => getTemplate(templatePath, templateProps), message);
  createInterface(answers, isClass = true);

  if (!answers.isPage) {
    addIndex(indexDir, () => getTemplate(indexTemplate, templateProps), indexMessage);
  }
}

const addReducer = (answers) => {
  const redDir = `${config.reducerDir}/${answers.fileName}`;
  const reducerTemplate = '../templates/reducers/reducer.mustache'
  const templateProps = { fileName: answers.fileName };
  const message = "Created new reducer file"
  const indexDir = `${config.reducerDir}/index.ts`;
  const indexTemplate = '../templates/reducers/index.mustache';
  const indexMessage = "Reducer added to index.ts";

  createFile(redDir);
  writeFile(`${redDir}/index.tsx`, () => getTemplate(reducerTemplate, templateProps), message);
  addIndex(indexDir, () => getTemplate(indexTemplate, templateProps), indexMessage)
  addStoreIndex(templateProps);
  addActionConstIndex(templateProps);
};

const addStoreIndex = (templateProps) => {
  const storeRegex = /const reducers = combineReducers[(][{]/g;
  const storeTemplate = '../templates/reducers/store.mustache';
  const storeMessage = "Added to store.ts";
  const storeDir = `${config.storeDir}/store.ts`;
  const storeFile = fs.readFileSync(path.resolve(__dirname, storeDir), 'utf8');

  replaceContent(storeFile, storeRegex,
    () => getTemplate(storeTemplate, templateProps),
    storeDir, storeMessage);
}

const addActionConstIndex = (templateProps) => {
  const actionConstsRegex = /export const ActionConsts\s[=]\s[{]/g;
  const actionConstFile = fs.readFileSync(path.resolve(__dirname, `${config.defConstDir}/ActionConsts.ts`), 'utf8');
  const actionConstTemplate = '../templates/reducers/action-const.mustache';
  const actionConstDir = '../../Definations/ActionConsts.ts';
  const actionConstsMessage = "Added to actionConsts";

  replaceContent(actionConstFile, actionConstsRegex,
    () => getTemplate(actionConstTemplate, templateProps),
    actionConstDir, actionConstsMessage);

}

const replaceContent = (filetoUpdate, regexKey, getFileContent, fileDir, message) => {
  const replaceFile = filetoUpdate.replace(regexKey, getFileContent());

  writeFile(fileDir, () => replaceFile, message)
}

const createStyle = (answers) => {
  const styleDir = `${answers.isPage ? config.pagesDir : config.componentsDir}/${answers.fileName}/style.scss`;
  const templatePath = '../templates/styles.mustache';
  const templateProps = { fileName: answers.fileName };
  const message = "Created new style file";

  writeFile(styleDir, () => getTemplate(templatePath, templateProps), message);
}

const createInterface = (answers, isClass) => {
  const interfaceDir = `${answers.isPage ? config.pagesDir : config.componentsDir}/${answers.fileName}/${answers.fileName}.d.ts`;
  const templatePath = '../templates/interfaces/component.d.mustache';
  const templateProps = { fileName: answers.fileName, isClass };
  const message = "Created new interface file."

  writeFile(interfaceDir, () => getTemplate(templatePath, templateProps), message);
}

const addIndex = (dirPath, getFileContent, message) => {
  fs.appendFile(path.resolve(__dirname, dirPath),
    getFileContent() + "\n",
    (err) => {
      if (err) throw err;
      console.log(message);
    }
  );
}

const createFile = dirPath => {
  fs.mkdirSync(path.resolve(__dirname, dirPath));
}

const writeFile = (dirPath, getFileContent, message) => {
  fs.writeFile(path.resolve(__dirname, dirPath),
    getFileContent()
    , err => {
      if (err) throw err;
      console.log(message);
    })
}

const getTemplate = (templatePath, templateProps) => (
  mustache.render(
    fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8'),
    templateProps
  )
);

module.exports = {
  config,
  createFuncComponent,
  isAlreadyExist,
  createStyle,
  createClassComponent,
  addReducer
}