package cors

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors(router *gin.Engine){
	router.Use(cors.New(cors.Config{
        // 許可したいHTTPメソッドの一覧
        AllowMethods: []string{
            "POST",
            "GET",
            "OPTIONS",
            "PUT",
            "DELETE",
        },
        // 許可したいHTTPリクエストヘッダの一覧
        AllowHeaders: []string{
            "Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin",
            "Content-Type",
            "Content-Length",
            "Accept-Encoding",
            "X-CSRF-Token",
            "Authorization",
        },
        // 許可したいアクセス元の一覧
        AllowOrigins: []string{
            "http://localhost:3000",
        },
        // 自分で許可するしないの処理を書きたい場合は、以下のように書くこともできる
        // AllowOriginFunc: func(origin string) bool {
        //  return origin == "https://www.example.com:8080"
        // },
        // preflight requestで許可した後の接続可能時間
        // https://godoc.org/github.com/gin-contrib/cors#Config の中のコメントに詳細あり
		MaxAge: 24 * time.Hour,
    }))
}