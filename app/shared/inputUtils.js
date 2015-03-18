/**
 * @flow
 */

/**
 * http://stackoverflow.com/questions/7467840/nl2br-equivalent-in-javascript
 */
function nl2br(str: string): string {
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
}

module.exports = {
  nl2br
};
