const fs = require('fs');
const path = require('path');

const config = {
    pagesDir: './pages',
    componentsDir: '../../components',
    templatesDir: './helper_scripts/templates',

  };

const isAlreadyExist = (startPath, val, checkForDir) => {
    
    if (checkForDir) {
        return fs.existsSync(`${startPath}/${val}`);
      }
      return false;
}

module.exports = {
    config,
    isAlreadyExist
}