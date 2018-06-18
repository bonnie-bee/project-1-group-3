

    $("#commentBTN").on("click", function (event) {
         event.preventDefault();
        console.log("comment appeared")  

        $("#commentBTN").hide()

        var cmtBoxContDiv = $("<div>").attr("id", "cmtBoxContDiv")
        cmtBoxContDiv.addClass("container-fluid")
        cmtBoxContDiv.text("Comment div is present")

        var inputBox = $("<input> placeholder=search")

        $("#divBody").append(cmtBoxContDiv)
        $("#divBody").append(inputBox)

    })




    
