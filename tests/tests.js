// tests.js
// 1. jrunscript -f ../isbn.js -f lib/test/tiny.js -f tests.js, or with rhino shell
// 2. open tests.html with your web browser
// 9. copy ..\isbn.js + lib\test\tiny.js + tests.js tmp.js, and cscript tmp.js, and del tmp.js, and ...

var t = new Test.Tiny;
var isbn10a = ISBN.parse('4873113369');
var isbn10b = ISBN.parse('1933988037');
var isbn13a = ISBN.parse('978-4-87311-336-4');
var isbn13b = ISBN.parse('9781590597279');
t.test([
  ['t', isbn10a],
  ['t', isbn10b],
  ['t', isbn13a],
  ['t', isbn13b]
]);
t.test([
  //
  ['f', ISBN.parse('')],
  ['f', ISBN.parse('0-00-000-0')],
  ['f', ISBN.parse('0-00000-0000-0')],
  ['f', ISBN.parse('00000000000000000')],
  ['eq', ISBN.asIsbn13('4-87311-336-9'), '9784873113364'],
  ['eq', ISBN.asIsbn10('978-4-87311-336-4', true), '4-87311-336-9'],
  ['f', ISBN.asIsbn10('9790000000000')],
  ['eq', ISBN.hyphenate('9784873113364'), '978-4-87311-336-4'],
  //
  ['t', isbn10a.isIsbn10()],
  ['eq', isbn10a.asIsbn10(), '4873113369'],
  ['eq', isbn10a.asIsbn10(true), '4-87311-336-9'],
  ['eq', isbn10a.asIsbn13(), '9784873113364'],
  ['eq', isbn10a.asIsbn13(true), '978-4-87311-336-4'],
  //
  ['t', isbn10b.isIsbn10()],
  ['eq', isbn10b.asIsbn10(), '1933988037'],
  ['eq', isbn10b.asIsbn10(true), '1-933988-03-7'],
  ['eq', isbn10b.asIsbn13(), '9781933988030'],
  ['eq', isbn10b.asIsbn13(true), '978-1-933988-03-0'],
  //
  ['t', isbn13a.isIsbn13()],
  ['eq', isbn13a.asIsbn10(), '4873113369'],
  ['eq', isbn13a.asIsbn10(true), '4-87311-336-9'],
  ['eq', isbn13a.asIsbn13(), '9784873113364'],
  ['eq', isbn13a.asIsbn13(true), '978-4-87311-336-4'],
  //
  ['eq', isbn13a.codes.source, '978-4-87311-336-4'],
  ['eq', isbn13a.codes.prefix, '978'],
  ['eq', isbn13a.codes.group, '4'],
  ['eq', isbn13a.codes.publisher, '87311'],
  ['eq', isbn13a.codes.article, '336'],
  ['eq', isbn13a.codes.check, '4'],
  ['eq', isbn13a.codes.check10, '9'],
  ['eq', isbn13a.codes.check13, '4'],
  ['eq', isbn13a.codes.groupname, 'Japan'],
  //
  ['t', isbn13b.isIsbn13()],
  ['eq', isbn13b.asIsbn10(), '1590597273'],
  ['eq', isbn13b.asIsbn10(true), '1-59059-727-3'],
  ['eq', isbn13b.asIsbn13(), '9781590597279'],
  ['eq', isbn13b.asIsbn13(true), '978-1-59059-727-9']
]);
