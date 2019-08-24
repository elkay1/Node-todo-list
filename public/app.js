$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos)

    $("#todoInput").keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $(".list").on("click", "li", function (e) {
        updateTodo($(this));
    });


    $(".list").on("click", "span", function (e) {
        e.preventDefault();
        e.stopPropagation();


        removeTodo($(this).parent());
    })
});



function addTodos(todos) {
    todos.forEach(function(todo){
        addTodo(todo);
    });
};

function addTodo(todo) {
    var newTodo = $("<li class='task'>" + todo.name + " <span>X</span></li>");
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if (todo.complete) {
        newTodo.addClass("done");
    };
    $(".list").append(newTodo);
};

function createTodo(){
    let userInput = $("#todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addTodo(newTodo);
        
    })
    .catch(function(err){
        console.log(err);
    })
};

function removeTodo(todo) {
    let clickedId = todo.data("id");
    let deleteUrl = "/api/todos" + clickedId;
    $.ajax({
            method: "DELETE",
            url: deleteUrl
        })
        .then(function (data) {
            todo.remove();
        })
        .catch(function(err){
        console.log(err);
    })
};

function updateTodo(todo){
    let updateUrl = "/api/todos" + todo.data("id");
    let isDone = todo.data("completed");
    let updateData = {completed: !isDone};
    console.log(updateData);
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updateData  
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
    })
};

//C:\Program Files\MongoDB\Server\4.0\bin>mongod.exe --dbpath "/Users/Liam Kinson/mongo-data"