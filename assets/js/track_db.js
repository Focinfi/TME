/// <reference path="Scripts/jquery-1.4.1-vsdoc.js" />
var trackDB;
var trackList = [];
trackDB = openDatabase("track_db", "1.0", "track_table", 1024 * 1024 * 5);
trackDB.transaction(function (tx) {

    tx.executeSql(
        "create table if not exists track_table (id REAL UNIQUE, year TEXT, month TEXT, date TEXT, site TEXT, positive_words TEXT)",
        [],
        function () {
        },
        function (tx, error) {
        });
});


var trackDB_handler = {};
trackDB_handler.track_db_handler = function () {
    var _this = this;

    //添加数据
    this.insert = function () {
        var id = Math.random();
        var year;
        var month;
        var date = $("input[id='date']").val();
        var site = $("input[id='site']").val();
        var positive_words = $("input[id='positive_words']").val();
        year = new Date().getFullYear().toString();
        month = this.monthFormat((new Date().getMonth() + 1).toString());
        if (this.queryDataExist(date)) {
            alert("今天的的已经记录过了");
        } else {
            alert(this.queryDataExist(date).toString());
            trackDB.transaction(function (tx) {
                tx.executeSql(
                    "insert into track_table (id, year, month, date, site, positive_words) values(?, ?, ?, ?, ?, ?)",
                    [id, year, month, date, site, positive_words],
                    function () {
                    },
                    function (tx, error) {
                    });
            });
        }

    }

    // 查询
    this.query = function () {

        trackDB.transaction(function (tx) {
            tx.executeSql(
                "select * from track_table", [],
                function (tx, result) {
                    for (var i = 0; i < result.rows.length; i++) {

                        var date = result.rows.item(i)['date'];
                        var site = result.rows.item(i)['site'];
                        var positive_words = result.rows.item(i)['positive_words'];
                        var trackItem = "<div>Date---" + date + "---Site---" + site + "---Positive words---" + positive_words + "  </div>"
                        $("#track_save").after(trackItem);
                    }
                },
                function (tx, error) {
                    alert('查询失败: ' + error.message);
                });
        });

    }

    //更新数据
    this.update = function (id, name) {

        trackDB.transaction(function (tx) {
            tx.executeSql(
                "update stu set name = ? where id= ?",
                [name, id],
                function (tx, result) {
                    _this.query();
                },
                function (tx, error) {
                    alert('更新失败: ' + error.message);
                });
        });
    }

    //删除数据
    this.del = function (id) {
        trackDB.transaction(function (tx) {
            tx.executeSql(
                "delete from  stu where id= ?",
                [id],
                function (tx, result) {

                },
                function (tx, error) {
                    alert('删除失败: ' + error.message);
                });
        });
    }

    //删除数据表
    this.dropTable = function () {
        trackDB.transaction(function (tx) {
            tx.executeSql('drop  table  track_table');
        });
    }

    this.monthFormat = function (month) {
        var month_format;
        switch (month) {
            case "1":
                month_format = "一月";
                break;
            case "2":
                month_format = "二月";
                break;
            case "3":
                month_format = "三月";
                break;
            case "4":
                month_format = "四月";
                break;
            case "5":
                month_format = "五月";
                break;
            case "6":
                month_format = "六月";
                break;
            case "7":
                month_format = "七月";
                break;
            case "8":
                month_format = "八月";
                break;
            case "9":
                month_format = "九月";
                break;
            case "10":
                month_format = "十月";
                break;
            case "11":
                month_format = "十一月";
                break;
            case "12":
                month_format = "十二月";
                break;
        }
        return month_format;
    }
    //查询今天是否已经记录过了
    this.queryDataExist = function (date) {
        var exist = false;
        trackDB.transaction(function (tx) {
            tx.executeSql(
                "select * from track_table where (date like ?)", ["%" + date + "%"],
                function (tx, result) {
                    if (result) {
                        exist = true;
                    }

                    else {
                        exist = false;
                        alert(exist.toString());
                    }
                }
            )
        });
        return exist;

    }

}
