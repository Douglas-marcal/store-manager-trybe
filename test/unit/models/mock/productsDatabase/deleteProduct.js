const mockResponseDatabaseDeleted = [
  {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 0,
    info: 'Rows matched: 2  Changed: 2  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
  [],
];

const mockResponseDatabaseNotDeleted = [
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: 'Rows matched: 0  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  },
  [],
];

module.exports = { mockResponseDatabaseDeleted, mockResponseDatabaseNotDeleted };
