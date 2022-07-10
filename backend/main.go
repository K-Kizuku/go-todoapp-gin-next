package main

import (
	"backend/cors"
	"backend/db"
	"fmt"
	"strconv"

	docs "backend/docs"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title gin-swagger todos
// @version 1.0
// @license.name kosuke
// @description このswaggerはgin-swaggerの見本apiです
func main(){
	router := gin.Default()
	cors.Cors(router)

    docs.SwaggerInfo.BasePath = "/api/v1"

	db.DbInit()

	//Index
	router.GET("/", func(ctx *gin.Context) {
        todos := db.DbGetAll()
        ctx.JSON(200, gin.H{
            "todos": todos,
        })
    })

    //Create
    router.POST("/new", func(ctx *gin.Context) {
		var data db.Todo
        ctx.BindJSON(&data)
        //status := ctx.PostForm("status")
        db.DbInsert(data.Text, data.Status)
		fmt.Println(data.Text)
        // ctx.Redirect(302, "/")
    })

    //Detail
    router.GET("/detail/:id", func(ctx *gin.Context) {
        n := ctx.Param("id")
        id, err := strconv.Atoi(n)
        if err != nil {
            panic(err)
        }
        todo := db.DbGetOne(id)
        ctx.JSON(200, gin.H{"todo": todo})
    })

    //Update
    router.POST("/update/:id", func(ctx *gin.Context) {
        n := ctx.Param("id")
        id, err := strconv.Atoi(n)
        if err != nil {
            panic("ERROR")
        }
        text := ctx.PostForm("text")
        status := ctx.PostForm("status")
        db.DbUpdate(id, text, status)
        // ctx.Redirect(302, "/")
    })

    //削除確認
    router.GET("/delete_check/:id", func(ctx *gin.Context) {
        n := ctx.Param("id")
        id, err := strconv.Atoi(n)
        if err != nil {
            panic("ERROR")
        }
        todo := db.DbGetOne(id)
        ctx.JSON(200, gin.H{"todo": todo})
    })

    //Delete
    router.POST("/delete/:id", func(ctx *gin.Context) {
        n := ctx.Param("id")
        id, err := strconv.Atoi(n)
        if err != nil {
            panic("ERROR")
        }
        db.DbDelete(id)
        // ctx.Redirect(302, "/")
    })

    router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

    router.Run()
	// router.GET("/", func(c *gin.Context){
	// 	c.JSON(200, gin.H{
	// 		"message": "hello, world",
	// 	})
	// })

}