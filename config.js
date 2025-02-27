const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: 'src/.env' });;

const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';

const envFile = `export const environment = {
    CLIENT_ID: '${process.env.CLIENT_ID || ''}',
    CLIENT_SECRET: '${process.env.CLIENT_SECRET || ''}',
    REDIRECT_URI: '${process.env.REDIRECT_URI || ''}'
};
`;
console.log(envFile
);
const targetPath = path.join(
  __dirname,
  './src/environments/environment.development.ts'
);

fs.writeFile(targetPath, envFile, err => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.development.ts`
    );
  }
});
