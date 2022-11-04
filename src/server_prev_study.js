//node_modules에서 express 가져오기
import express from "express";
import morgan from "morgan";

const PORT = 4000; //4000 port 는 거의 비어있음..^^
//서버 생성 : express application 생성
const app = express();
const loggerMiddleware = morgan("dev");

//서버 준비시키기 : 외부 request 에 응답하는 방법 설정

//middleware : 세번째 인자인 next 함수를 호출해서 다음 handler의 중간 역할
// const logger = (req, res, next) => {
//     console.log(`${req.method} ${req.url}`)
//     next();
// }

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>NOT ALLOWED!</h1>")
    }
    console.log("Allowed, you may continue.")
    next();
}

//get 함수에 전달하는 콜백함수의 인자 : request, response
const handleHome = (req, res) => { //마지막 요청이므로 next가 필요 없음
    console.log("Somebody is trying to go home...")
    //.end() : end request
    // return res.end();
    
    //.send() : send html to browser as a response
    return res.send("I love middleware! ");
}
const handleLogin = (req, res) => {
    return res.send("login here!")
}
const handleProtected = (req, res) => {
    return res.send("Welcome to the private rounge.")
}

app.use(loggerMiddleware)

//app.use(logger)
app.use(privateMiddleware)
app.get("/",  handleHome)

app.get("/login", handleLogin)
app.get("/protected", handleProtected)


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`);
//서버 개방하기 : 특정 포트에 서버를 열고, 서버가 시작할 때 실행할 함수 세팅
app.listen(PORT, handleListening);

