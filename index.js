const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}


function processCommand(command) {
    command = command.split(' ');
    switch (command[0]) {
        case 'user':
            showUserTODO(command[1]);
            break;
        case 'important':
            showImportantTODO();
            break;
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            showTODO();
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function findTODO() {
    const allTODO = [];
    for(const file of files){
        const lines = file.split('\n');
        for(const line of lines){
            const index = line.indexOf('// ' +
                'TODO');
            if(index === -1) continue;
            allTODO.push(line.slice(index + 8, line.length).split(';'));
        }
    }
    return allTODO;
}

function showTODO() {
    for(const el of findTODO()){
        console.log(el.join(';'));
    }
}

function showImportantTODO() {
    for(let el of findTODO()){
        el = el.join(';');
        if(el.indexOf('!') + 1)
            console.log(el);
    }
}

function showUserTODO(name){
    for(const el of findTODO()){
        if(el[0].toLowerCase().trim() === name)
            console.log(el[2].trim());
    }
}
// TODO you can do it!
