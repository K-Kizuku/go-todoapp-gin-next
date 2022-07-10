package db

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
)

type Account struct {
    gorm.Model
    Name string
}

//DB初期化
func DbInitName() {
    db, err := gorm.Open("sqlite3", "namelist.sqlite3")
    if err != nil {
        panic("データベース開けず！（dbInit）")
    }
    db.AutoMigrate(&Account{})
    defer db.Close()
}

//DB追加
func DbInsertName(name string) uint{
    db, err := gorm.Open("sqlite3", "namelist.sqlite3")
    if err != nil {
		fmt.Println("out")
        panic("データベース開けず！（dbInsert)")
    }
	fmt.Println("ok")
    db.Create(&Account{Name: name})
    var account Account
    db.Find(&account, name)
    defer db.Close()
    return account.ID
}

// //DB更新
// func DbUpdateName(id int, name string) {
//     db, err := gorm.Open("sqlite3", "namelist.sqlite3")
//     if err != nil {
//         panic("データベース開けず！（dbUpdate)")
//     }
//     var namelist Account
//     db.First(&namelist, id)
//     namelist.Name = name
//     todo.Status = status
//     db.Save(&todo)
//     db.Close()
// }

//DB削除
func DbDeleteName(name string) {
    db, err := gorm.Open("sqlite3", "namelist.sqlite3")
    if err != nil {
        panic("データベース開けず！（dbDelete)")
    }
    var namelist Account
    db.First(&namelist, name)
    db.Delete(&namelist)
    defer db.Close()
}

//DB全取得
func DbGetAllName() []Account {
    db, err := gorm.Open("sqlite3", "namelist.sqlite3")
    if err != nil {
        panic("データベース開けず！(dbGetAll())")
    }
    var namelist []Account
    db.Order("created_at desc").Find(&namelist)
    db.Close()
    return namelist
}

//DB一つ取得
func DbGetOneName(name string) Account {
    db, err := gorm.Open("sqlite3", "namelist.sqlite3")
    if err != nil {
        panic("データベース開けず！(dbGetOne())")
    }
    var account Account
    db.First(&account, name)
    db.Close()
    return account
}