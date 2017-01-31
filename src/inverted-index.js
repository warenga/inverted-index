 /* jshint esversion: 6 */

 /**
  * Inverted Index class
  */
 class InvertedIndex {

   /**
    * @constructor
    *
    * Intialized when an instance of InvertedIndex
    * is created.
    */
   constructor() {
     this.files = {};
     this.content = '';
     this.indexObject = {};
   }

   /**
    * createIndex
    *
    * Creates an index of a JSON file
    *
    * @param {string} filename
    * @param {object} json data
    * @returns {object}
    */
   createIndex(filename, rawData) {
     this.content = rawData;
     const indexObject = {};
     rawData.forEach((doc) => {
       const fullDoc = `${doc.title} ${doc.text}`;
       const clean = fullDoc.replace(/[^a-z0-9\ ]/gi, '');
       const finalClean = clean.toLowerCase();
       const words = finalClean.split(' ');

       words.forEach((word) => {
         if (!(word in indexObject)) {
           indexObject[word] = [rawData.indexOf(doc)];
         } else if (!(rawData.indexOf(doc) in indexObject[word])) {
           indexObject[word].push(rawData.indexOf(doc));
         }
       });
     });
     this.files[filename] = indexObject;
     return indexObject;
   }

   /**
    * getIndex
    *
    * Returns the index of a JSON file
    *
    * @params {string} filename
    * @returns {object}
    */
   getIndex(filename) {
     return this.files[filename];
   }

   /**
    * searchIndex
    *
    * Search specified words in the specified index and
    * returns the index of the searched words.
    *
    * @param {string}
    * @param {array}
    * @returns {object}
    */
   searchIndex(filename, ...words) {
     const indexObject = this.files[filename];
     const terms = words.toString().split(',');
     const searchTerms = {};
     const results = {};
     if (terms.length > 1) {
       terms.forEach((term) => {
         if (term in indexObject) {
           results[term] = indexObject[term];
           searchTerms[filename] = results;
         } else {
           results[term] = ['Not Found', 'Not Found'];
           searchTerms[filename] = results;
         }
       });
     } else if (terms in indexObject) {
       results[terms] = indexObject[terms];
       searchTerms[filename] = results;
     } else {
       results[terms] = ['Not Found', 'Not Found'];
       searchTerms[filename] = results;
     }
     return searchTerms;
   }

   /**
    * isJson
    *
    * Checks if a file is a valid JSON file and returns
    * true if the file is valid and false if it is not.
    *
    * @param {object}
    * @returns {bool}
    */
   isJson(file) {
     let result;
     try {
       const stringFile = JSON.stringify(file);
       const isArray = JSON.parse(stringFile);
       isArray.some((fileObject) => {
         if (fileObject.title && fileObject.text) {
           result = true;
         } else {
           result = false;
           return true;
         }
       });
       return result;
     } catch (err) {
       return false;
     }
   }
 }

 exports.InvertedIndex = InvertedIndex;
