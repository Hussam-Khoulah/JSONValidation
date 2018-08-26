const { readdirSync, statSync } = require('fs');
const schemaAddresses = [];

/**
 * traverse schemas folder and return a list of schema addresses
 * @param root
 * @returns {Array}
 */
const getSchemas = (root) => {
    let files = readdirSync(root);
    for (let i = 0; i < files.length; ++i) {
        let file = files[i];
        let currentPath = root + '/' + file;
        let stats = statSync(currentPath);
        if (stats.isFile()) {
            let newSchemaAddress = currentPath.substring(11, currentPath.length - 3);
            // newSchema = newSchema.replace('.js', '');
            schemaAddresses.push(newSchemaAddress);
        } else if (stats.isDirectory()){
            getSchemas(currentPath);
        }
    }
    return schemaAddresses;
}

module.exports = getSchemas;