$("#submit").on("click", function(event) {
    event.preventDefault();

    var scores = [];
    var question = 0;

    for ( var i = 1; i <= 10; i++) {
        question = $("input[name='question" + i + "']:checked").val();
        scores.push(question);
    }

    var addFriend = {
        "name": $("#name").val().trim(),
        "photo": $("#image").val().trim(),
        "scores": scores
    }
    console.log(addFriend);
    $.post("/api/friends", addFriend).then(function(data){
        
        var differences = [];
        
        for ( var i = 0; i < data.length; i++ ) {

            if ( data[i].name !== addFriend.name ) {

                var totalDifference = 0;

                console.log( data[i].name);
                for ( var j = 0; j < data[i].scores.length; j++ ) {
                    totalDifference = totalDifference + Math.abs(parseInt(scores[j]) - parseInt(data[i].scores[j]));
                }

                differences.push(totalDifference);

                console.log( data[i].name + " total difference is " + totalDifference);

            }

        }

        var friendName = data[differences.indexOf(Math.min(...differences))].name;

        console.log(friendName);
        
        $(".friend-name").text(friendName);
        
        var friendImage = data[differences.indexOf(Math.min(...differences))].photo;

        if (friendImage) {
            var friendImageElement = $("<img>");
            friendImageElement.attr("src", friendImage);
            $(".best-match").append(friendImageElement);
        }

    });

});