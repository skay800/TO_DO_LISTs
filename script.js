
const inputBox =document.getElementsByClassName('input-box')[0];

const addTaskBtn = document.getElementsByClassName('btn')[0];


const validation=document.querySelector(".validation");

inputBox.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        
        addTask();
        
    }
});

function addTask()
{
 if(inputBox.value ===''){
        // alert("You must write something");
        validation.classList.add('show')
        setTimeout(function(){document.querySelector(".validation").style.display="none";},3000);
    }
    if(inputBox.value.trim()!=0){
           let localItems = JSON.parse( localStorage.getItem('localItem'))
        if(localItems === null){
             taskList = []
    
        }else{
            taskList = localItems;
        }
        taskList.push(inputBox.value)
        localStorage.setItem('localItem', JSON.stringify(taskList)); 
    }
    
        showItem()
}
addTaskBtn.addEventListener('click', function (){
  
    addTask();
    })

    function showItem(){
        let localItems = JSON.parse( localStorage.getItem('localItem'))
        if(localItems === null){
             taskList = []
    
        }else{
            taskList = localItems;
        }
    
    
    let html = '';
    let itemShow = document.querySelector('.todoLists');
    taskList.forEach((data, index )=> {
        
    
        html += `
        <div class="todoList">
    
        <p class="pText">${data}</p>
    
    
        </div>
        
        <button class="delete" onClick="deleteItem(${index})">x</button>
        
        `
    })
    itemShow.innerHTML = html;
    }

    showItem()
    function deleteItem(index){
        let localItems = JSON.parse( localStorage.getItem('localItem'))
        taskList.splice(index, 1)
        localStorage.setItem('localItem', JSON.stringify(taskList));
        showItem()
    }
    
    function clearTask(){
        
    localStorage.clear()
    showItem()
    }









