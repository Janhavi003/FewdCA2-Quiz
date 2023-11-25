
// Declaring the next button variable.
const button = document.getElementById("next")

// onclicking functioning for next button.
button.onclick = ()=>{
    window.location.href = "./screen-2/instructions.html";
}

// declaring the save,name and nickname variables.
const element=document.getElementById("save")
const your_name=document.getElementById('Name')
const your_nickname=document.getElementById('Nickname')
// onclick functioning and storing the value of nickname and name for later use. 
element.onclick=()=>{
    var save = your_name.value
    var nickname = your_nickname.value
    localStorage.setItem("name",save)
    localStorage.setItem("nickname",nickname)
}