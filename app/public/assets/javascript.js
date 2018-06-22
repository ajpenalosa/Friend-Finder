$(document).ready(function() {

    $("#survey").submit(function(event) {
        event.preventDefault();
    
        // Empty array to hold scores
        var scores = [];
        var question = 0;
    
        // Loops through each group of checked radio buttons
        for ( var i = 1; i <= 10; i++) {
    
            // Grabs the value of the checked input radio button
            question = $("input[name='question" + i + "']:checked").val();
    
            // Pushes the value to the scores array
            scores.push(question);
        }
    
        // Variable to hold form answers in an object
        var addFriend = {
            "name": $("#name").val().trim(),
            "photo": $("#image").val().trim(),
            "scores": scores
        }
    
        // Console logging the object
        console.log(addFriend);
    
        // Posting to the friends api
        $.post("/api/friends", addFriend).then(function(data){
            
            // Empty array to hold differences of each friend
            var differences = [];
            
            // Looping through all the friends in the database
            for ( var i = 0; i < data.length; i++ ) {
    
                // Conditional to make sure it's not you
                if ( data[i].name !== addFriend.name ) {
    
                    // Initializing total difference variable
                    var totalDifference = 0;
    
                    // Console logging the name of the current friend
                    console.log( data[i].name);
    
                    // Looping through the scores of the current friend
                    for ( var j = 0; j < data[i].scores.length; j++ ) {
    
                        // Calculating the total difference
                        totalDifference = totalDifference + Math.abs(parseInt(scores[j]) - parseInt(data[i].scores[j]));
                    }
    
                    // Pushing the total difference of the current friend into the differences array
                    differences.push(totalDifference);
    
                    // Console logging the name of the current friend along with their total difference
                    console.log( data[i].name + " total difference is " + totalDifference);
    
                }
    
            }
    
            // Capturing the name of the friend with the lowest difference
            var friendName = data[differences.indexOf(Math.min(...differences))].name;
    
            // Console logging their name
            console.log(friendName);
            
            // Putting their name in the modal h2 tag
            $(".friend-name").text(friendName);
            
            // Grabbing the image of the best match
            var friendImage = data[differences.indexOf(Math.min(...differences))].photo;
    
            // If an image exists, then create an image tag
            // Append it to the modal
            if (friendImage) {
                var friendImageElement = $("<img>");
                friendImageElement.attr("src", friendImage);
                $(".best-match").append(friendImageElement);
            }

            // Triggers the modal
            $("#best-match").modal("show");
    
        });
        return false;
    
    });

  });