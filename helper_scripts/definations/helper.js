const fs = require('fs');
const path = require('path');
const mustache = require("mustache");

const config = {
  pagesDir: '../../pages',
  componentsDir: '../../components',
  templatesDir: '../templates/',

};

const isAlreadyExist = (startPath, val, checkForDir) => {

  if (checkForDir) {
    val = val.replace(/\b\w/g, foo => foo.toUpperCase());
    return fs.existsSync(path.resolve(__dirname, `${startPath}/${val}`));
  }

  /*   const files = fs.readdirSync(startPath);
  
    console.log(files);
     */

  /*   for (let i = 0; i < files.length; i += 1) {
  
      const filename = path.join(startPath, files[i]);
      console.log(filename);
      
      const stat = fs.lstatSync(filename);
      console.log(stat.isDirectory());
      
      if (stat.isDirectory()) {
        isUsedOnDir(filename, val); // recurse
      } else if (filename.indexOf(val) >= 0) {
        isFound = true;
      }
    } */

}


const createFuncComponent = (answers) => {

  answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

  /* Create folder */

  fs.mkdirSync(path.resolve(__dirname, `${config.componentsDir}/${answers.fileName}`));

  /* Add component */

  fs.writeFile(path.resolve(__dirname, `${config.componentsDir}/${answers.fileName}/index.tsx`),
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/components/functional.mustache'), 'utf8'),
      { fileName: answers.fileName, interfaceName: `I${answers.fileName}`, isHaveStyle: answers.isHaveStyle })
    , err => {
      if (err) throw err;
      console.log("created new functional component");
    })

  /* Add to component to index */
  addIndex(answers);

  /* Add interface */
  createInterface(answers);
}


const createClassComponent = (answers) => {
  answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

  fs.mkdirSync(path.resolve(__dirname, `${answers.isPage ? config.pagesDir : config.componentsDir}/${answers.fileName}`));

  fs.writeFile(path.resolve(__dirname, `${answers.isPage ? config.pagesDir : config.componentsDir}/${answers.fileName}/index.tsx`),
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/components/class.mustache'), 'utf8'),
      {
        fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
        isConnectStore: answers.isConnectStore, isHaveStyle: answers.isHaveStyle
      })
    , err => {
      if (err) throw err;
      console.log("created new class based component");
    })

  /* Add to component to index */
  if (!answers.isPage) {
    addIndex(answers);
  }

  /* Add interface */
  createInterface(answers, isClass = true);
}

/* const createPage = (answers) => {

  answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());

  fs.mkdirSync(path.resolve(__dirname, `${config.pagesDir}/${answers.fileName}`));

  fs.writeFile(path.resolve(__dirname, `.${config.pagesDir}/${answers.fileName}/index.tsx`),
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/components/class.mustache'), 'utf8'),
      {
        fileName: answers.fileName, interfaceName: `I${answers.fileName}`,
        isConnectStore: answers.isConnectStore, isHaveStyle: answers.isHaveStyle
      })
    , err => {
      if (err) throw err;
      console.log("created new page");
    })

  createInterface(answers, isClass = true);

} */


const createStyle = (answers) => {
  fs.writeFile(path.resolve(__dirname,
    `${answers.isPage ? config.pagesDir : config.componentsDir}/${answers.fileName}/Styles.scss`),
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/styles.mustache'), 'utf8'),
      { fileName: answers.fileName })
    , err => {
      if (err) throw err;
      console.log("created new style file");
    });
}

const createInterface = (answers, isClass) => {
  fs.writeFile(path.resolve(__dirname,
    `${answers.isPage ? config.pagesDir : config.componentsDir}/${answers.fileName}/${answers.fileName}.d.ts`),
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/interfaces/component.d.mustache'), 'utf8'),
      { fileName: answers.fileName, isClass })
    , err => {
      if (err) throw err;
      console.log("created component interface");
    })

}

const addIndex = (answers) => {
  fs.appendFile(path.resolve(__dirname, `${config.componentsDir}/index.ts`),
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../templates/components/index.mustache'), 'utf8'),
      { fileName: answers.fileName }) + "\n",
    (err) => {
      if (err) throw err;
      console.log('Added to index.ts!');
    }
  );


}

module.exports = {
  config,
  createFuncComponent,
  isAlreadyExist,
  createStyle,
  createClassComponent
}