const connection = require("../config/connection");

class Query {
 constructor() {
  this.command = {
   insertData: {
    text: "",
    table: "",
    fields: [],
    values: []
   },
   updateData: {
    text: "",
    table: ""
   },
   setData: {
    text: "",
    field: "",
    value: ""
   },
   deleteData: {
    text: "",
    table: ""
   },
   selectData: {
    text: "",
    fields: []
   },
   fromData: {
    text: "",
    table: {}
   },
   joinDataArray: [],
   whereData: {
    text: "",
    field: "",
    value: ""
   },
   whereAdditionalDataArray: [],
   groupByData: {
    text: "",
    fields: []
   },
   orderByData: {
    text: "",
    fields: []
   },
   limitData: {
    text: "",
    count: 0
   }
  };
 }

 insert(table, fields, values) {
  this.command.insertData.text = "INSERT INTO ?? ";
  this.command.insertData.table = table;
  if (Array.isArray(fields)) {
   this.command.insertData.text += " (" + this.stringArrayToList(fields, "??") + ")\n";
   this.command.insertData.fields = fields;
  }
  else {
   this.command.insertData.text += " (??)\n";
   this.command.insertData.fields = [fields];
  }
  if (Array.isArray(values)) {
   this.command.insertData.text += "VALUES (" + this.stringArrayToList(values, "?") + ")\n";
   this.command.insertData.values = values;
  }
  else {
   this.command.insertData.text += "VALUES (?)\n";
   this.command.insertData.values = [values];
  }

  return this;
 }

 select(fields) {
  if (Array.isArray(fields)) {
   this.command.selectData.text = "SELECT " + this.stringArrayToList(fields, "??") + "\n";
   this.command.selectData.fields = fields;
  }
  else {
   this.command.selectData.text = "SELECT ??\n";
   this.command.selectData.fields = [fields];
  }

  return this;
 }

 from(tableName) {
  if (typeof tableName === "object" && Object.keys(tableName).length === 2) {
   this.command.fromData.text = "FROM ?? AS ??\n";
   this.command.fromData.table = tableName[Object.keys(tableName)[0]];
   this.command.fromData.alias = tableName[Object.keys(tableName)[1]];
  } else {
   this.command.fromData.text = "FROM ??\n";
   this.command.fromData.table = tableName;
   this.command.fromData.alias = "";
  }

  return this;
 }

 innerJoin(table, leftKey, rightKey) {
  if (typeof table === "object" && Object.keys(table).length === 2) {
   this.command.joinDataArray.push({
    text: "INNER JOIN ?? AS ?? ON ?? = ??\n",
    table: table[Object.keys(table)[0]],
    alias: table[Object.keys(table)[1]],
    leftKey: leftKey,
    rightKey: rightKey
   });
  } else {
   this.command.joinDataArray.push({
    text: "INNER JOIN ?? ON ?? = ??\n",
    table: table,
    alias: "",
    leftKey: leftKey,
    rightKey: rightKey
   });
  }

  return this;
 }

 whereEqual(field, value) {
  this.command.whereData.text = "WHERE ?? = ?\n";
  this.command.whereData.field = field;
  this.command.whereData.value = value;

  return this;
 }

 whereNull(field) {
  this.command.whereData.text = "WHERE ?? IS NULL\n";
  this.command.whereData.field = field;
  this.command.whereData.value = "";

  return this;
 }

 limit(count) {
  this.command.limitData.text = "LIMIT " + count.toString() + "\n";
  this.command.limitData.count = count;

  return this;
 }

 go(cb) {
  let commandText = this.command.insertData.text
   + this.command.selectData.text
   + this.command.fromData.text;
  this.command.joinDataArray.forEach(joinDataItem => {
   commandText += joinDataItem.text;
  });
  commandText += this.command.whereData.text;
  this.command.whereAdditionalDataArray.forEach(whereDataItem => {
   commandText += whereDataItem.text;
  });
  commandText += this.command.limitData.text;

  const queryParams = [];
  (this.command.insertData.table !== "") ? queryParams.push(this.command.insertData.table) : null;
  (this.command.insertData.fields.length > 0) ? queryParams.push(...this.command.insertData.fields) : null;
  (this.command.insertData.values.length > 0) ? queryParams.push(...this.command.insertData.values) : null;
  (this.command.selectData.fields.length > 0) ? queryParams.push(...this.command.selectData.fields) : null;
  (this.command.fromData.table !== "") ? queryParams.push(this.command.fromData.table) : null;
  (this.command.fromData.alias !== "") ? queryParams.push(this.command.fromData.alias) : null;
  this.command.joinDataArray.forEach(joinDataItem => {
   queryParams.push(joinDataItem.table);
   (joinDataItem.alias !== "") ? queryParams.push(joinDataItem.alias) : null;
   queryParams.push(joinDataItem.leftKey,
    joinDataItem.rightKey
   );
  });
  (this.command.whereData.field !== "") ? queryParams.push(this.command.whereData.field) : null;
  (this.command.whereData.value !== "") ? queryParams.push(this.command.whereData.value) : null;
  this.command.whereAdditionalDataArray.forEach(whereDataItem => {
   queryParams.push(
    whereDataItem.field,
    whereDataItem.value
   );
  });
  (this.command.limitData.count > 0) ? queryParams.push(this.command.limitData.count) : null;

  const query = connection.query(commandText, queryParams, (err, result) => {
   // console.log(query.sql);
   if (err) {
    return cb(err);
   }
   cb(null, result);
  });
 }

 stringArrayToList(arr, str) {
  if (arr.length === 0) {
   throw ("arr must contain at least one element.");
  }
  let text = "";
  for (let i = 1; i < arr.length; i++) {
   text += str + ", ";
  }

  return text + str;
 }
}

module.exports = Query;