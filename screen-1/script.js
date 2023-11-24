
const button = document.getElementById("next")

button.onclick = ()=>{
    window.location.href = "../screen-2/instructions.html";
}

const element=document.getElementById("save")
const your_name=document.getElementById('Name')
const your_nickname=document.getElementById('Nickname')
element.onclick=()=>{
    var name = your_name.value
    var nickname = your_nickname.value
    localStorage.setItem("name",name)
    localStorage.setItem("nickname",nickname)
}