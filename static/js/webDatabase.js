let getCurrentDb=function() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    //如果数据库不存在那么创建之
    var db = openDatabase("myDb", "1.0", "it's to save demo data!", 1024 * 1024);
    return db;
};
let initDatabase=function() {
    var db =getCurrentDb();//初始化数据库
    if(!db) {
        alert("您的浏览器不支持HTML5本地数据库");return;
    }
    db.transaction(function (trans) {//启动一个事务，并设置回调函数
        //执行创建表的Sql脚本
        trans.executeSql("create table if not exists Demo(data text null)", [], function (trans, result) {
        }, function (trans, message) {//消息的回调函数alert(message);});
        }, function (trans, result) {
        }, function (trans, message) {
        });
    });
};
let saveDb=function(tableDataZong){
  initDatabase();
  //执行sql脚本，插入数据
  var db = getCurrentDb();
  db.transaction(function (trans) {
      trans.executeSql("insert into Demo(data) values(?) ", [JSON.stringify(tableDataZong)], function (ts, data) {
      }, function (ts, message) {
          alert(message);
      });
  });
};
let showAllTheData=function() {
    $("#tblData").empty();
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("select * from Demo ", [], function (ts, data) {
            if (data) {
                for (var i = 0; i < data.rows.length; i++) {
                  debugger
                  var tableDataZongStr= JSON.parse(data.rows.item(i).data)//获取某行数据的json对象
                }
            }
        }, function (ts, message) {alert(message);var tst = message;});
    });
};
let delDataBase=function(){
    var db = getCurrentDb();
    db.transaction(function (tx) {
      tx.executeSql("DROP TABLE Demo ");
    });
}
export {getCurrentDb,initDatabase,saveDb,showAllTheData,delDataBase};
