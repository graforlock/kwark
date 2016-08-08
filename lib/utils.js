exports.fileList = function(dependencies) {
    return Object.keys(dependencies).map(function(key) { return dependencies[key]});
}

exports.moduleObject = function(dependencies) {
    var modules = 'module.exports = {';

    for(dep in dependencies) {
        modules += dep + ' : ' + dep + ', ';
    }
    modules += '};';

    return modules;
} 
