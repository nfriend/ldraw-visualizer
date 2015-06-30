var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Utility;
    (function (Utility) {
        function isString(obj) {
            return Object.prototype.toString.call(obj) === '[object String]';
        }
        Utility.isString = isString;
        function isNumber(obj) {
            return Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(obj);
        }
        Utility.isNumber = isNumber;
        function isInt(obj) {
            return isNumber(obj) && (obj % 1) === 0;
        }
        Utility.isInt = isInt;
        function isByte(obj) {
            return isInt(obj) && obj >= 0 && obj <= 255;
        }
        Utility.isByte = isByte;
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        Utility.isArray = isArray;
        function isValidColorCode(obj) {
            return isInt(obj) && obj >= 0;
            //return isInt(obj) && obj >= 0 && obj <= 511;
        }
        Utility.isValidColorCode = isValidColorCode;
        function isValidColorHexString(obj) {
            return isString(obj) && obj && /^#[a-f0-9]{6}$/i.test(obj);
        }
        Utility.isValidColorHexString = isValidColorHexString;
        function isNullOrUndefined(obj) {
            return obj === null || typeof obj === 'undefined';
        }
        Utility.isNullOrUndefined = isNullOrUndefined;
        function hasAtLeastOneNonWhitespaceCharacter(s) {
            return /^(?!\s*$).+/.test(s);
        }
        Utility.hasAtLeastOneNonWhitespaceCharacter = hasAtLeastOneNonWhitespaceCharacter;
        function isNonEmpty(s) {
            return !(/^\s+$/.test(s));
        }
        Utility.isNonEmpty = isNonEmpty;
        function logMatrix(matrix) {
            var e = matrix.elements;
            console.log(e[0], e[4], e[8], e[12]);
            console.log(e[1], e[5], e[9], e[13]);
            console.log(e[2], e[6], e[10], e[14]);
            console.log(e[3], e[7], e[11], e[15]);
            console.log('---------------');
        }
        Utility.logMatrix = logMatrix;
        function hexStringToHexNumber(hexString) {
            return parseInt(hexString.replace(/#/g, ''), 16);
        }
        Utility.hexStringToHexNumber = hexStringToHexNumber;
        function fixFilePath(filePath) {
            return filePath.toLowerCase().replace(/\\/g, '/');
        }
        Utility.fixFilePath = fixFilePath;
        function degreesToRadians(degrees) {
            return degrees * (Math.PI / 180);
        }
        Utility.degreesToRadians = degreesToRadians;
        function radiansToDegrees(radians) {
            return radians * (180 / Math.PI);
        }
        Utility.radiansToDegrees = radiansToDegrees;
    })(Utility = LdrawVisualizer.Utility || (LdrawVisualizer.Utility = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=utility.js.map