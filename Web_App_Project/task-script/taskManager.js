var createTaskBtn = document.querySelector("#task-done")


var taskManager = {
    record:new Map(),

    newTask: function (){
        var title = document.querySelector("#task-title").value

        if (!title){
            window.alert("Task title is required")
            return
        }
        if (taskManager.record.has(title)){
            window.alert("Duplicate name")
            return
        }

        var date = document.querySelector("#due-date").value
        var detail = document.querySelector("#task-detail").value
        var temp = new task(title,date,detail,false,false)
        taskManager.record.set(temp.title,temp)
        temp.displayTaskObject()
        createPageOn(2)
    },
// ----------------saveData-------------------
    mapToJson: function(){
        var jsonObj = {}
        
        taskManager.record.forEach((value,key) => {
            // save 5 main attributes in the task object
            var temp = {
                "title":value.title,
                "dueDate":value.dueDate,
                "detail":value.detail,
                "pinned":value.pinned,
                "finish":value.finish
            }
            jsonObj[key] = temp
        });
        return JSON.stringify(jsonObj)
    },
    
    saveData: function(){
        const data = taskManager.mapToJson()
        localStorage.setItem("taskData",data)  
    },
// ----------------------------------------------
// ---------------------readData------------------
    readData: function(){
        if(localStorage.getItem("taskData")){
            var reader = JSON.parse(localStorage.getItem("taskData"))

            for(var key in reader){
                const title = reader[key].title
                const dueDate = reader[key].dueDate
                const detail = reader[key].detail
                const pinned = reader[key].pinned
                const finish = reader[key].finish
                const temp = new task(title,dueDate,detail,pinned,finish)
                taskManager.record.set(key,temp)

                temp.displayTaskObject()
            }
        }
    },
// ---------------------------------------------------
// ---------------------delete------------------
    deleteRecord: function(){
        // remove the old taskData
        localStorage.removeItem("taskData")

        // save the new data into taskData
        taskManager.saveData()
    },
// ----------------------------------------------
// -----------------------sorting------------------
    // Map to Array
    // sorted Array to sorted Map
    // save
    // reload
    // read


    sortByName:function(recordArray){
        recordArray.sort((a,b)=>{
            console.log(a[0],b[0])
            if (a[0] < b[0]){
                return 1
            }
            else if(a[0] > b[0]){
                return -1
            }
            else{
                return 0
            }
        })
    },

    sortByDate:function(recordArray){
        const date = new Date().getTime()
        // set a parallel array for date difference
        var dateCount = []
        for(var i = 0; i < recordArray.length; i++){
            if(recordArray[i][1].dueDate){
                var indexDate = recordArray[i][1].dueDate
                indexDate = new Date(indexDate)
                var dayDiff = Math.round((indexDate.getTime() - date) / (1000 * 60 * 60 * 24))
                dateCount.push(dayDiff)
            }
            else{
                // give the task without date infinity(so that they will be pushed to the last)
                dateCount.push(Infinity)
            }
        }

        for(var x = 0; x < recordArray.length-1; x++){
            var max = dateCount[x]
            for(var y = x+1; y < recordArray.length; y++){

                if(dateCount[y] > max){
                    var temp = max
                    min = dateCount[y]
                    dateCount[y] = temp

                    var objTemp = recordArray[x]
                    recordArray[x] = recordArray[y]
                    recordArray[y] = objTemp
                }
            }
        }
    },

    //comparing a and b elements in array
    // if return 1 "a" should be after "b"
    // if return -1 "a" should be in front of "b"
    // if return 0 both remain unchanged
    // switch the 1 and -1 if descending

    sortByPinned:function(recordArray){
        recordArray.sort((a,b)=>{
            if(a[1].pinned && !b[1].pinned){
                return 1
            }
            else if (!a[1].pinned && b[1].pinned){
                return -1
            }
            else{
                return 0
            }
        })
    },

    sortingMethod: function(){
        const sortChoiceEl = document.querySelector(".sort-choice")
        const nameCheck = document.querySelector("#byName")
        const dateCheck = document.querySelector("#byDate")
        const pinnedCheck = document.querySelector("#byPinned")
        const motherList = document.querySelector("#task-list")

        sortChoiceEl.classList.remove("choice-on")

        var recordArray = Array.from(taskManager.record)

        if(nameCheck.checked){
            taskManager.sortByName(recordArray)
        }
        if(dateCheck.checked){
            taskManager.sortByDate(recordArray)
        }
        if(pinnedCheck.checked){
            taskManager.sortByPinned(recordArray)
        }


        while(motherList.firstChild){
            motherList.removeChild(motherList.firstChild)
        }
        for(var i = 0; i < recordArray.length;i++){
            recordArray[i][1].displayTaskObject()
        }
    },

    search: function(){
        var searchInput = document.querySelector("#search-input")
        var motherList = document.querySelector("#task-list")
        if(searchInput.value){
            while(motherList.firstChild){
                motherList.removeChild(motherList.firstChild)
            }
            taskManager.record.forEach((element)=>{
                var elStr = element.title.toLowerCase()
                if(elStr.includes(searchInput.value.toLowerCase())){
                    element.displayTaskObject()
                }
            })
        }
        else{
            while(motherList.firstChild){
                motherList.removeChild(motherList.firstChild)
            }
            taskManager.record.forEach((element)=>{
                element.displayTaskObject()
            })
        }
        searchInput.value = ""
    }
}

window.addEventListener("beforeunload",taskManager.saveData)
window.onload = function(){
    taskManager.readData()
    dateDisplay()    
}



