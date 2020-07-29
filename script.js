addTodo = (val) => {
    const item = document.querySelector('#list');
    const template = `<li class="item-list">
    <div class="view">
        <p class="edit">
        <span class ="marker"></span>
        ${val}
        </p>
    </div>
    <div class="delete-item">
        x
    </div>
</li>`;
    item.innerHTML += template;
    getCount();
    addEventToDelete();
    addEventToMarkerTask();
};

getCount = () => {
    const countLeft = document.querySelector('.todo-count');
    const editCount = document.querySelectorAll('.marker');
    let number = 0;
    for(let i of editCount) {
        if(i.style.background != "green") number++;
    }
    countLeft.textContent = `${number} items left`;
};

searchTodo = () => {
    const input = document.querySelector("#search-input");
    const listItem = document.querySelectorAll(".item-list");
    listItem.forEach(item => {
        text = item.querySelector(".edit");
        if(text.textContent.toLowerCase().includes(input.value.toLowerCase())) {
            item.style.display ="";
        }
        else item.style.display = "none";
    });
};

showDeleteMarker = (event) => {
    console.log(event.target);
    let allLi = document.querySelectorAll(".item-list");
    let flag = false;
    for(let i of allLi) {
        if(i == event.target) flag = true;
    }
    if(flag) {
    let temp = event.target.querySelector(".delete-item");
    if(temp.style.display == "" || temp.style.display =="none") 
    {
        temp.style.display = "block";
        console.log(temp.style.display);
    }
    else  {
        temp.style.display = "none"
        console.log(temp.style.display);
    }
    }
};

deleteTodo = (event) => {
    let parent = event.target.parentElement;
    parent.remove();
    parent = null;
    getCount();

};

reworkTask =(event) => {
    console.log(event);
    if(event.target.style.background != "green")
    event.target.style.background = "green";
    else event.target.style.background = "white";
    getCount();
};

// repeatFilterItems = () => {
//     const allFilters = document.querySelector('.panel-list');
//     const liAllList = document.querySelectorAll('.item-list');
//     console.log(allFilters);
//     for(let item of [...allFilters]) {
//         if(item.className.includes("filter-active")) {
//             for(let li of liAllList) {
//                 const marker = li.querySelector(".marker");
//             if(marker.style.background != "green") {
//                 li.style.display ="";
//                 continue;
//             }
//             li.style.display = "none";
//             }
//         }
//         else if(item.className.includes("filter-completed")) {
//             for(let li of liAllList) {
//                 const marker = li.querySelector(".marker");
//                 if(marker.style.background == "green") {
//                     li.style.display ="";
//                     continue;
//                 }
//                 li.style.display = "none";
//             }    
//         }
//      }
// };

drowBorder = (event) => {
    if(event.target.className.indexOf("filter") == 0) {
        const allFilters = document.getElementsByClassName("panel-list");
        for(let filterItem of allFilters[0].children) {
            if(filterItem == event.target) filterItem.classList.add("selected");
            else filterItem.classList.remove("selected");
        }
    }
};

filterItems = (event) => {
    const filterNow = event.target;
    const liAllList = document.querySelectorAll('.item-list');
    if(filterNow.className.indexOf("filter-completed") == 0) {
        for(let li of liAllList) {
            const marker = li.querySelector(".marker");
            if(marker.style.background == "green") {
                li.style.display ="";
                continue;
            }
            li.style.display = "none";
        }    
    }
    else if(filterNow.className.indexOf("filter-all") == 0) {
        for(let li of liAllList) {
            if(li.style.display=="none") li.style.display ="";
        }    
    }
    else if(filterNow.className.indexOf("filter-active") == 0) {
        for(let li of liAllList) {
            const marker = li.querySelector(".marker");
            if(marker.style.background != "green") {
                li.style.display ="";
                continue;
            }
            li.style.display = "none";
        }    
    }
};

addEventToDelete =() => {
    const deleteItem = document.querySelectorAll(".delete-item");
    for(let item of deleteItem) {
        item.addEventListener('mousedown', (event) => {
                deleteTodo(event);
        });
    }
};

addEventToMarkerTask = () => {
    const markerItem = document.querySelectorAll(".marker");
    for(let mark of markerItem) {
        mark.addEventListener('click', (event) => {
                reworkTask(event);
        });
    }
};
//const markerItem = 

addEventToDelete();
addEventToMarkerTask();

const inputSearch = document.querySelector("#search-input");

inputSearch.addEventListener('keydown', (event) => {
    searchTodo();
});
inputSearch.addEventListener('keyup', (event) => {
    searchTodo();
});

const inputAdd = document.querySelector("#add-input");

inputAdd.addEventListener('keydown', (event) => {
    if(event.keyCode == 13) {
        addTodo(inputAdd.value);
        inputAdd.value = "";
    }
});

const ulItem = document.querySelector("#list");

ulItem.addEventListener('mousedown', (event) => {
    showDeleteMarker(event);
});

const panelItem = document.querySelector(".panel-list");

panelItem.addEventListener('click', (event) => {
    drowBorder(event);
    filterItems(event);
});
