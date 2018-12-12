$("#submitSurvey").click(event => {
    event.preventDefault();
    $("#bestMatchInfo").empty();

    let scores = [];
    for (let i = 1; i < 11; i++) {
        
        let num = $("#q" + i).val().charAt(0);
        if (num === "d") { scores.push(1) }
        else { scores.push(num) };

        $("#q" + i).val("default");
    };

    let userData = {
        userName: $("#userName").val().trim(),
        userPhotoURL: $("#photoLink").val().trim(),
        scores: scores
    };

    $.post("/api/friends", userData)
        .then((data) => {
            let matchInfo = "<div>";
            matchInfo += "<h2>" + data.userName + "</h2>"
            matchInfo += "<img src='" + data.userPhotoURL + "' alt='Your Best Match' />";
            $("#bestMatchInfo").append(matchInfo);
    });


    $("#userName").val("");
    $("#photoLink").val("");
});