import React from 'react';

export async function getPosts(sub) {
    const url = "https://www.reddit.com/r/" + sub + "/top/.json?t=hour";
    const response = await fetch(url);

    console.log(response)
    
    if (response.headers.status != 200) {
      return 'Failure!' + response
    }
    
    const raw_json = JSON.parse(response.body);
    const raw_posts = raw_json.data.children;
    const post_dict = {}
    
    for (var j = 0; j < raw_posts.length; j++) {
      const current_post = raw_posts[j].data
      
      const post_title = raw_posts[j].data.title;
      const post_selftext = raw_posts[j].data.selftext;
      
      if (post_selftext != '') {
        post_dict[post_title] = {
          'selftext':post_selftext,
          'ups':current_post.ups,
          'downs':current_post.downs,
          'awards':current_post.total_awards_received,
          'unique':current_post.is_original_content,
          'timestamp':current_post.created
        }
      }
    } 

    console.log(post_dict)
    
    return post_dict
}

// function getSentiment(passage, verbose = false) {
//     header = {
//       'Content-Type':'application/json'
//     }
    
//     body = {
//       'text':passage
//     }
    
//     var options = {
//       'method':'POST',
//       'headers':header,
//       'payload':JSON.stringify(body),
//       muteHttpExceptions:true
//     };
  
//     response = UrlFetchApp.fetch("https://sentim-api.herokuapp.com/api/v1/", options);
    
//     if (response.getResponseCode() != 200) {
//       return 'Failure!' + response.getContentText()
//     }
    
//     result = JSON.parse(response.getContentText());
    
//     if (verbose) {
//       return result
//     }
    
//     return result['result']
//   }
  
// function printSub(sub) {
//     sub_posts = getPosts(sub)
    
//     for (var title in sub_posts) {
//       // check if the property/key is defined in the object itself, not in parent
//       if (sub_posts.hasOwnProperty(title)) {    
//         body = sub_posts[title]['selftext']
//         Logger.log('--------------------\nTITLE:%s - BODY:%s', title, body.substring(0, 140));
//         Logger.log(getSentiment(body))
//         Logger.log('-------------------')
//       }
//     }
// }