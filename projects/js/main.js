let click1 = document.querySelector("#sad-dragon");

let click2 = document.querySelector("#happy-dragon");


click1.addEventListener("click",function(){
    click1.style.display = "none"
    alert("are you sure :(")
})
click2.addEventListener("click",function(){
    click2.style.display = "none"
    alert("*happy dragon noises*")
})
