class task{
    constructor(title, dueDate, detail, pinned,finish){
        this.title = title;
        this.dueDate = dueDate;
        this.detail = detail;
        this.pinned = pinned;
        this.finish = finish;
    }
    
    displayTaskObject(){  
        var motherList = document.querySelector("#task-list")
        
        var item = document.createElement("li")
        item.classList.add("task-record")
        // ---------------checkbox----------------
        
        // -------------div------------------
        var detailContainer = document.createElement("div")
        detailContainer.classList.add("display-task")
        item.appendChild(detailContainer)
        //--------------title------------------
        var titleEl = document.createElement("h3")
        titleEl.classList.add("display-title")
        
        const titleContent = this.title
        
        titleEl.textContent = titleContent
        detailContainer.appendChild(titleEl)
        // --------------dueDate-----------------
        var dueDateEl = document.createElement("h5")
        dueDateEl.classList.add("display-due-date")
        
        var text = this.dueDate 
        
        dueDateEl.textContent = "Due date: " + text
        
        detailContainer.appendChild(dueDateEl)
        // -------------------------------
        
        var optionContainer = document.createElement("div")
        optionContainer.classList.add("edit-container")
        item.appendChild(optionContainer)
        
        
        
        var option1 = document.createElement("button")
        option1.id = "task-info"
        option1.classList.add("task-edit")
        var option1Icon = document.createElement("i")
        option1Icon.classList.add("fa-solid")
        option1Icon.classList.add("fa-circle-info")
        option1.appendChild(option1Icon)
        optionContainer.appendChild(option1)
        
        var option2 = document.createElement("button")
        option2.id = "task-pinned"
        option2.classList.add("task-edit")
        var pinned = this.pinned
        // console.log(this.pinned)
        
        if(pinned == true){
            option2.classList.add("pinned")
        }
        
        var option2Icon = document.createElement("i")
        option2Icon.classList.add("fa-solid")
        option2Icon.classList.add("fa-star")
        option2.appendChild(option2Icon)
        optionContainer.appendChild(option2)
        
        var option3 = document.createElement("button")
        option1.id = "task-delete"
        option3.classList.add("task-edit")
        var option3Icon = document.createElement("i")
        option3Icon.classList.add("fa-regular")
        option3Icon.classList.add("fa-trash-can")
        option3.appendChild(option3Icon)
        optionContainer.appendChild(option3)
        
        // checkbox
        var check = document.createElement("input")
        check.type = "checkbox"
        check.classList.add("checked")
        // it can only defined after other buttons are generated otherwise the if statement will get undefined values when taking option1,2,3
        // and we want to put it in front of other elements in item, so we use insertBefore
        item.insertBefore(check,item.firstChild)
        var finishStatus = this.finish
        if (finishStatus){
            check.checked = true
            titleEl.style.textDecoration = "line-through"
            item.style.opacity = 0.5
            option1.disabled = true
            option2.disabled = true
            option3.disabled = true
        }
        
        if (motherList.firstChild){
            motherList.insertBefore(item,motherList.firstChild)
        }
        else{
            motherList.appendChild(item)
        }
        // event listeners (can't make it wait for the event and passing the value at the same time because adding () after the function name will run it directly, So it became a nested function) 
        var self = this
        // ------------------checkbox--------------------------
        check.onclick = function(){
            if(check.checked){
                self.finish = true
                titleEl.style.textDecoration = "line-through"
                item.style.opacity = 0.5
                option1.disabled = true
                option2.disabled = true
                option3.disabled = true
                localStorage.removeItem("taskData")
                taskManager.saveData()    
            }
            else{
                self.finish = false
                titleEl.style.textDecoration = "none"
                item.style.opacity = 1
                option1.disabled = false
                option2.disabled = false
                option3.disabled = false
                localStorage.removeItem("taskData")
                taskManager.saveData()    
            }
        }
            // ------------------------option1-------------------------------------
        const detailDisplayEl = document.querySelector(".detail-container")
        const detailTitleEl = document.querySelector("#detail-title")
        const detailDueDateEl = document.querySelector("#detail-dueDate")
        const detailContentEl = document.querySelector("#detail-content")
        var detailContent = this.detail
        const detailBtnEl = document.querySelector("#detail-close-btn")


        function clearDetailInfo(){
            detailTitleEl.textContent = ""
            detailDueDateEl.textContent = ""
            detailContentEl.textContent = ""
        }

        detailBtnEl.onclick = function(){
            detailDisplayEl.classList.remove("detail-show")
            clearDetailInfo()
        }

        option1.onclick = function(){
            detailDisplayEl.classList.toggle("detail-show")
            if(detailDisplayEl.classList.contains("detail-show")){    
                detailTitleEl.textContent = titleContent
                detailDueDateEl.textContent = text
                detailContentEl.textContent = detailContent
            
            }
            else{
                clearDetailInfo()
            }
        }
        // ------------------option2------------------------

        option2.onclick = function (){
            // change the color of the star
            option2.classList.toggle("pinned")
            // check if pinned is true/false and assign the opposite
            self.pinned = self.pinned? false:true
            // remove the local storage to prevent over write
            localStorage.removeItem("taskData")
            // save a new item to local storage from the map to store the changes
            taskManager.saveData()
        }
        // --------------------option3------------------------
        option3.onclick = function(){
            const title = self.title
            taskManager.record.delete(title)
            // update html
            motherList.removeChild(item)
            // update localstorage
            taskManager.deleteRecord()
        }

    }

}










